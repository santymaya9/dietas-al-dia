import styled from 'styled-components';
import { ageOf, bmiOf, flagLabel, initials } from '../logic.js';
import { Chip, Icon } from '../ui.jsx';

// Franja de contexto del paciente. Se reutiliza en la vista principal y en el panel de la ficha técnica (CA3).
const Strip = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px;
  .av { width: ${({ $compact }) => ($compact ? '38px' : '52px')}; height: ${({ $compact }) => ($compact ? '38px' : '52px')}; border-radius: 50%; background: ${({ theme }) => theme.c.primary}; color: #fff; display: grid; place-items: center; font-family: ${({ theme }) => theme.font.display}; font-weight: 700; flex: none; }
  .name { font-family: ${({ theme }) => theme.font.display}; font-weight: 700; font-size: ${({ $compact }) => ($compact ? '17px' : '22px')}; line-height: 1.15; }
  .meta { color: ${({ theme }) => theme.c.muted}; font-size: 13.5px; }
  .flags { display: flex; flex-wrap: wrap; gap: 6px; }
`;

export default function PatientContext({ patient, compact = false }) {
  return (
    <Strip $compact={compact}>
      <span className="av">{initials(patient)}</span>
      <div style={{ minWidth: 0 }}>
        <div className="name">{patient.nombre} {patient.apellidos}</div>
        <div className="meta">
          {ageOf(patient.nacimiento)} años · {patient.peso} kg · {patient.talla} cm · IMC {bmiOf(patient.peso, patient.talla)}
        </div>
      </div>
      <div className="flags" style={{ marginLeft: compact ? 0 : 'auto' }}>
        {patient.alergias.map((a) => <Chip key={a} $t="danger"><Icon name="alert" size={13} /> Alergia: {flagLabel(a)}</Chip>)}
        {patient.incompatibilidades.map((a) => <Chip key={a} $t="warn">No tolera: {flagLabel(a)}</Chip>)}
        {!patient.alergias.length && !patient.incompatibilidades.length && <Chip $t="ok">Sin alergias registradas</Chip>}
      </div>
    </Strip>
  );
}
