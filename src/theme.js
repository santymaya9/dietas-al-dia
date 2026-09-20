import { createGlobalStyle } from 'styled-components';

export const theme = {
  c: {
    bg: '#F1F6F4',
    surface: '#FFFFFF',
    ink: '#12261F',
    muted: '#5B6E67',
    line: '#DCE6E1',
    primary: '#0B5D50',
    primaryHover: '#094A40',
    primarySoft: '#DCEBE4',
    ok: '#1F7A4D',
    okSoft: '#E3F3EA',
    warn: '#A8620A',
    warnSoft: '#FCF0DB',
    danger: '#B8281D',
    dangerSoft: '#FCE8E5',
  },
  font: {
    display: "'Bricolage Grotesque', 'Segoe UI', system-ui, sans-serif",
    body: "'Instrument Sans', 'Segoe UI', system-ui, sans-serif",
  },
  r: { sm: '8px', md: '14px', lg: '22px' },
};

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    background: ${({ theme }) => theme.c.bg};
    color: ${({ theme }) => theme.c.ink};
    font-family: ${({ theme }) => theme.font.body};
    font-size: 15px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { font-family: ${({ theme }) => theme.font.display}; margin: 0; line-height: 1.15; letter-spacing: -0.01em; }
  p { margin: 0; }
  button, input, select { font-family: inherit; font-size: inherit; }
  :focus-visible { outline: 3px solid ${({ theme }) => theme.c.primary}; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;
