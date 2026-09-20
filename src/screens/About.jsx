import styled from 'styled-components';
import { Card, Chip, Muted, Page } from '../ui.jsx';

// Objetivo del prototipo y requisitos priorizados (EPC28). Es lo que la rúbrica espera ver dentro del prototipo.
const REQS = [
  { id: 'RF-A3', p: 'Alta', ca: 'CA2', t: 'Señalar alergias e incompatibilidades en cada dieta', d: 'Cruza los alimentos de la dieta con las alergias e incompatibilidades del paciente. La alerta se ve en la lista y vuelve a aparecer al confirmar, donde exige un reconocimiento explícito.' },
  { id: 'RF-A2', p: 'Alta', ca: 'CA1', t: 'Ver las dietas de la enfermedad del paciente en un paso', d: 'Al abrir al paciente aparecen las dietas asociadas a su enfermedad, con las seguras primero.' },
  { id: 'RF-A4', p: 'Alta', ca: 'CA3', t: 'Abrir la ficha técnica sin perder al paciente', d: 'Un panel lateral muestra los campos de la dieta y mantiene visibles al paciente y sus alergias.' },
  { id: 'RF-A5', p: 'Alta', ca: 'CA4', t: 'Confirmar y registrar la asignación', d: 'La dieta asignada queda en la historia clínica. La app mide el tiempo hasta la asignación (meta: menos de 90 s).' },
  { id: 'RF-A1', p: 'Media', ca: 'CA1', t: 'Consultar la historia clínica del paciente', d: 'Habilitador de los demás: la gestión completa de la historia clínica es otro requisito (RF6) y aquí solo se consulta.' },
];

const STEPS = [
  'Ingresa con natalia.restrepo@clinicanutri.co.',
  'Abre a María Fernanda Ospina. Tiene diabetes e hipertensión.',
  'Compara las tres dietas de diabetes: una segura, una con incompatibilidad y una con alergia.',
  'Abre la ficha técnica de “Dieta de control glucémico con lácteos” y mira cómo el paciente sigue visible.',
  'Intenta asignar esa dieta: el sistema pide reconocer las alertas. Luego asigna “Dieta de bajo índice glucémico” y revisa el tiempo.',
];

const Hero = styled(Card)`padding: 28px; margin: 18px 0 28px; p { font-size: 18px; line-height: 1.55; max-width: 62ch; }`;
const List = styled.div`display: grid; gap: 10px;`;
const Req = styled(Card)`
  display: grid; grid-template-columns: 92px 1fr; gap: 6px 18px; padding: 16px 20px;
  .id { font-family: ${({ theme }) => theme.font.display}; font-weight: 700; font-size: 18px; }
  h3 { font-size: 17px; margin-bottom: 4px; }
  .chips { display: flex; gap: 6px; margin-top: 8px; }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;
const Steps = styled.ol`margin: 0; padding-left: 22px; display: grid; gap: 8px; max-width: 70ch;`;

export default function About() {
  return (
    <Page>
      <h1 style={{ fontSize: 32 }}>Objetivo y requisitos del prototipo</h1>
      <Muted>Épica EPC28: asignación de tratamiento nutricional</Muted>

      <Hero>
        <h2 style={{ fontSize: 15, color: '#5B6E67', marginBottom: 10, fontFamily: 'inherit', fontWeight: 600 }}>Objetivo</h2>
        <p>
          Validar que el médico del Departamento de Nutrición puede consultar las dietas asociadas al diagnóstico de un paciente,
          ver de forma inequívoca cuáles contienen alimentos que sus alergias o incompatibilidades desaconsejan, y asignar
          una dieta con seguridad sin cruzar a mano la historia clínica con el catálogo.
        </p>
      </Hero>

      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Requisitos de mayor prioridad</h2>
      <List>
        {REQS.map((r) => (
          <Req key={r.id}>
            <div className="id">{r.id}</div>
            <div>
              <h3>{r.t}</h3>
              <Muted>{r.d}</Muted>
              <div className="chips">
                <Chip $t={r.p === 'Alta' ? 'danger' : 'neutral'}>Prioridad {r.p.toLowerCase()}</Chip>
                <Chip $t="primary">{r.ca}</Chip>
              </div>
            </div>
          </Req>
        ))}
      </List>

      <h2 style={{ fontSize: 22, margin: '32px 0 12px' }}>Cómo probarlo</h2>
      <Steps>{STEPS.map((s) => <li key={s}>{s}</li>)}</Steps>
    </Page>
  );
}
