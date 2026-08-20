import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod.js";
import {
  BriefSchema,
  CalibrateRequestSchema,
  CalibrationSchema,
  OutputSchema,
  RefineRequestSchema,
  type BriefOutput,
} from "./schema.js";
import {
  buildCalibrationPrompt,
  buildPrompt,
  CALIBRATION_SYSTEM_PROMPT,
  SYSTEM_PROMPT,
  REFINE_SYSTEM_PROMPT,
} from "./buildPrompt.js";

const app = express();
app.use(cors());
// Floor plan + up to 3 space photos as base64 can add up quickly.
app.use(express.json({ limit: "20mb" }));

const client = new Anthropic();
const MODEL = "claude-sonnet-5";
const outputFormat = zodOutputFormat(OutputSchema);
const calibrationFormat = zodOutputFormat(CalibrationSchema);

function mockOutput(): BriefOutput {
  return {
    analysis: [{ label: "Note", value: "Mock output — ANTHROPIC_API_KEY not configured or the request failed." }],
    flags: [{ text: "Live generation unavailable — showing placeholder content." }],
    params: [{ label: "Status", value: "Mock data" }],
    approaches: [
      {
        name: "Sample approach",
        summary: "Configure ANTHROPIC_API_KEY on the server to generate a real design strategy.",
        zones: [{ text: "N/A" }],
        traffic: "N/A",
        pros: [{ text: "N/A" }],
        constraints: [{ text: "N/A" }],
        budgetLine: "N/A",
      },
    ],
    palette: [{ name: "Placeholder", hex: "#b8860b", desc: "Accent" }],
    materials: [{ name: "Placeholder", rationale: "N/A" }],
    lighting: "N/A",
    moodSummary: "N/A",
    actions: [{ num: 1, text: "Configure ANTHROPIC_API_KEY and try again." }],
  };
}

app.post("/api/generate", async (req, res) => {
  const parsed = BriefSchema.safeParse(req.body?.brief);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid brief", details: parsed.error.flatten() });
    return;
  }
  try {
    const prompt = buildPrompt(parsed.data);
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      output_config: { format: outputFormat },
      messages: [
        {
          role: "user",
          content: `Generate a design strategy document for this interior design brief:\n\n${prompt}`,
        },
      ],
    });
    if (!response.parsed_output) {
      throw new Error("Model response failed schema validation");
    }
    res.json({ output: response.parsed_output });
  } catch (err) {
    console.error("Generation failed:", err);
    res.status(200).json({ output: mockOutput(), fallback: true });
  }
});

app.post("/api/refine", async (req, res) => {
  const parsed = RefineRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }
  const { brief, previousOutput, refinement } = parsed.data;
  try {
    const prompt = buildPrompt(brief);
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 8000,
      system: REFINE_SYSTEM_PROMPT,
      output_config: { format: outputFormat },
      messages: [
        {
          role: "user",
          content: `Original brief:\n${prompt}\n\nPrevious output:\n${JSON.stringify(previousOutput)}\n\nRefinement request: ${refinement}`,
        },
      ],
    });
    if (!response.parsed_output) {
      throw new Error("Model response failed schema validation");
    }
    res.json({ output: response.parsed_output });
  } catch (err) {
    console.error("Refinement failed:", err);
    // Keep the previous output rather than losing the designer's prior generation.
    res.status(200).json({ output: previousOutput, fallback: true });
  }
});

app.post("/api/calibrate", async (req, res) => {
  const parsed = CalibrateRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }
  const { floorPlanImage, spacePhotos, ...manual } = parsed.data;

  // Unlike /api/generate, this endpoint deliberately does NOT fall back to
  // placeholder content on failure — the client shows an honest "couldn't
  // analyze, try again" state instead, so nothing here is ever presented as
  // real analysis when it isn't.
  try {
    const content: Anthropic.Messages.ContentBlockParam[] = [];
    if (floorPlanImage) {
      if (floorPlanImage.mediaType === "application/pdf") {
        content.push({
          type: "document",
          source: { type: "base64", media_type: "application/pdf", data: floorPlanImage.dataBase64 },
        });
      } else {
        content.push({
          type: "image",
          source: { type: "base64", media_type: floorPlanImage.mediaType, data: floorPlanImage.dataBase64 },
        });
      }
    }
    for (const photo of spacePhotos) {
      content.push({
        type: "image",
        source: { type: "base64", media_type: photo.mediaType, data: photo.dataBase64 },
      });
    }
    content.push({
      type: "text",
      text: buildCalibrationPrompt(manual, !!floorPlanImage, spacePhotos.length),
    });

    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 1200,
      system: CALIBRATION_SYSTEM_PROMPT,
      output_config: { format: calibrationFormat },
      messages: [{ role: "user", content }],
    });
    if (!response.parsed_output) {
      throw new Error("Model response failed schema validation");
    }
    res.json({ calibration: response.parsed_output });
  } catch (err) {
    console.error("Calibration failed:", err);
    res.status(502).json({ error: "calibration_failed" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, hasApiKey: !!process.env.ANTHROPIC_API_KEY });
});

const PORT = Number(process.env.PORT) || 8787;
app.listen(PORT, () => {
  console.log(`Brief Studio API listening on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("ANTHROPIC_API_KEY is not set — /api/generate will return mock output.");
  }
});
