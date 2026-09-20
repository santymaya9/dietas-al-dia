import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { DISEASES } from '../data.js';
import { ageOf, initials, flagLabel } from '../logic.js';
import { Button, Card, Chip, Icon, Input, Muted, Page } from '../ui.jsx';

const Head = styled.div`display: flex; flex-wrap: wrap; gap: 16px; align-items: end; justify-content: space-between; margin-bottom: 20px; h1 { font-size: 32px; }`;
const SearchWrap = styled.div`position: relative; margin-bottom: 18px; svg { position: absolute; left: 16px; top: 14px; color: ${({ theme }) => theme.c.muted}; }`;
const List = styled.div`display: grid; gap: 10px;`;
const Row = styled(Card).attrs({ as: 'button' })`
  display: grid; grid-template-columns: 48px 1fr auto; gap: 16px; align-items: center; padding: 14px 18px; text-align: left; cursor: pointer; font: inherit; color: inherit; width: 100%;
  &:hover { border-color: ${({ theme }) => theme.c.primary}; }
  .av { width: 48px; height: 48px; border-radius: 50%; background: ${({ theme }) => theme.c.primarySoft}; color: ${({ theme }) => theme.c.primary}; display: grid; place-items: center; font-family: ${({ theme }) => theme.font.display}; font-weight: 700; }
  .name { font-weight: 600; font-size: 16px; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  @media (max-width: 640px) { grid-template-columns: 44px 1fr; .side { grid-column: 2; } }
`;
const Side = styled.div`display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end;`;

export default function Patients({ patients, doctor, onOpen, onReset }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return patients.filter((p) => `${p.nombre} ${p.apellidos}`.toLowerCase().includes(t));
  }, [q, patients]);

  return (
    <Page>
      <Head>
        <div>
          <Muted>Hola, {doctor.nombre}</Muted>
          <h1>¿A qué paciente atiendes?</h1>
        </div>
      </Head>

      <SearchWrap>
        <Icon name="search" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar paciente por nombre" aria-label="Buscar paciente" />
      </SearchWrap>

      <List>
        {shown.map((p) => (
          <Row key={p.id} onClick={() => onOpen(p.id)}>
            <span className="av">{initials(p)}</span>
            <div>
              <div className="name">{p.nombre} {p.apellidos}</div>
              <Muted>{ageOf(p.nacimiento)} años</Muted>
              <div className="tags">
                {p.enfermedades.length ? (
                  p.enfermedades.map((id) => <Chip key={id} $t="primary">{DISEASES.find((d) => d.id === id)?.nombre}</Chip>)
                ) : (
                  <Chip>Sin enfermedad registrada</Chip>
                )}
              </div>
            </div>
            <Side className="side">
              {p.alergias.map((a) => <Chip key={a} $t="danger">Alergia: {flagLabel(a)}</Chip>)}
              {p.incompatibilidades.map((a) => <Chip key={a} $t="warn">No tolera: {flagLabel(a)}</Chip>)}
            </Side>
          </Row>
        ))}
        {!shown.length && <Card style={{ padding: 24 }}><Muted>No hay pacientes con ese nombre. Revisa la ortografía o borra la búsqueda.</Muted></Card>}
      </List>

      <div style={{ marginTop: 28 }}>
        <Button $v="ghost" onClick={onReset}>Restablecer datos de demostración</Button>
      </div>
    </Page>
  );
}
