import { useEffect, useState } from 'react';
import { analyzeDiet, flagLabel } from '../logic.js';
import { Banner, Button, Icon, Overlay, Sheet } from '../ui.jsx';
import styled from 'styled-components';

const Check = styled.label`
  display: flex; gap: 12px; align-items: flex-start; padding: 14px; border-radius: 12px; border: 1.5px solid ${({ theme }) => theme.c.danger}; cursor: pointer; margin: 16px 0;
  input { width: 22px; height: 22px; margin-top: 1px; accent-color: ${({ theme }) => theme.c.danger}; flex: none; }
`;
const List = styled.ul`margin: 10px 0 0; padding-left: 18px; font-weight: 400; li { margin: 3px 0; }`;

// CA2: la alerta es inequívoca y bloquea la confirmación hasta que el médico la reconozca.
export default function AssignModal({ diet, patient, onCancel, onConfirm }) {
  const { conflicts, level } = analyzeDiet(diet, patient);
  const [ack, setAck] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const needsAck = level !== 'safe';

  return (
    <Overlay onClick={onCancel} style={{ zIndex: 60 }}>
      <Sheet onClick={(e) => e.stopPropagation()} role="alertdialog" aria-label="Confirmar asignación">
        <h2 style={{ fontSize: 24, marginBottom: 6 }}>Confirmar asignación</h2>
        <p style={{ marginBottom: 16 }}>
          Vas a asignar <strong>{diet.nombre}</strong> ({diet.kcal} kcal/día) a <strong>{patient.nombre} {patient.apellidos}</strong>.
        </p>

        {!needsAck && <Banner $t="ok"><Icon name="check" /> Esta dieta no tiene alertas para este paciente.</Banner>}

        {needsAck && (
          <>
            <Banner $t={level === 'critical' ? 'danger' : 'warn'} role="alert">
              <Icon name="alert" />
              <div>
                {level === 'critical' ? 'Alerta de alergia: esta dieta no es segura para el paciente.' : 'Alerta de incompatibilidad: el paciente no tolera parte de esta dieta.'}
                <List>
                  {conflicts.map((c, i) => (
                    <li key={i}><strong>{c.food.nombre}</strong>: {c.kind} a {flagLabel(c.flag)}</li>
                  ))}
                </List>
              </div>
            </Banner>
            <Check>
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
              <span>Revisé las alertas y confirmo que quiero asignar esta dieta bajo mi criterio clínico.</span>
            </Check>
          </>
        )}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: needsAck ? 0 : 20 }}>
          <Button $v="ghost" onClick={onCancel}>Cancelar</Button>
          <Button $v={level === 'critical' ? 'danger' : 'primary'} disabled={needsAck && !ack} onClick={() => onConfirm({ conAlertas: needsAck, alertas: conflicts.map((c) => `${c.food.nombre}: ${c.kind} a ${flagLabel(c.flag)}`) })}>
            {needsAck ? 'Asignar con alerta' : 'Asignar dieta'}
          </Button>
        </div>
      </Sheet>
    </Overlay>
  );
}
