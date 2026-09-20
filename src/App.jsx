import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PATIENTS_SEED } from './data.js';
import { Icon } from './ui.jsx';
import Login from './screens/Login.jsx';
import Patients from './screens/Patients.jsx';
import PatientView from './screens/PatientView.jsx';
import Catalog from './screens/Catalog.jsx';
import About from './screens/About.jsx';

const KEY_USER = 'dal:user';
const KEY_PATIENTS = 'dal:patients';

// Lectura y escritura tolerantes a fallos (modo privado, cuota, etc.).
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sin persistencia: el prototipo sigue funcionando en memoria */
  }
};

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ theme }) => theme.c.surface};
  border-bottom: 1px solid ${({ theme }) => theme.c.line};
`;
const BarInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 600px) { padding: 8px 14px; gap: 10px; flex-wrap: wrap; }
`;
const Brand = styled.button`
  display: flex; align-items: center; gap: 10px; border: 0; background: none; cursor: pointer; padding: 0;
  font-family: ${({ theme }) => theme.font.display}; font-weight: 700; font-size: 19px; color: ${({ theme }) => theme.c.ink};
  span.logo { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 10px; background: ${({ theme }) => theme.c.primary}; color: #fff; }
`;
const Nav = styled.nav`
  display: flex; gap: 4px; margin-right: auto;
`;
const NavBtn = styled.button`
  display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 14px; border-radius: 999px; border: 0; cursor: pointer; font-weight: 600;
  background: ${({ $on, theme }) => ($on ? theme.c.primarySoft : 'transparent')};
  color: ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.muted)};
  &:hover { color: ${({ theme }) => theme.c.primary}; }
`;
const User = styled.div`
  display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: ${({ theme }) => theme.c.muted};
  strong { color: ${({ theme }) => theme.c.ink}; display: block; line-height: 1.2; }
  @media (max-width: 720px) { .who { display: none; } }
`;
const Out = styled.button`
  display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; border: 1px solid ${({ theme }) => theme.c.line}; background: none; cursor: pointer; color: ${({ theme }) => theme.c.muted};
  &:hover { color: ${({ theme }) => theme.c.danger}; border-color: ${({ theme }) => theme.c.danger}; }
`;

export default function App() {
  const [user, setUser] = useState(() => load(KEY_USER, null));
  const [patients, setPatients] = useState(() => load(KEY_PATIENTS, PATIENTS_SEED));
  const [view, setView] = useState('patients'); // 'patients' | 'catalog' | 'about'
  const [openId, setOpenId] = useState(null);

  useEffect(() => save(KEY_PATIENTS, patients), [patients]);

  const login = (account) => {
    setUser(account);
    save(KEY_USER, account);
  };
  const logout = () => {
    setUser(null);
    setOpenId(null);
    save(KEY_USER, null);
  };

  // RF-A5: registra la asignación en la historia clínica del paciente.
  const assign = (patientId, entry) =>
    setPatients((list) => list.map((p) => (p.id === patientId ? { ...p, asignaciones: [entry, ...p.asignaciones] } : p)));

  const resetDemo = () => setPatients(PATIENTS_SEED);

  if (!user) return <Login onLogin={login} />;

  const patient = patients.find((p) => p.id === openId);
  const go = (v) => {
    setView(v);
    setOpenId(null);
  };

  return (
    <>
      <Bar>
        <BarInner>
          <Brand onClick={() => go('patients')} aria-label="Ir al inicio">
            <span className="logo"><Icon name="leaf" size={20} /></span>
            Dietas al Día
          </Brand>
          <Nav aria-label="Principal">
            <NavBtn $on={view === 'patients'} onClick={() => go('patients')}><Icon name="users" /> Pacientes</NavBtn>
            <NavBtn $on={view === 'catalog'} onClick={() => go('catalog')}><Icon name="book" /> Catálogos</NavBtn>
            <NavBtn $on={view === 'about'} onClick={() => go('about')}><Icon name="file" /> Objetivo</NavBtn>
          </Nav>
          <User>
            <div className="who"><strong>{user.nombre}</strong>{user.email}</div>
            <Out onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión"><Icon name="logout" /></Out>
          </User>
        </BarInner>
      </Bar>

      {view === 'catalog' ? (
        <Catalog />
      ) : view === 'about' ? (
        <About />
      ) : patient ? (
        <PatientView key={patient.id} patient={patient} doctor={user} onBack={() => setOpenId(null)} onAssign={assign} />
      ) : (
        <Patients patients={patients} doctor={user} onOpen={setOpenId} onReset={resetDemo} />
      )}
    </>
  );
}
