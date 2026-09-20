import { useEffect } from 'react';
import styled from 'styled-components';
import { analyzeDiet, flagLabel, foodById } from '../logic.js';
import { Banner, Button, Chip, Icon, Overlay, Sheet } from '../ui.jsx';
import PatientContext from './PatientContext.jsx';

const Top = styled.div`padding: 16px 20px; border-bottom: 1px solid ${({ theme }) => theme.c.line}; background: ${({ theme }) => theme.c.bg};`;
const Body = styled.div`flex: 1; overflow: auto; padding: 20px; display: grid; gap: 20px; align-content: start;`;
const Foot = styled.div`padding: 14px 20px; border-top: 1px solid ${({ theme }) => theme.c.line}; display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap;`;
const Field = styled.div`
  h4 { font-size: 13.5px; color: ${({ theme }) => theme.c.muted}; font-family: ${({ theme }) => theme.font.body}; font-weight: 600; margin-bottom: 4px; }
`;
const Grid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 16px; @media (max-width: 480px) { grid-template-columns: 1fr; }`;
const Table = styled.table`
  width: 100%; border-collapse: collapse; font-size: 14px;
  th { text-align: left; font-weight: 600; color: ${({ theme }) => theme.c.muted}; padding: 6px 0; font-size: 13px; }
  td { padding: 9px 0; border-top: 1px solid ${({ theme }) => theme.c.line}; }
  td:nth-child(2) { white-space: nowrap; padding: 9px 12px; }
  tr.bad td { background: ${({ theme }) => theme.c.dangerSoft}; }
  tr.bad td:first-child { padding-left: 10px; font-weight: 600; }
`;
const Kcal = styled.div`font-family: ${({ theme }) => theme.font.display}; font-size: 30px; font-weight: 700; small { font-size: 14px; color: ${({ theme }) => theme.c.muted}; font-weight: 500; }`;

// CA3: ficha técnica completa en un panel lateral; el paciente sigue visible arriba y detrás.
export default function DietDrawer({ diet, patient, onClose, onAssign }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const { conflicts, level } = analyzeDiet(diet, patient);
  const badFoods = new Set(conflicts.map((c) => c.food.id));

  return (
    <Overlay $align="end" onClick={onClose}>
      <Sheet $drawer onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Ficha técnica: ${diet.nombre}`}>
        <Top>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
            <PatientContext patient={patient} compact />
            <Button $v="ghost" style={{ padding: 0, width: 40, minHeight: 40 }} onClick={onClose} aria-label="Cerrar ficha"><Icon name="close" /></Button>
          </div>
        </Top>

        <Body>
          <div>
            <Chip $t="primary" style={{ marginBottom: 8 }}>Ficha técnica</Chip>
            <h2 style={{ fontSize: 26 }}>{diet.nombre}</h2>
          </div>

          {level !== 'safe' && (
            <Banner $t={level === 'critical' ? 'danger' : 'warn'} role="alert">
              <Icon name="alert" />
              <div>
                {level === 'critical' ? 'Esta dieta contiene alimentos a los que el paciente es alérgico.' : 'Esta dieta contiene alimentos que el paciente no tolera.'}
                <div style={{ fontWeight: 400, marginTop: 4 }}>
                  {conflicts.map((c) => `${c.food.nombre} (${c.kind}: ${flagLabel(c.flag)})`).join(' · ')}
                </div>
              </div>
            </Banner>
          )}
          {level === 'safe' && <Banner $t="ok"><Icon name="check" /> Sin alimentos incompatibles con las alergias e incompatibilidades del paciente.</Banner>}

          <Grid>
            <Field><h4>Aporte calórico</h4><Kcal>{diet.kcal} <small>kcal/día</small></Kcal></Field>
            <Field><h4>Vía de administración</h4><p>{diet.via}</p></Field>
          </Grid>
          <Field><h4>Objetivos e indicaciones</h4><p>{diet.objetivos}</p></Field>
          <Field><h4>Definición técnica</h4><p>{diet.definicion}</p></Field>

          <Field>
            <h4>Componentes básicos</h4>
            <Table>
              <thead><tr><th>Alimento</th><th>Porción</th><th>Alerta</th></tr></thead>
              <tbody>
                {diet.componentes.map(({ food, g }) => {
                  const item = foodById(food);
                  const cs = conflicts.filter((c) => c.food.id === food);
                  return (
                    <tr key={food} className={badFoods.has(food) ? 'bad' : ''}>
                      <td>{item.nombre}</td>
                      <td>{g} g</td>
                      <td>{cs.map((c) => <Chip key={c.flag} $t={c.kind === 'alergia' ? 'danger' : 'warn'}>{c.kind === 'alergia' ? 'Alergia' : 'No tolera'}: {flagLabel(c.flag)}</Chip>)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Field>

          <Grid>
            <Field><h4>Ingesta necesaria</h4><p>{diet.ingesta}</p></Field>
            <Field><h4>Duración</h4><p>{diet.duracion}</p></Field>
            <Field><h4>Dosificación</h4><p>{diet.dosificacion}</p></Field>
            <Field><h4>Pauta</h4><p>{diet.pauta}</p></Field>
          </Grid>
          <Field><h4>Suplementos necesarios</h4><p>{diet.suplementos}</p></Field>
        </Body>

        <Foot>
          <Button $v="ghost" onClick={onClose}>Volver al paciente</Button>
          <Button $v={level === 'critical' ? 'danger-ghost' : 'primary'} onClick={() => onAssign(diet)}>
            {level === 'safe' ? 'Asignar esta dieta' : 'Asignar con alerta'}
          </Button>
        </Foot>
      </Sheet>
    </Overlay>
  );
}
