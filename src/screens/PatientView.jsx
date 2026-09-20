import { useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { DIETS, DISEASES } from '../data.js';
import { analyzeDiet, ageOf, bmiOf, flagLabel, LEVEL_ORDER } from '../logic.js';
import { Banner, Button, Card, Chip, Icon, Muted, Page } from '../ui.jsx';
import PatientContext from './PatientContext.jsx';
import DietDrawer from './DietDrawer.jsx';
import AssignModal from './AssignModal.jsx';

const Back = styled.button`display: inline-flex; align-items: center; gap: 6px; border: 0; background: none; color: ${({ theme }) => theme.c.muted}; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 14px; min-height: 36px; &:hover { color: ${({ theme }) => theme.c.primary}; }`;
const Context = styled(Card)`position: sticky; top: 62px; z-index: 10; padding: 14px 18px; margin-bottom: 20px; @media (max-width: 600px) { top: 96px; padding: 12px 14px; }`;
const Tabs = styled.div`display: flex; gap: 6px; margin-bottom: 18px; border-bottom: 1px solid ${({ theme }) => theme.c.line};`;
const Tab = styled.button`
  border: 0; background: none; cursor: pointer; padding: 10px 14px; font-weight: 600; color: ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.muted)};
  border-bottom: 3px solid ${({ $on, theme }) => ($on ? theme.c.primary : 'transparent')}; margin-bottom: -1px; min-height: 44px;
`;
const Diseases = styled.div`display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;`;
const Pill = styled.button`
  min-height: 40px; padding: 0 16px; border-radius: 999px; cursor: pointer; font-weight: 600; border: 1.5px solid ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.line)};
  background: ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.surface)}; color: ${({ $on, theme }) => ($on ? '#fff' : theme.c.ink)};
`;
const Summary = styled.div`display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 14px;`;
const Grid = styled.div`display: grid; gap: 12px;`;

// El borde izquierdo funciona como semáforo: verde, ámbar o rojo según el cruce con la historia clínica.
const DietCard = styled(Card)`
  display: grid; grid-template-columns: 1fr auto; gap: 12px 20px; padding: 18px 20px 18px 22px; border-left-width: 8px;
  ${({ $l, theme }) => css`border-left-color: ${$l === 'critical' ? theme.c.danger : $l === 'warning' ? theme.c.warn : theme.c.ok};`}
  h3 { font-size: 19px; }
  .kcal { font-family: ${({ theme }) => theme.font.display}; font-weight: 700; font-size: 22px; text-align: right; small { display: block; font-family: ${({ theme }) => theme.font.body}; font-weight: 500; font-size: 12.5px; color: ${({ theme }) => theme.c.muted}; } }
  .warnbox { grid-column: 1 / -1; }
  .actions { grid-column: 1 / -1; display: flex; gap: 10px; flex-wrap: wrap; }
  @media (max-width: 520px) { grid-template-columns: 1fr; .kcal { text-align: left; } }
`;

const Section = styled(Card)`padding: 20px; margin-bottom: 14px; h3 { font-size: 18px; margin-bottom: 12px; }`;
const Facts = styled.dl`display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px 24px; margin: 0; dt { color: ${({ theme }) => theme.c.muted}; font-size: 13px; } dd { margin: 2px 0 0; font-weight: 500; }`;

const statusChip = (level) =>
  level === 'critical' ? <Chip $t="danger"><Icon name="alert" size={13} /> Contiene alérgenos</Chip>
  : level === 'warning' ? <Chip $t="warn"><Icon name="alert" size={13} /> Contiene incompatibilidades</Chip>
  : <Chip $t="ok"><Icon name="check" size={13} /> Sin alertas</Chip>;

export default function PatientView({ patient, doctor, onBack, onAssign }) {
  const [tab, setTab] = useState('dietas');
  const [diseaseId, setDiseaseId] = useState(patient.enfermedades[0] || null);
  const [drawer, setDrawer] = useState(null);
  const [pending, setPending] = useState(null);
  const [done, setDone] = useState(null);
  const started = useRef(Date.now()); // Mide el tiempo hasta la asignación (meta CA4: menos de 90 s).

  const diseases = patient.enfermedades.map((id) => DISEASES.find((d) => d.id === id));

  // CA1: dietas asociadas a la enfermedad, seguras primero.
  const rows = useMemo(
    () =>
      DIETS.filter((d) => d.diseases.includes(diseaseId))
        .map((diet) => ({ diet, ...analyzeDiet(diet, patient) }))
        .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]),
    [diseaseId, patient]
  );
  const count = (l) => rows.filter((r) => r.level === l).length;
  const assignedIds = patient.asignaciones.map((a) => a.dietId);

  const confirm = (extra) => {
    const seconds = Math.round((Date.now() - started.current) / 1000);
    onAssign(patient.id, {
      dietId: pending.id,
      dietNombre: pending.nombre,
      fecha: new Date().toISOString(),
      medico: doctor.nombre,
      enfermedadId: diseaseId,
      ...extra,
    });
    setDone({ nombre: pending.nombre, seconds, conAlertas: extra.conAlertas });
    setPending(null);
    setDrawer(null);
    setTab('dietas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Page>
      <Back onClick={onBack}><Icon name="back" /> Pacientes</Back>
      <Context><PatientContext patient={patient} /></Context>

      {done && (
        <Banner $t={done.conAlertas ? 'warn' : 'ok'} style={{ marginBottom: 16 }} role="status">
          <Icon name={done.conAlertas ? 'alert' : 'check'} />
          <div>
            Dieta “{done.nombre}” asignada y registrada en la historia clínica{done.conAlertas ? ', con alertas reconocidas' : ''}.
            <div style={{ fontWeight: 400, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="clock" size={15} /> Tiempo desde que abriste al paciente: {done.seconds} s (meta: menos de 90 s).
            </div>
          </div>
        </Banner>
      )}

      <Tabs role="tablist">
        <Tab role="tab" $on={tab === 'dietas'} aria-selected={tab === 'dietas'} onClick={() => setTab('dietas')}>Dietas</Tab>
        <Tab role="tab" $on={tab === 'historia'} aria-selected={tab === 'historia'} onClick={() => setTab('historia')}>Historia clínica</Tab>
      </Tabs>

      {tab === 'dietas' && (
        <>
          {!diseases.length && (
            <Card style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 6 }}>Este paciente no tiene una enfermedad registrada</h3>
              <Muted>Registra un diagnóstico en su historia clínica para ver las dietas asociadas.</Muted>
            </Card>
          )}

          {diseases.length > 0 && (
            <>
              <Diseases aria-label="Enfermedades registradas">
                {diseases.map((d) => (
                  <Pill key={d.id} $on={d.id === diseaseId} onClick={() => setDiseaseId(d.id)}>{d.nombre}</Pill>
                ))}
              </Diseases>

              <Summary>
                <strong>{rows.length} dietas asociadas</strong>
                {count('safe') > 0 && <Chip $t="ok">{count('safe')} sin alertas</Chip>}
                {count('warning') > 0 && <Chip $t="warn">{count('warning')} con incompatibilidad</Chip>}
                {count('critical') > 0 && <Chip $t="danger">{count('critical')} con alergia</Chip>}
              </Summary>

              {count('safe') === 0 && rows.length > 0 && (
                <Banner $t="warn" style={{ marginBottom: 12 }}>
                  <Icon name="alert" /> Ninguna dieta de esta enfermedad está libre de alertas para este paciente. Revisa cada alerta antes de asignar.
                </Banner>
              )}

              <Grid>
                {rows.map(({ diet, level, conflicts }) => (
                  <DietCard key={diet.id} $l={level}>
                    <div>
                      <h3>{diet.nombre}</h3>
                      <Muted>{diet.objetivos}</Muted>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {statusChip(level)}
                        {assignedIds.includes(diet.id) && <Chip $t="primary">Ya asignada</Chip>}
                      </div>
                    </div>
                    <div className="kcal">{diet.kcal}<small>kcal/día</small></div>

                    {conflicts.length > 0 && (
                      <Banner className="warnbox" $t={level === 'critical' ? 'danger' : 'warn'}>
                        <Icon name="alert" />
                        <span>{conflicts.map((c) => `${c.food.nombre} (${c.kind}: ${flagLabel(c.flag)})`).join(' · ')}</span>
                      </Banner>
                    )}

                    <div className="actions">
                      <Button $v="ghost" onClick={() => setDrawer(diet)}><Icon name="file" /> Ver ficha técnica</Button>
                      <Button $v={level === 'critical' ? 'danger-ghost' : 'primary'} onClick={() => setPending(diet)}>
                        {level === 'safe' ? 'Asignar dieta' : 'Asignar con alerta'}
                      </Button>
                    </div>
                  </DietCard>
                ))}
              </Grid>
            </>
          )}
        </>
      )}

      {tab === 'historia' && (
        <>
          <Section>
            <h3>Datos personales</h3>
            <Facts>
              <div><dt>Nombre completo</dt><dd>{patient.nombre} {patient.apellidos}</dd></div>
              <div><dt>Fecha de nacimiento</dt><dd>{new Date(patient.nacimiento + 'T00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })} ({ageOf(patient.nacimiento)} años)</dd></div>
              <div><dt>Domicilio</dt><dd>{patient.domicilio}</dd></div>
              <div><dt>Teléfono</dt><dd>{patient.telefono}</dd></div>
              <div><dt>Número de seguridad social</dt><dd>•••• {patient.ss.slice(-4)}</dd></div>
            </Facts>
          </Section>
          <Section>
            <h3>Medidas</h3>
            <Facts>
              <div><dt>Peso</dt><dd>{patient.peso} kg</dd></div>
              <div><dt>Talla</dt><dd>{patient.talla} cm</dd></div>
              <div><dt>IMC</dt><dd>{bmiOf(patient.peso, patient.talla)} kg/m²</dd></div>
            </Facts>
          </Section>
          <Section>
            <h3>Clínica</h3>
            <Facts>
              <div><dt>Alergias</dt><dd>{patient.alergias.length ? patient.alergias.map(flagLabel).join(', ') : 'Ninguna registrada'}</dd></div>
              <div><dt>Incompatibilidades</dt><dd>{patient.incompatibilidades.length ? patient.incompatibilidades.map(flagLabel).join(', ') : 'Ninguna registrada'}</dd></div>
              <div><dt>Enfermedades asociadas</dt><dd>{diseases.length ? diseases.map((d) => d.nombre).join(', ') : 'Ninguna registrada'}</dd></div>
              <div><dt>Antecedentes familiares</dt><dd>{patient.antecedentes}</dd></div>
            </Facts>
          </Section>
          <Section>
            <h3>Dietas asignadas</h3>
            {patient.asignaciones.length === 0 ? (
              <Muted>Aún no hay dietas asignadas. Ve a la pestaña Dietas para asignar la primera.</Muted>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {patient.asignaciones.map((a, i) => (
                  <div key={i} style={{ display: 'grid', gap: 4 }}>
                    <strong>{a.dietNombre}</strong>
                    <Muted>{new Date(a.fecha).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })} · {a.medico}</Muted>
                    {a.conAlertas && <Chip $t="warn" style={{ justifySelf: 'start' }}>Asignada con alertas reconocidas</Chip>}
                    {a.conAlertas && <Muted style={{ fontSize: 13 }}>{a.alertas.join(' · ')}</Muted>}
                  </div>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      {drawer && <DietDrawer diet={drawer} patient={patient} onClose={() => setDrawer(null)} onAssign={(d) => setPending(d)} />}
      {pending && <AssignModal diet={pending} patient={patient} onCancel={() => setPending(null)} onConfirm={confirm} />}
    </Page>
  );
}
