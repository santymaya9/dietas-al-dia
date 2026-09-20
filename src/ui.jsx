import styled, { css, keyframes } from 'styled-components';

const ICONS = {
  leaf: 'M5 19c0-9 5-14 15-15-.5 10-5 15-13 15M5 19c2-5 5-8 9-10',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zm9 16l-4-4',
  alert: 'M12 4l9 16H3L12 4zm0 6v4m0 3h.01',
  check: 'M5 12l5 5L20 7',
  close: 'M6 6l12 12M18 6L6 18',
  file: 'M7 3h7l5 5v13H7V3zm7 0v5h5M10 13h6M10 17h6',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0',
  logout: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h9',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3 2',
  back: 'M15 5l-7 7 7 7',
  book: 'M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm0 13a3 3 0 013-3h10',
  users: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm-6 9a6 6 0 0112 0M16 4.5a3.5 3.5 0 010 6.5M18 14a6 6 0 013 6',
};

export const Icon = ({ name, size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d={ICONS[name]} />
  </svg>
);

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1.5px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  ${({ $v, theme }) =>
    $v === 'ghost'
      ? css`
          background: transparent;
          color: ${theme.c.primary};
          border-color: ${theme.c.line};
          &:hover:not(:disabled) { border-color: ${theme.c.primary}; background: ${theme.c.primarySoft}; }
        `
      : $v === 'danger'
      ? css`
          background: ${theme.c.danger};
          color: #fff;
          &:hover:not(:disabled) { background: #97200f; }
        `
      : $v === 'danger-ghost'
      ? css`
          background: transparent;
          color: ${theme.c.danger};
          border-color: ${theme.c.danger};
          &:hover:not(:disabled) { background: ${theme.c.dangerSoft}; }
        `
      : css`
          background: ${theme.c.primary};
          color: #fff;
          &:hover:not(:disabled) { background: ${theme.c.primaryHover}; }
        `}
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  ${({ $t, theme }) => {
    const m = {
      danger: [theme.c.dangerSoft, theme.c.danger],
      warn: [theme.c.warnSoft, theme.c.warn],
      ok: [theme.c.okSoft, theme.c.ok],
      primary: [theme.c.primarySoft, theme.c.primary],
    }[$t] || ['#EAF0ED', theme.c.muted];
    return css`background: ${m[0]}; color: ${m[1]};`;
  }}
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.c.surface};
  border: 1px solid ${({ theme }) => theme.c.line};
  border-radius: ${({ theme }) => theme.r.md};
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.c.muted};
`;

export const Page = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 20px 64px;
  @media (max-width: 600px) { padding: 16px 14px 56px; }
`;

export const Input = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 0 16px 0 44px;
  border-radius: 999px;
  border: 1.5px solid ${({ theme }) => theme.c.line};
  background: ${({ theme }) => theme.c.surface};
  color: ${({ theme }) => theme.c.ink};
  &::placeholder { color: ${({ theme }) => theme.c.muted}; }
`;

export const Banner = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.r.md};
  font-weight: 500;
  ${({ $t, theme }) =>
    $t === 'danger'
      ? css`background: ${theme.c.dangerSoft}; color: ${theme.c.danger}; border: 1.5px solid ${theme.c.danger};`
      : $t === 'warn'
      ? css`background: ${theme.c.warnSoft}; color: ${theme.c.warn}; border: 1.5px solid ${theme.c.warn};`
      : css`background: ${theme.c.okSoft}; color: ${theme.c.ok}; border: 1.5px solid ${theme.c.ok};`}
  svg { flex: none; margin-top: 2px; }
`;

const fade = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const rise = keyframes`from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; }`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(18, 38, 31, 0.45);
  display: flex;
  align-items: ${({ $align }) => ($align === 'end' ? 'stretch' : 'center')};
  justify-content: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'center')};
  padding: ${({ $align }) => ($align === 'end' ? '0' : '16px')};
  animation: ${fade} 0.15s ease-out;
`;

export const Sheet = styled.div`
  background: ${({ theme }) => theme.c.surface};
  animation: ${rise} 0.2s ease-out;
  ${({ $drawer, theme }) =>
    $drawer
      ? css`
          width: min(580px, 100%);
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -12px 0 40px rgba(18, 38, 31, 0.18);
        `
      : css`
          width: min(520px, 100%);
          max-height: 92vh;
          overflow: auto;
          border-radius: ${theme.r.lg};
          padding: 24px;
        `}
`;
