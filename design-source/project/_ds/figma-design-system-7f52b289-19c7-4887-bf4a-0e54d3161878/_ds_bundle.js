/* @ds-bundle: {"format":4,"namespace":"FigmaDesignSystem_7f52b2","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"PricingCard","sourcePath":"components/cards/PricingCard.jsx"},{"name":"TemplateCard","sourcePath":"components/cards/TemplateCard.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"PromoBanner","sourcePath":"components/feedback/PromoBanner.jsx"},{"name":"TextInput","sourcePath":"components/inputs/TextInput.jsx"},{"name":"ColorBlock","sourcePath":"components/layout/ColorBlock.jsx"},{"name":"MarqueeStrip","sourcePath":"components/layout/MarqueeStrip.jsx"},{"name":"TopNav","sourcePath":"components/navigation/TopNav.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"f0836912f81e","components/buttons/IconButton.jsx":"507ebf9c3b95","components/cards/Card.jsx":"0585d82bb5a9","components/cards/PricingCard.jsx":"cd4244b07f03","components/cards/TemplateCard.jsx":"351573b67090","components/feedback/Badge.jsx":"d3266540976b","components/feedback/PromoBanner.jsx":"616fbca7f9f4","components/inputs/TextInput.jsx":"8d5c206b9b76","components/layout/ColorBlock.jsx":"b6f7541232f2","components/layout/MarqueeStrip.jsx":"139b44655a6c","components/navigation/TopNav.jsx":"22aeda32461a","ui_kits/marketing-site/FeatureSections.jsx":"bc259e0208e4","ui_kits/marketing-site/Footer.jsx":"b2b2e7f659e8","ui_kits/marketing-site/Hero.jsx":"80a7bef1de03"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FigmaDesignSystem_7f52b2 = window.FigmaDesignSystem_7f52b2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
const React = window.React;
function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  disabled,
  style,
  ...rest
}) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-button-size)',
    fontWeight: 'var(--type-button-weight)',
    lineHeight: 'var(--type-button-line-height)',
    letterSpacing: 'var(--type-button-letter-spacing)',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform 120ms ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      padding: '10px 20px'
    },
    secondary: {
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)',
      padding: '8px 18px 10px',
      border: '1px solid var(--color-hairline)'
    },
    tertiary: {
      background: 'transparent',
      color: 'var(--color-ink)',
      padding: '8px 12px'
    },
    magenta: {
      background: 'var(--color-accent-magenta)',
      color: 'var(--color-on-primary)',
      padding: '10px 18px'
    }
  };
  const sizes = {
    default: {},
    small: {
      fontSize: '16px',
      padding: '6px 14px'
    }
  };
  const s = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...(sizes[size] || {}),
    ...style
  };
  return React.createElement('button', {
    style: s,
    onClick,
    disabled,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
const React = window.React;
function IconButton({
  icon,
  inverse = false,
  size = 40,
  onClick,
  disabled,
  style,
  ...rest
}) {
  const s = {
    width: size + 'px',
    height: size + 'px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Math.round(size * 0.45) + 'px',
    background: inverse ? 'rgba(255,255,255,0.16)' : 'var(--color-surface-soft)',
    color: inverse ? 'var(--color-inverse-ink)' : 'var(--color-ink)',
    transition: 'transform 120ms ease, opacity 120ms ease',
    opacity: disabled ? 0.4 : 1,
    padding: 0,
    fontFamily: 'var(--font-sans)',
    ...style
  };
  return React.createElement('button', {
    style: s,
    onClick,
    disabled,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.93)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    ...rest
  }, icon || '→');
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
const React = window.React;
function Card({
  children,
  padding = 24,
  radius = 'lg',
  border = false,
  shadow,
  style,
  ...rest
}) {
  const radii = {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)'
  };
  const s = {
    background: 'var(--color-canvas)',
    borderRadius: radii[radius] || radius,
    padding: typeof padding === 'number' ? padding + 'px' : padding,
    border: border ? '1px solid var(--color-hairline)' : 'none',
    boxShadow: shadow === 'soft' ? 'var(--shadow-soft)' : shadow === 'modal' ? 'var(--shadow-modal)' : 'none',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-sans)',
    ...style
  };
  return React.createElement('div', {
    style: s,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/PricingCard.jsx
try { (() => {
const React = window.React;
function PricingCard({
  title,
  price,
  period = '/mo',
  description,
  features = [],
  cta,
  ctaVariant = 'primary',
  highlighted,
  style,
  ...rest
}) {
  const s = {
    background: 'var(--color-canvas)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-ink)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...style
  };
  return React.createElement('div', {
    style: s,
    ...rest
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 'var(--type-card-title-size)',
      fontWeight: 'var(--type-card-title-weight)',
      lineHeight: 'var(--type-card-title-line-height)'
    }
  }, title), description && React.createElement('div', {
    style: {
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--type-body-sm-weight)',
      lineHeight: 'var(--type-body-sm-line-height)',
      marginTop: '4px'
    }
  }, description)), price !== undefined && React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, React.createElement('span', {
    style: {
      fontSize: '36px',
      fontWeight: 700,
      letterSpacing: '-0.5px'
    }
  }, price), period && React.createElement('span', {
    style: {
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--type-body-sm-weight)'
    }
  }, period)), features.length > 0 && React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      borderTop: '1px solid var(--color-hairline-soft)',
      paddingTop: '16px'
    }
  }, features.map((f, i) => React.createElement('div', {
    key: i,
    style: {
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--type-body-sm-weight)',
      lineHeight: 'var(--type-body-sm-line-height)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, React.createElement('span', {
    style: {
      color: 'var(--color-semantic-success)',
      fontSize: '14px',
      fontWeight: 700
    }
  }, '✓'), f))), cta && React.createElement('button', {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--type-button-size)',
      fontWeight: 'var(--type-button-weight)',
      letterSpacing: 'var(--type-button-letter-spacing)',
      borderRadius: 'var(--radius-pill)',
      border: ctaVariant === 'secondary' ? '1px solid var(--color-hairline)' : 'none',
      cursor: 'pointer',
      background: ctaVariant === 'secondary' ? 'var(--color-canvas)' : 'var(--color-primary)',
      color: ctaVariant === 'secondary' ? 'var(--color-ink)' : 'var(--color-on-primary)',
      padding: '10px 20px',
      marginTop: 'auto',
      textAlign: 'center'
    }
  }, cta));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TemplateCard.jsx
try { (() => {
const React = window.React;
function TemplateCard({
  title,
  image,
  style,
  ...rest
}) {
  const s = {
    background: 'var(--color-surface-soft)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-ink)',
    cursor: 'pointer',
    transition: 'transform 120ms ease',
    ...style
  };
  return React.createElement('div', {
    style: s,
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    ...rest
  }, React.createElement('div', {
    style: {
      background: 'var(--color-canvas)',
      borderRadius: 'var(--radius-md)',
      aspectRatio: '16/10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginBottom: '10px'
    }
  }, image ? React.createElement('img', {
    src: image,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : React.createElement('span', {
    style: {
      color: 'var(--color-hairline)',
      fontSize: '24px'
    }
  }, '⬚')), title && React.createElement('div', {
    style: {
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--type-body-sm-weight)',
      lineHeight: 'var(--type-body-sm-line-height)'
    }
  }, title));
}
Object.assign(__ds_scope, { TemplateCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TemplateCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
const React = window.React;
function Badge({
  children,
  variant = 'default',
  style,
  ...rest
}) {
  const variants = {
    default: {
      background: 'var(--color-surface-soft)',
      color: 'var(--color-ink)'
    },
    success: {
      background: '#e6f4ea',
      color: 'var(--color-semantic-success)'
    },
    inverse: {
      background: 'var(--color-inverse-canvas)',
      color: 'var(--color-inverse-ink)'
    }
  };
  const s = {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '4px 8px',
    borderRadius: 'var(--radius-sm)',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...(variants[variant] || variants.default),
    ...style
  };
  return React.createElement('span', {
    style: s,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/PromoBanner.jsx
try { (() => {
const React = window.React;
function PromoBanner({
  children,
  cta,
  onCtaClick,
  style,
  ...rest
}) {
  const s = {
    background: 'var(--color-block-lilac)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-body-sm-size)',
    fontWeight: 'var(--type-body-sm-weight)',
    lineHeight: 'var(--type-body-sm-line-height)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    ...style
  };
  const btnStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-button-size)',
    fontWeight: 'var(--type-button-weight)',
    letterSpacing: 'var(--type-button-letter-spacing)',
    background: 'var(--color-accent-magenta)',
    color: 'var(--color-on-primary)',
    border: 'none',
    borderRadius: 'var(--radius-pill)',
    padding: '10px 18px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0
  };
  return React.createElement('div', {
    style: s,
    ...rest
  }, React.createElement('span', null, children), cta && React.createElement('button', {
    style: btnStyle,
    onClick: onCtaClick
  }, cta));
}
Object.assign(__ds_scope, { PromoBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/PromoBanner.jsx", error: String((e && e.message) || e) }); }

// components/inputs/TextInput.jsx
try { (() => {
const React = window.React;
function TextInput({
  label,
  placeholder,
  value,
  onChange,
  focused,
  error,
  disabled,
  style,
  ...rest
}) {
  const [isFocused, setIsFocused] = React.useState(focused || false);
  const s = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-body-size)',
    fontWeight: 'var(--type-body-weight)',
    lineHeight: 'var(--type-body-line-height)',
    letterSpacing: 'var(--type-body-letter-spacing)',
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    border: '1px solid ' + (error ? '#e53e3e' : isFocused ? 'var(--color-primary)' : 'var(--color-hairline)'),
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 120ms ease',
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-body-sm-size)',
    fontWeight: 'var(--type-body-sm-weight)',
    color: 'var(--color-ink)',
    display: 'block',
    marginBottom: '6px'
  };
  return React.createElement('div', null, label && React.createElement('label', {
    style: labelStyle
  }, label), React.createElement('input', {
    style: s,
    placeholder,
    value,
    onChange,
    disabled,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    ...rest
  }));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/inputs/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/layout/ColorBlock.jsx
try { (() => {
const React = window.React;
function ColorBlock({
  color = 'lime',
  children,
  style,
  ...rest
}) {
  const colors = {
    lime: 'var(--color-block-lime)',
    lilac: 'var(--color-block-lilac)',
    cream: 'var(--color-block-cream)',
    pink: 'var(--color-block-pink)',
    mint: 'var(--color-block-mint)',
    coral: 'var(--color-block-coral)',
    navy: 'var(--color-block-navy)'
  };
  const isNavy = color === 'navy';
  const s = {
    background: colors[color] || colors.lime,
    color: isNavy ? 'var(--color-inverse-ink)' : 'var(--color-ink)',
    borderRadius: 'var(--radius-lg)',
    padding: '48px',
    fontFamily: 'var(--font-sans)',
    ...style
  };
  return React.createElement('section', {
    style: s,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { ColorBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ColorBlock.jsx", error: String((e && e.message) || e) }); }

// components/layout/MarqueeStrip.jsx
try { (() => {
const React = window.React;
function MarqueeStrip({
  items = [],
  speed = 40,
  style,
  ...rest
}) {
  const content = items.length > 0 ? items : ['Figma', 'Dropbox', 'Spotify', 'Airbnb', 'Netflix', 'Stripe', 'Square', 'Uber'];
  const repeated = [...content, ...content, ...content];
  const animStyle = `@keyframes figma-marquee{0%{transform:translateX(0)}100%{transform:translateX(-33.333%)}}`;
  const s = {
    background: 'var(--color-inverse-canvas)',
    color: 'var(--color-inverse-ink)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-body-sm-size)',
    fontWeight: 'var(--type-body-sm-weight)',
    height: '36px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    ...style
  };
  return React.createElement('div', {
    style: s,
    ...rest
  }, React.createElement('style', null, animStyle), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '48px',
      alignItems: 'center',
      animation: `figma-marquee ${speed}s linear infinite`
    }
  }, repeated.map((item, i) => React.createElement('span', {
    key: i,
    style: {
      opacity: 0.7,
      letterSpacing: '0.02em'
    }
  }, item))));
}
Object.assign(__ds_scope, { MarqueeStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/MarqueeStrip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNav.jsx
try { (() => {
const React = window.React;
function TopNav({
  logo,
  links = [],
  cta,
  ctaSecondary,
  style,
  ...rest
}) {
  const s = {
    background: 'var(--color-canvas)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-body-sm-size)',
    fontWeight: 'var(--type-body-sm-weight)',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    gap: '24px',
    borderBottom: '1px solid var(--color-hairline-soft)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    ...style
  };
  const logoStyle = {
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.3px',
    marginRight: '16px',
    textDecoration: 'none',
    color: 'inherit'
  };
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
    padding: '8px 12px',
    borderRadius: 'var(--radius-full)',
    transition: 'background 120ms ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  };
  const pillBase = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--type-button-size)',
    fontWeight: 'var(--type-button-weight)',
    letterSpacing: 'var(--type-button-letter-spacing)',
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 16px',
    fontSize: '14px',
    whiteSpace: 'nowrap'
  };
  return React.createElement('nav', {
    style: s,
    ...rest
  }, React.createElement('span', {
    style: logoStyle
  }, logo || 'Figma'), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flex: 1
    }
  }, links.map((l, i) => React.createElement('a', {
    key: i,
    href: l.href || '#',
    style: linkStyle
  }, l.label || l))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginLeft: 'auto'
    }
  }, ctaSecondary && React.createElement('button', {
    style: {
      ...pillBase,
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)',
      border: '1px solid var(--color-hairline)'
    }
  }, ctaSecondary), cta && React.createElement('button', {
    style: {
      ...pillBase,
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)'
    }
  }, cta)));
}
Object.assign(__ds_scope, { TopNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/FeatureSections.jsx
try { (() => {
const React = window.React;
function FeatureSections() {
  const {
    ColorBlock,
    Button,
    TemplateCard,
    Badge,
    IconButton
  } = window.__DS;
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0'
    }
  },
  // Lime block — Design Systems
  React.createElement('div', {
    style: {
      padding: '0 48px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, React.createElement(ColorBlock, {
    color: 'lime',
    style: {
      padding: '64px 80px'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow-size)',
      fontWeight: 'var(--type-eyebrow-weight)',
      lineHeight: 'var(--type-eyebrow-line-height)',
      letterSpacing: 'var(--type-eyebrow-letter-spacing)',
      textTransform: 'uppercase',
      marginBottom: '12px'
    }
  }, 'Design systems'), React.createElement('div', {
    style: {
      fontSize: 'var(--type-display-lg-size)',
      fontWeight: 'var(--type-display-lg-weight)',
      lineHeight: 'var(--type-display-lg-line-height)',
      letterSpacing: 'var(--type-display-lg-letter-spacing)',
      marginBottom: '12px'
    }
  }, 'Build at scale'), React.createElement('p', {
    style: {
      fontSize: 'var(--type-subhead-size)',
      fontWeight: 'var(--type-subhead-weight)',
      lineHeight: 'var(--type-subhead-line-height)',
      letterSpacing: 'var(--type-subhead-letter-spacing)',
      maxWidth: '520px',
      margin: '0 0 24px'
    }
  }, 'Manage design at scale with a system that your whole team can contribute to, consume, and evolve.'), React.createElement(Button, {
    variant: 'primary'
  }, 'Explore design systems'))),
  // White spacer
  React.createElement('div', {
    style: {
      height: '96px'
    }
  }),
  // Navy block — Ship Products
  React.createElement('div', {
    style: {
      padding: '0 48px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, React.createElement(ColorBlock, {
    color: 'navy',
    style: {
      padding: '64px 80px'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow-size)',
      fontWeight: 'var(--type-eyebrow-weight)',
      lineHeight: 'var(--type-eyebrow-line-height)',
      letterSpacing: 'var(--type-eyebrow-letter-spacing)',
      textTransform: 'uppercase',
      marginBottom: '12px',
      opacity: 0.7
    }
  }, 'Developer handoff'), React.createElement('div', {
    style: {
      fontSize: 'var(--type-display-lg-size)',
      fontWeight: 'var(--type-display-lg-weight)',
      lineHeight: 'var(--type-display-lg-line-height)',
      letterSpacing: 'var(--type-display-lg-letter-spacing)',
      marginBottom: '12px'
    }
  }, 'Ship products faster'), React.createElement('p', {
    style: {
      fontSize: 'var(--type-subhead-size)',
      fontWeight: 'var(--type-subhead-weight)',
      lineHeight: 'var(--type-subhead-line-height)',
      letterSpacing: 'var(--type-subhead-letter-spacing)',
      maxWidth: '520px',
      margin: '0 0 24px',
      opacity: 0.85
    }
  }, 'Go from design to development seamlessly with Dev Mode — inspect, export, and generate code.'), React.createElement(Button, {
    variant: 'secondary',
    style: {
      background: 'transparent',
      color: 'var(--color-inverse-ink)',
      borderColor: 'rgba(255,255,255,0.3)'
    }
  }, 'Explore Dev Mode'))),
  // White spacer
  React.createElement('div', {
    style: {
      height: '96px'
    }
  }),
  // Coral block — Prototyping
  React.createElement('div', {
    style: {
      padding: '0 48px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, React.createElement(ColorBlock, {
    color: 'coral',
    style: {
      padding: '64px 80px'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow-size)',
      fontWeight: 'var(--type-eyebrow-weight)',
      lineHeight: 'var(--type-eyebrow-line-height)',
      letterSpacing: 'var(--type-eyebrow-letter-spacing)',
      textTransform: 'uppercase',
      marginBottom: '12px'
    }
  }, 'Prototyping'), React.createElement('div', {
    style: {
      fontSize: 'var(--type-display-lg-size)',
      fontWeight: 'var(--type-display-lg-weight)',
      lineHeight: 'var(--type-display-lg-line-height)',
      letterSpacing: 'var(--type-display-lg-letter-spacing)',
      marginBottom: '12px'
    }
  }, 'Bring ideas to life'), React.createElement('p', {
    style: {
      fontSize: 'var(--type-subhead-size)',
      fontWeight: 'var(--type-subhead-weight)',
      lineHeight: 'var(--type-subhead-line-height)',
      letterSpacing: 'var(--type-subhead-letter-spacing)',
      maxWidth: '520px',
      margin: '0 0 24px'
    }
  }, 'Create interactive prototypes that feel real — test flows, validate decisions, and iterate with confidence.'), React.createElement(Button, {
    variant: 'primary'
  }, 'Start prototyping'))),
  // White spacer
  React.createElement('div', {
    style: {
      height: '96px'
    }
  }),
  // Template grid section
  React.createElement('div', {
    style: {
      padding: '0 48px',
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, React.createElement('div', {
    style: {
      textAlign: 'center',
      marginBottom: '40px'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-eyebrow-size)',
      fontWeight: 'var(--type-eyebrow-weight)',
      lineHeight: 'var(--type-eyebrow-line-height)',
      letterSpacing: 'var(--type-eyebrow-letter-spacing)',
      textTransform: 'uppercase',
      marginBottom: '12px',
      color: 'var(--color-ink)'
    }
  }, 'Templates'), React.createElement('div', {
    style: {
      fontSize: 'var(--type-display-lg-size)',
      fontWeight: 'var(--type-display-lg-weight)',
      lineHeight: 'var(--type-display-lg-line-height)',
      letterSpacing: 'var(--type-display-lg-letter-spacing)',
      color: 'var(--color-ink)'
    }
  }, 'Explore what people are making')), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px'
    }
  }, React.createElement(TemplateCard, {
    title: 'Brand Guidelines'
  }), React.createElement(TemplateCard, {
    title: 'Wireframe Kit'
  }), React.createElement(TemplateCard, {
    title: 'Design System'
  }), React.createElement(TemplateCard, {
    title: 'Presentation'
  }), React.createElement(TemplateCard, {
    title: 'Mobile App Kit'
  }), React.createElement(TemplateCard, {
    title: 'Landing Page'
  }))));
}
window.FeatureSections = FeatureSections;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/FeatureSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Footer.jsx
try { (() => {
const React = window.React;
function Footer() {
  const cols = [{
    head: 'Use cases',
    links: ['UI design', 'UX design', 'Wireframing', 'Diagramming', 'Prototyping', 'Brainstorming', 'Design handoff']
  }, {
    head: 'Explore',
    links: ['Design', 'Prototyping', 'Design systems', 'Downloads', 'Figma AI', 'Dev Mode']
  }, {
    head: 'Resources',
    links: ['Blog', 'Best practices', 'Support', 'Developers', 'Resource library', 'Education']
  }, {
    head: 'Compare',
    links: ['Sketch', 'Adobe XD', 'InVision', 'Miro', 'Framer']
  }, {
    head: 'Company',
    links: ['About', 'Careers', 'Partners', 'Events', 'Press', 'Terms', 'Privacy']
  }];
  return React.createElement('footer', {
    style: {
      fontFamily: 'var(--font-sans)',
      padding: '64px 48px 32px',
      maxWidth: '1280px',
      margin: '0 auto',
      borderTop: '1px solid var(--color-hairline-soft)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: '48px',
      marginBottom: '48px'
    }
  }, React.createElement('div', {
    style: {
      minWidth: '180px'
    }
  }, React.createElement('div', {
    style: {
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '-0.3px',
      marginBottom: '16px'
    }
  }, 'Figma')), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '32px',
      flex: 1
    }
  }, cols.map((col, i) => React.createElement('div', {
    key: i
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--type-caption-size)',
      fontWeight: 'var(--type-caption-weight)',
      lineHeight: 'var(--type-caption-line-height)',
      letterSpacing: 'var(--type-caption-letter-spacing)',
      textTransform: 'uppercase',
      marginBottom: '12px',
      color: 'var(--color-ink)'
    }
  }, col.head), col.links.map((l, j) => React.createElement('a', {
    key: j,
    href: '#',
    style: {
      display: 'block',
      fontSize: 'var(--type-body-sm-size)',
      fontWeight: 'var(--type-body-sm-weight)',
      lineHeight: '2',
      color: 'var(--color-ink)',
      textDecoration: 'none'
    }
  }, l)))))), React.createElement('div', {
    style: {
      fontSize: '13px',
      fontWeight: 320,
      color: 'var(--color-ink)',
      opacity: 0.5,
      borderTop: '1px solid var(--color-hairline-soft)',
      paddingTop: '16px'
    }
  }, '© 2024 Figma, Inc.'));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
const React = window.React;
function Hero() {
  const {
    Button
  } = window.__DS;
  return React.createElement('section', {
    style: {
      padding: '96px 48px 64px',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      maxWidth: '960px',
      margin: '0 auto'
    }
  }, React.createElement('h1', {
    style: {
      fontSize: 'var(--type-display-xl-size)',
      fontWeight: 'var(--type-display-xl-weight)',
      lineHeight: 'var(--type-display-xl-line-height)',
      letterSpacing: 'var(--type-display-xl-letter-spacing)',
      margin: '0 0 16px',
      color: 'var(--color-ink)'
    }
  }, 'How you design, align, and build matters'), React.createElement('p', {
    style: {
      fontSize: 'var(--type-body-lg-size)',
      fontWeight: 'var(--type-body-lg-weight)',
      lineHeight: 'var(--type-body-lg-line-height)',
      letterSpacing: 'var(--type-body-lg-letter-spacing)',
      margin: '0 0 32px',
      color: 'var(--color-ink)',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, 'Figma helps design and development teams build great products, together.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    }
  }, React.createElement(Button, {
    variant: 'primary'
  }, 'Get started for free'), React.createElement(Button, {
    variant: 'secondary'
  }, 'Contact sales')));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.TemplateCard = __ds_scope.TemplateCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.PromoBanner = __ds_scope.PromoBanner;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.ColorBlock = __ds_scope.ColorBlock;

__ds_ns.MarqueeStrip = __ds_scope.MarqueeStrip;

__ds_ns.TopNav = __ds_scope.TopNav;

})();
