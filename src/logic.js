import { FOODS, FLAG_LABELS } from './data.js';

export const foodById = (id) => FOODS.find((x) => x.id === id);
export const flagLabel = (flag) => FLAG_LABELS[flag] || flag;

export const ageOf = (iso) => {
  const b = new Date(iso);
  const n = new Date();
  let a = n.getFullYear() - b.getFullYear();
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a -= 1;
  return a;
};

export const bmiOf = (kg, cm) => +(kg / Math.pow(cm / 100, 2)).toFixed(1);

export const initials = (p) => `${p.nombre[0]}${p.apellidos[0]}`;

/**
 * Cruza los alimentos de una dieta con las alergias e incompatibilidades del paciente (CA2).
 * Devuelve la lista de conflictos y un nivel:
 *  - 'critical': hay al menos una alergia
 *  - 'warning': solo incompatibilidades
 *  - 'safe': sin conflictos
 */
export function analyzeDiet(diet, patient) {
  const conflicts = [];
  diet.componentes.forEach(({ food }) => {
    const item = foodById(food);
    (item?.flags || []).forEach((flag) => {
      if (patient.alergias.includes(flag)) conflicts.push({ food: item, flag, kind: 'alergia' });
      else if (patient.incompatibilidades.includes(flag)) conflicts.push({ food: item, flag, kind: 'incompatibilidad' });
    });
  });
  const level = conflicts.some((c) => c.kind === 'alergia') ? 'critical' : conflicts.length ? 'warning' : 'safe';
  return { conflicts, level };
}

export const LEVEL_ORDER = { safe: 0, warning: 1, critical: 2 };
