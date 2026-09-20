import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { DIETS, DISEASES, FOODS, NUTRIENTS, VITMIN } from '../data.js';
import { flagLabel, foodById } from '../logic.js';
import { Card, Chip, Icon, Input, Muted, Page } from '../ui.jsx';

const Tabs = styled.div`display: flex; gap: 8px; flex-wrap: wrap; margin: 16px 0;`;
const Pill = styled.button`
  min-height: 40px; padding: 0 16px; border-radius: 999px; cursor: pointer; font-weight: 600; border: 1.5px solid ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.line)};
  background: ${({ $on, theme }) => ($on ? theme.c.primary : theme.c.surface)}; color: ${({ $on, theme }) => ($on ? '#fff' : theme.c.ink)};
`;
const SearchWrap = styled.div`position: relative; margin-bottom: 16px; svg { position: absolute; left: 16px; top: 14px; color: ${({ theme }) => theme.c.muted}; }`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;`;
const Item = styled(Card)`padding: 18px; display: grid; gap: 8px; align-content: start; h3 { font-size: 18px; } dl { margin: 0; display: grid; gap: 6px; font-size: 14px; } dt { color: ${({ theme }) => theme.c.muted}; font-size: 12.5px; } dd { margin: 0; }`;

// Vista de consulta de los catálogos (RF1 a RF5). Solo lectura en este prototipo.
const SECTIONS = {
  alimentos: {
    label: 'Alimentos',
    items: () => FOODS.map((x) => ({ key: x.id, title: x.nombre, chips: x.flags.map((f) => <Chip key={f} $t="warn">{flagLabel(f)}</Chip>), rows: [['Definición', x.definicion], ['Origen', x.origen], ['Funcionalidad principal', x.funcion]] })),
  },
  nutrientes: {
    label: 'Nutrientes',
    items: () => NUTRIENTS.map((x) => ({ key: x.id, title: x.nombre, chips: [<Chip key="t" $t="primary">{x.tipo}</Chip>], rows: [['Definición', x.definicion], ['Funcionalidad', x.funcion], ['Subtipo', x.subtipo], ['Enfermedades por déficit', x.deficit.join(', ')], ['Fuentes alimentarias', x.fuentes.join(', ')]] })),
  },
  vitaminas: {
    label: 'Vitaminas y minerales',
    items: () => VITMIN.map((x) => ({ key: x.id, title: x.nombre, chips: [<Chip key="t" $t="primary">{x.tipo}</Chip>], rows: [['Funciones asociadas', x.funciones], ['Ración dietética recomendada', x.racion]] })),
  },
  dietas: {
    label: 'Dietas',
    items: () => DIETS.map((x) => ({ key: x.id, title: x.nombre, chips: [<Chip key="k" $t="primary">{x.kcal} kcal</Chip>], rows: [['Objetivos', x.objetivos], ['Definición técnica', x.definicion], ['Componentes', x.componentes.map((c) => foodById(c.food).nombre).join(', ')], ['Duración', x.duracion], ['Suplementos', x.suplementos]] })),
  },
  enfermedades: {
    label: 'Enfermedades',
    items: () => DISEASES.map((x) => ({ key: x.id, title: x.nombre, chips: [], rows: [['Causas', x.causas], ['Diagnosis', x.diagnosis], ['Diagnósticos diferenciales', x.diferenciales], ['Tratamiento', x.tratamiento], ['Objetivo del tratamiento', x.objetivo]] })),
  },
};

export default function Catalog() {
  const [tab, setTab] = useState('alimentos');
  const [q, setQ] = useState('');
  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    return SECTIONS[tab].items().filter((i) => i.title.toLowerCase().includes(t));
  }, [tab, q]);

  return (
    <Page>
      <h1 style={{ fontSize: 32 }}>Catálogos</h1>
      <Muted>Consulta de alimentos, nutrientes, vitaminas y minerales, dietas y enfermedades.</Muted>
      <Tabs role="tablist">
        {Object.entries(SECTIONS).map(([k, s]) => (
          <Pill key={k} role="tab" $on={tab === k} aria-selected={tab === k} onClick={() => { setTab(k); setQ(''); }}>{s.label}</Pill>
        ))}
      </Tabs>
      <SearchWrap>
        <Icon name="search" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Buscar en ${SECTIONS[tab].label.toLowerCase()}`} aria-label="Buscar en el catálogo" />
      </SearchWrap>
      <Grid>
        {items.map((i) => (
          <Item key={i.key}>
            <h3>{i.title}</h3>
            {i.chips.length > 0 && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{i.chips}</div>}
            <dl>{i.rows.map(([l, v]) => <div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl>
          </Item>
        ))}
      </Grid>
      {!items.length && <Card style={{ padding: 24 }}><Muted>No hay resultados. Prueba con otra palabra.</Muted></Card>}
    </Page>
  );
}
