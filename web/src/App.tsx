import { useWizard } from "./useWizard";
import { TopBar } from "./components/TopBar";
import { BottomBar } from "./components/BottomBar";
import { Sidebar } from "./components/Sidebar";
import { Step1 } from "./components/Step1";
import { Step1_5 } from "./components/Step1_5";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";
import { Step5 } from "./components/Step5";
import { Generating } from "./components/Generating";
import { Output } from "./components/Output";

export default function App() {
  const wizard = useWizard();
  const { state, contentRef } = wizard;

  if (state.generating) return <Generating wizard={wizard} />;
  if (state.showOutput) return <Output wizard={wizard} />;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#1e1e24", fontFamily: "var(--font-sans)" }}>
      <TopBar wizard={wizard} />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "36px 44px" }}>
          {state.step === 1 && <Step1 wizard={wizard} />}
          {state.step === 1.5 && <Step1_5 wizard={wizard} />}
          {state.step === 2 && <Step2 wizard={wizard} />}
          {state.step === 3 && <Step3 wizard={wizard} />}
          {state.step === 4 && <Step4 wizard={wizard} />}
          {state.step === 5 && <Step5 wizard={wizard} />}
        </div>
        <Sidebar wizard={wizard} />
      </div>
      <BottomBar wizard={wizard} />
    </div>
  );
}
