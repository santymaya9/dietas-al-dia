import { useState } from 'react';
import styled from 'styled-components';
import { ACCOUNTS } from '../data.js';
import { Banner, Button, Icon, Overlay, Sheet } from '../ui.jsx';

const Wrap = styled.div`
  min-height: 100vh; display: grid; place-items: center; padding: 20px;
`;
const Panel = styled.div`
  width: min(440px, 100%); background: ${({ theme }) => theme.c.surface}; border: 1px solid ${({ theme }) => theme.c.line};
  border-radius: ${({ theme }) => theme.r.lg}; padding: 36px 32px; display: grid; gap: 22px;
  @media (max-width: 480px) { padding: 28px 20px; }
`;
const Mark = styled.div`
  width: 52px; height: 52px; border-radius: 16px; background: ${({ theme }) => theme.c.primary}; color: #fff; display: grid; place-items: center;
`;
const Title = styled.h1`font-size: 34px;`;
const Sub = styled.p`color: ${({ theme }) => theme.c.muted}; max-width: 34ch;`;
const GoogleBtn = styled.button`
  display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 50px; border-radius: 999px; cursor: pointer; font-weight: 600;
  background: #fff; color: ${({ theme }) => theme.c.ink}; border: 1.5px solid ${({ theme }) => theme.c.line};
  &:hover { border-color: ${({ theme }) => theme.c.primary}; }
`;
const Note = styled.p`font-size: 13px; color: ${({ theme }) => theme.c.muted};`;
const Acc = styled.button`
  display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px; border-radius: 12px; border: 0; background: none; cursor: pointer;
  &:hover { background: ${({ theme }) => theme.c.bg}; }
  .av { width: 38px; height: 38px; border-radius: 50%; background: ${({ theme }) => theme.c.primarySoft}; color: ${({ theme }) => theme.c.primary}; display: grid; place-items: center; font-weight: 700; flex: none; }
  small { display: block; color: ${({ theme }) => theme.c.muted}; }
`;

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
    <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 019.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 000 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
);

export default function Login({ onLogin }) {
  const [picking, setPicking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Simulación de Google Sign-In. Regla de negocio: solo entran cuentas registradas.
  const choose = (acc) => {
    setPicking(false);
    if (!acc.registrada) {
      setError(`La cuenta ${acc.email} no está registrada. Pide acceso al administrador del Departamento de Nutrición.`);
      return;
    }
    setError('');
    setBusy(true);
    setTimeout(() => onLogin({ nombre: acc.nombre, email: acc.email }), 700);
  };

  return (
    <Wrap>
      <Panel>
        <Mark><Icon name="leaf" size={28} /></Mark>
        <div>
          <Title>Dietas al Día</Title>
          <Sub>Elige la dieta adecuada para cada paciente, con sus alergias siempre a la vista.</Sub>
        </div>
        {error && <Banner $t="danger" role="alert"><Icon name="alert" /> {error}</Banner>}
        <GoogleBtn onClick={() => setPicking(true)} disabled={busy}>
          <GoogleG /> {busy ? 'Ingresando…' : 'Continuar con Google'}
        </GoogleBtn>
        <Note>Acceso solo para médicos del Departamento de Nutrición con cuenta de Google registrada.</Note>
      </Panel>

      {picking && (
        <Overlay onClick={() => setPicking(false)}>
          <Sheet onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Elegir cuenta de Google">
            <h3 style={{ marginBottom: 6 }}>Elige una cuenta</h3>
            <p style={{ marginBottom: 12, fontSize: 13.5 }}>para continuar en Dietas al Día</p>
            {ACCOUNTS.map((a) => (
              <Acc key={a.email} onClick={() => choose(a)}>
                <span className="av">{a.nombre.replace(/^(Dra?\.) /, '')[0]}</span>
                <span>{a.nombre}<small>{a.email}</small></span>
              </Acc>
            ))}
            <Button $v="ghost" style={{ marginTop: 12, width: '100%' }} onClick={() => setPicking(false)}>Cancelar</Button>
          </Sheet>
        </Overlay>
      )}
    </Wrap>
  );
}
