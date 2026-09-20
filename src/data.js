// Datos de demostración (no hay backend). Todo es ficticio.
// Cada alimento lleva "flags": las sustancias por las que puede causar alergia o incompatibilidad.

export const FLAG_LABELS = {
  gluten: 'gluten',
  lactosa: 'lactosa',
  mani: 'maní',
  'frutos-secos': 'frutos secos',
  huevo: 'huevo',
  mariscos: 'mariscos',
  pescado: 'pescado',
  soya: 'soya',
};

const f = (id, nombre, definicion, origen, funcion, flags = []) => ({ id, nombre, definicion, origen, funcion, flags });

export const FOODS = [
  f('avena', 'Avena en hojuelas', 'Cereal integral rico en betaglucanos.', 'Vegetal (cereal)', 'Fibra soluble y energía de liberación lenta.', ['gluten']),
  f('leche-desc', 'Leche descremada', 'Leche sin grasa, conserva calcio y proteína.', 'Animal', 'Aporte de calcio y proteína de alto valor biológico.', ['lactosa']),
  f('leche-entera', 'Leche entera', 'Leche con su contenido graso natural.', 'Animal', 'Aporte calórico, calcio y vitamina A.', ['lactosa']),
  f('yogur', 'Yogur natural', 'Leche fermentada sin azúcar añadido.', 'Animal', 'Proteína, calcio y probióticos.', ['lactosa']),
  f('queso-fresco', 'Queso fresco', 'Queso de maduración corta.', 'Animal', 'Proteína y calcio.', ['lactosa']),
  f('huevo', 'Huevo', 'Huevo entero de gallina.', 'Animal', 'Proteína completa, colina y vitamina D.', ['huevo']),
  f('pollo', 'Pechuga de pollo', 'Carne magra de ave.', 'Animal', 'Proteína magra.'),
  f('res', 'Carne magra de res', 'Corte magro de res.', 'Animal', 'Hierro hemo y proteína.'),
  f('salmon', 'Salmón', 'Pescado azul rico en omega-3.', 'Animal (pescado)', 'Grasas insaturadas y vitamina D.', ['pescado']),
  f('camaron', 'Camarón', 'Crustáceo marino.', 'Animal (marisco)', 'Proteína y yodo.', ['mariscos']),
  f('lentejas', 'Lentejas', 'Leguminosa seca.', 'Vegetal (leguminosa)', 'Hierro no hemo, proteína vegetal y fibra.'),
  f('frijoles', 'Frijoles', 'Leguminosa de grano.', 'Vegetal (leguminosa)', 'Proteína vegetal, hierro y fibra.'),
  f('quinua', 'Quinua', 'Pseudocereal andino sin gluten.', 'Vegetal', 'Proteína completa y carbohidrato complejo.'),
  f('arroz-integral', 'Arroz integral', 'Grano entero de arroz.', 'Vegetal (cereal)', 'Carbohidrato complejo y fibra.'),
  f('arepa', 'Arepa de maíz', 'Masa de maíz cocida a la plancha.', 'Vegetal (cereal)', 'Carbohidrato de base y energía.'),
  f('papa', 'Papa', 'Tubérculo cocido.', 'Vegetal (tubérculo)', 'Carbohidrato y potasio.'),
  f('brocoli', 'Brócoli', 'Crucífera de hoja verde.', 'Vegetal', 'Fibra, vitamina C y folatos.'),
  f('espinaca', 'Espinaca', 'Hoja verde oscura.', 'Vegetal', 'Hierro, folatos y calcio.'),
  f('tomate', 'Tomate', 'Fruto rico en licopeno.', 'Vegetal', 'Antioxidantes y vitamina C.'),
  f('aguacate', 'Aguacate', 'Fruto rico en grasa monoinsaturada.', 'Vegetal', 'Grasas saludables y potasio.'),
  f('platano', 'Plátano maduro', 'Fruto de musácea.', 'Vegetal', 'Energía y potasio.'),
  f('manzana', 'Manzana', 'Fruta con piel.', 'Vegetal', 'Fibra (pectina) y antioxidantes.'),
  f('naranja', 'Naranja', 'Cítrico.', 'Vegetal', 'Vitamina C; mejora la absorción de hierro.'),
  f('almendras', 'Almendras', 'Fruto seco.', 'Vegetal', 'Grasas insaturadas, magnesio y vitamina E.', ['frutos-secos']),
  f('mani', 'Maní', 'Leguminosa oleaginosa.', 'Vegetal', 'Proteína y grasas insaturadas.', ['mani']),
  f('tofu', 'Tofu', 'Cuajada de soya.', 'Vegetal (soya)', 'Proteína vegetal y calcio.', ['soya']),
  f('aceite-oliva', 'Aceite de oliva', 'Aceite virgen extra.', 'Vegetal', 'Grasa monoinsaturada.'),
];

export const NUTRIENTS = [
  { id: 'n1', nombre: 'Proteínas', definicion: 'Macronutriente formado por aminoácidos.', funcion: 'Construcción y reparación de tejidos, enzimas y hormonas.', tipo: 'Macronutriente', subtipo: 'Aminoácidos esenciales y no esenciales', deficit: ['Desnutrición proteico-calórica'], fuentes: ['Pechuga de pollo', 'Huevo', 'Lentejas', 'Quinua'] },
  { id: 'n2', nombre: 'Carbohidratos complejos', definicion: 'Polisacáridos de digestión lenta.', funcion: 'Fuente principal de energía.', tipo: 'Macronutriente', subtipo: 'Almidones', deficit: ['Desnutrición proteico-calórica'], fuentes: ['Avena', 'Arroz integral', 'Quinua'] },
  { id: 'n3', nombre: 'Grasas insaturadas', definicion: 'Ácidos grasos mono y poliinsaturados, incluye omega-3.', funcion: 'Función celular, absorción de vitaminas liposolubles.', tipo: 'Macronutriente', subtipo: 'Omega-3 y monoinsaturadas', deficit: ['Dislipidemia'], fuentes: ['Salmón', 'Aguacate', 'Aceite de oliva'] },
  { id: 'n4', nombre: 'Fibra dietaria', definicion: 'Parte vegetal que no se digiere.', funcion: 'Regula el tránsito intestinal y la glucemia.', tipo: 'Macronutriente', subtipo: 'Soluble e insoluble', deficit: ['Diabetes mellitus tipo 2', 'Dislipidemia'], fuentes: ['Avena', 'Lentejas', 'Manzana', 'Brócoli'] },
  { id: 'n5', nombre: 'Agua', definicion: 'Compuesto esencial del medio interno.', funcion: 'Transporte, termorregulación y reacciones metabólicas.', tipo: 'Macronutriente', subtipo: 'No energético', deficit: ['Deshidratación'], fuentes: ['Agua potable', 'Frutas', 'Verduras'] },
];

export const VITMIN = [
  { id: 'v1', nombre: 'Vitamina D', tipo: 'Vitamina liposoluble', funciones: 'Absorción de calcio y salud ósea.', racion: '15 µg/día (adultos)' },
  { id: 'v2', nombre: 'Vitamina B12', tipo: 'Vitamina hidrosoluble', funciones: 'Formación de glóbulos rojos y función neurológica.', racion: '2,4 µg/día (adultos)' },
  { id: 'v3', nombre: 'Vitamina C', tipo: 'Vitamina hidrosoluble', funciones: 'Antioxidante; favorece la absorción de hierro.', racion: '75–90 mg/día (adultos)' },
  { id: 'v4', nombre: 'Hierro', tipo: 'Mineral', funciones: 'Transporte de oxígeno en la hemoglobina.', racion: '8–18 mg/día según sexo y edad' },
  { id: 'v5', nombre: 'Calcio', tipo: 'Mineral', funciones: 'Mineralización ósea y contracción muscular.', racion: '1000–1200 mg/día (adultos)' },
  { id: 'v6', nombre: 'Potasio', tipo: 'Mineral', funciones: 'Equilibrio hídrico y control de la presión arterial.', racion: '2600–3400 mg/día (adultos)' },
];

export const DISEASES = [
  { id: 'dm2', nombre: 'Diabetes mellitus tipo 2', causas: 'Resistencia a la insulina, sobrepeso, sedentarismo, herencia.', diagnosis: 'Glucemia en ayunas, HbA1c, prueba de tolerancia oral a la glucosa.', diferenciales: 'Diabetes tipo 1, LADA, diabetes secundaria.', tratamiento: 'Dietoterapia, actividad física y farmacológico si aplica.', objetivo: 'Mantener HbA1c en rango meta y prevenir complicaciones.' },
  { id: 'obesidad', nombre: 'Obesidad', causas: 'Balance energético positivo, factores genéticos y ambientales.', diagnosis: 'IMC ≥ 30 kg/m², perímetro abdominal.', diferenciales: 'Hipotiroidismo, síndrome de Cushing, edema.', tratamiento: 'Dieta hipocalórica, actividad física y terapia conductual.', objetivo: 'Reducción de peso gradual y sostenida.' },
  { id: 'anemia', nombre: 'Anemia ferropénica', causas: 'Ingesta insuficiente de hierro, pérdidas crónicas, malabsorción.', diagnosis: 'Hemograma, ferritina sérica, saturación de transferrina.', diferenciales: 'Talasemia, anemia de enfermedad crónica.', tratamiento: 'Dieta rica en hierro y suplementación oral.', objetivo: 'Normalizar hemoglobina y reponer reservas de hierro.' },
  { id: 'hta', nombre: 'Hipertensión arterial', causas: 'Exceso de sodio, obesidad, herencia, estrés.', diagnosis: 'Toma de presión arterial en consulta y monitoreo ambulatorio (MAPA).', diferenciales: 'Hipertensión secundaria, hipertensión de bata blanca.', tratamiento: 'Dieta baja en sodio, actividad física y farmacológico.', objetivo: 'Presión arterial < 130/80 mmHg.' },
  { id: 'dislipidemia', nombre: 'Dislipidemia', causas: 'Dieta alta en grasas saturadas, sedentarismo, herencia.', diagnosis: 'Perfil lipídico en ayunas.', diferenciales: 'Hipotiroidismo, síndrome nefrótico.', tratamiento: 'Dieta cardioprotectora y control de peso.', objetivo: 'LDL dentro de la meta según riesgo cardiovascular.' },
  { id: 'desnutricion', nombre: 'Desnutrición proteico-calórica', causas: 'Ingesta insuficiente, malabsorción, enfermedad crónica.', diagnosis: 'Valoración antropométrica, albúmina y prealbúmina.', diferenciales: 'Caquexia, trastornos de la conducta alimentaria.', tratamiento: 'Dieta hipercalórica e hiperproteica.', objetivo: 'Recuperar peso y masa magra.' },
  { id: 'celiaca', nombre: 'Enfermedad celíaca', causas: 'Respuesta autoinmune al gluten en personas predispuestas.', diagnosis: 'Anticuerpos anti-transglutaminasa y biopsia duodenal.', diferenciales: 'Sensibilidad al gluten no celíaca, alergia al trigo.', tratamiento: 'Dieta estricta sin gluten de por vida.', objetivo: 'Remisión de síntomas y curación de la mucosa intestinal.' },
  { id: 'osteoporosis', nombre: 'Osteoporosis', causas: 'Déficit de calcio y vitamina D, menopausia, edad.', diagnosis: 'Densitometría ósea (DXA).', diferenciales: 'Osteomalacia, mieloma múltiple.', tratamiento: 'Dieta rica en calcio y vitamina D, suplementos, actividad física.', objetivo: 'Preservar densidad ósea y prevenir fracturas.' },
];

const c = (food, g) => ({ food, g });

export const DIETS = [
  { id: 'd-ig-bajo', nombre: 'Dieta de bajo índice glucémico', diseases: ['dm2'], kcal: 1700, objetivos: 'Control de la glucemia posprandial.', definicion: 'Plan basado en alimentos de absorción lenta, con distribución de carbohidratos en 5 tiempos.', componentes: [c('lentejas', 80), c('quinua', 70), c('pollo', 120), c('brocoli', 100), c('aguacate', 50), c('tomate', 100), c('manzana', 120)], ingesta: '5 comidas al día, sin ayunos prolongados.', via: 'Oral', duracion: '12 semanas, con control de HbA1c.', dosificacion: 'Porciones según la lista de intercambios.', pauta: 'Desayuno, media mañana, almuerzo, merienda y cena.', suplementos: 'Ninguno de rutina.' },
  { id: 'd-glucemico', nombre: 'Dieta de control glucémico con lácteos', diseases: ['dm2'], kcal: 1800, objetivos: 'Control glucémico con aporte de calcio.', definicion: 'Plan con avena, legumbres y lácteos bajos en grasa.', componentes: [c('avena', 40), c('lentejas', 80), c('pollo', 120), c('brocoli', 100), c('aguacate', 50), c('yogur', 125), c('almendras', 20)], ingesta: '5 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: 'Porciones según la lista de intercambios.', pauta: 'Yogur con avena en el desayuno, almendras a media mañana.', suplementos: 'Vitamina D si hay déficit.' },
  { id: 'd-mediterranea', nombre: 'Dieta mediterránea', diseases: ['dm2', 'dislipidemia'], kcal: 1900, objetivos: 'Mejorar el perfil glucémico y lipídico.', definicion: 'Patrón con grasas monoinsaturadas, pescado azul y vegetales.', componentes: [c('salmon', 120), c('aceite-oliva', 20), c('quinua', 70), c('espinaca', 80), c('tomate', 100), c('almendras', 20)], ingesta: '4–5 comidas al día.', via: 'Oral', duracion: '16 semanas.', dosificacion: 'Pescado azul 3 veces por semana.', pauta: 'Cena ligera y frutos secos como colación.', suplementos: 'Omega-3 si no llega a la ingesta objetivo.' },
  { id: 'd-hipo-balanceada', nombre: 'Dieta hipocalórica balanceada', diseases: ['obesidad'], kcal: 1500, objetivos: 'Pérdida de peso gradual, 0,5 kg por semana.', definicion: 'Déficit calórico moderado con distribución equilibrada de macronutrientes.', componentes: [c('pollo', 120), c('brocoli', 120), c('arroz-integral', 80), c('manzana', 120), c('yogur', 125), c('huevo', 50)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: 'Porciones medidas en gramos.', pauta: 'Mayor aporte energético en el almuerzo.', suplementos: 'Multivitamínico si la ingesta lo requiere.' },
  { id: 'd-hipo-vegetal', nombre: 'Dieta hipocalórica de base vegetal', diseases: ['obesidad'], kcal: 1450, objetivos: 'Pérdida de peso con alta saciedad.', definicion: 'Plan rico en fibra con proteína de origen vegetal.', componentes: [c('lentejas', 90), c('frijoles', 80), c('brocoli', 120), c('tomate', 100), c('aguacate', 40), c('manzana', 120), c('arroz-integral', 70)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: 'Legumbres en 2 comidas diarias.', pauta: 'Verduras crudas antes del plato principal.', suplementos: 'Vitamina B12 recomendada.' },
  { id: 'd-hipo-proteica', nombre: 'Dieta hipocalórica alta en proteína', diseases: ['obesidad'], kcal: 1600, objetivos: 'Pérdida de peso preservando masa magra.', definicion: 'Déficit calórico con 1,6 g/kg de proteína.', componentes: [c('pollo', 150), c('huevo', 100), c('quinua', 70), c('espinaca', 80), c('queso-fresco', 40), c('mani', 20)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '8 semanas.', dosificacion: 'Proteína en cada comida.', pauta: 'Colación proteica después del ejercicio.', suplementos: 'Ninguno de rutina.' },
  { id: 'd-hierro', nombre: 'Dieta rica en hierro hemo', diseases: ['anemia'], kcal: 2000, objetivos: 'Reponer las reservas de hierro.', definicion: 'Plan con carnes magras y vitamina C para mejorar la absorción.', componentes: [c('res', 100), c('lentejas', 80), c('espinaca', 80), c('huevo', 50), c('naranja', 150)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: 'Carne roja magra 3 veces por semana.', pauta: 'Fruta cítrica junto al plato principal; evitar té o café en comidas.', suplementos: 'Sulfato ferroso según ferritina.' },
  { id: 'd-hierro-vegetal', nombre: 'Dieta rica en hierro de origen vegetal', diseases: ['anemia'], kcal: 1900, objetivos: 'Reponer hierro sin carnes rojas.', definicion: 'Legumbres y verdes con fuente de vitamina C.', componentes: [c('lentejas', 90), c('frijoles', 80), c('espinaca', 80), c('quinua', 70), c('naranja', 150), c('tofu', 100)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: 'Legumbres a diario.', pauta: 'Combinar siempre con vitamina C.', suplementos: 'Hierro y vitamina B12.' },
  { id: 'd-dash', nombre: 'Dieta DASH', diseases: ['hta'], kcal: 2000, objetivos: 'Reducir la presión arterial.', definicion: 'Patrón rico en frutas, verduras y lácteos bajos en grasa, bajo en sodio.', componentes: [c('avena', 40), c('leche-desc', 250), c('salmon', 100), c('frijoles', 80), c('manzana', 120), c('espinaca', 80)], ingesta: '4 comidas al día.', via: 'Oral', duracion: 'Indefinida, con control cada 3 meses.', dosificacion: 'Sodio menor a 2300 mg/día.', pauta: 'Sin sal de mesa.', suplementos: 'Ninguno de rutina.' },
  { id: 'd-bajo-sodio', nombre: 'Dieta baja en sodio con frutas y verduras', diseases: ['hta'], kcal: 1900, objetivos: 'Reducir sodio y aumentar potasio.', definicion: 'Plan con alimentos frescos y sin procesar.', componentes: [c('brocoli', 100), c('tomate', 100), c('platano', 100), c('papa', 150), c('pollo', 120), c('arroz-integral', 80)], ingesta: '4 comidas al día.', via: 'Oral', duracion: 'Indefinida.', dosificacion: 'Sodio menor a 1500 mg/día.', pauta: 'Condimentar con hierbas y limón.', suplementos: 'Ninguno.' },
  { id: 'd-cardio', nombre: 'Dieta cardioprotectora', diseases: ['dislipidemia'], kcal: 1800, objetivos: 'Reducir LDL y triglicéridos.', definicion: 'Baja en grasas saturadas, alta en fibra soluble.', componentes: [c('avena', 50), c('salmon', 120), c('aceite-oliva', 20), c('frijoles', 80), c('manzana', 120), c('almendras', 20)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '12 semanas, con perfil lipídico de control.', dosificacion: 'Grasas saturadas menores al 7 % de la energía.', pauta: 'Pescado azul 2 veces por semana.', suplementos: 'Omega-3 si triglicéridos elevados.' },
  { id: 'd-hiper', nombre: 'Dieta hipercalórica e hiperproteica', diseases: ['desnutricion'], kcal: 2600, objetivos: 'Recuperar peso y masa magra.', definicion: 'Plan de alta densidad energética y proteica.', componentes: [c('leche-entera', 250), c('huevo', 100), c('pollo', 150), c('arroz-integral', 100), c('aguacate', 60), c('mani', 30), c('platano', 100)], ingesta: '5–6 comidas al día.', via: 'Oral', duracion: '8 semanas, con control de peso semanal.', dosificacion: '35 kcal/kg y 1,5 g/kg de proteína.', pauta: 'Colaciones calóricas entre comidas.', suplementos: 'Suplemento oral nutricional según valoración.' },
  { id: 'd-hiper-marina', nombre: 'Dieta hipercalórica con pescado y mariscos', diseases: ['desnutricion'], kcal: 2500, objetivos: 'Recuperar peso con proteína de alto valor biológico.', definicion: 'Plan hipercalórico con proteína marina.', componentes: [c('salmon', 120), c('camaron', 100), c('papa', 150), c('arepa', 100), c('queso-fresco', 50), c('aguacate', 60)], ingesta: '5 comidas al día.', via: 'Oral', duracion: '8 semanas.', dosificacion: 'Proteína marina 4 veces por semana.', pauta: 'Cenas completas.', suplementos: 'Vitamina D.' },
  { id: 'd-singluten', nombre: 'Dieta estricta sin gluten', diseases: ['celiaca'], kcal: 2000, objetivos: 'Eliminar totalmente el gluten.', definicion: 'Solo alimentos naturalmente libres de gluten.', componentes: [c('arroz-integral', 80), c('quinua', 70), c('pollo', 120), c('huevo', 50), c('papa', 150), c('arepa', 100), c('manzana', 120), c('tomate', 100)], ingesta: '4 comidas al día.', via: 'Oral', duracion: 'De por vida.', dosificacion: 'Lectura de etiquetas obligatoria.', pauta: 'Evitar contaminación cruzada en la cocina.', suplementos: 'Hierro y ácido fólico según hemograma.' },
  { id: 'd-sg-proteica', nombre: 'Dieta sin gluten alta en proteína', diseases: ['celiaca'], kcal: 2200, objetivos: 'Recuperar peso y mucosa intestinal.', definicion: 'Sin gluten con refuerzo proteico.', componentes: [c('res', 100), c('lentejas', 80), c('papa', 150), c('platano', 100), c('aguacate', 50), c('brocoli', 100), c('yogur', 125)], ingesta: '5 comidas al día.', via: 'Oral', duracion: '12 semanas.', dosificacion: '1,2 g/kg de proteína.', pauta: 'Yogur natural como colación.', suplementos: 'Calcio y vitamina D.' },
  { id: 'd-calcio', nombre: 'Dieta rica en calcio y vitamina D', diseases: ['osteoporosis'], kcal: 2000, objetivos: 'Aumentar la ingesta de calcio a 1200 mg/día.', definicion: 'Plan con lácteos, pescado azul y verdes.', componentes: [c('leche-desc', 250), c('yogur', 125), c('queso-fresco', 40), c('salmon', 100), c('espinaca', 80), c('huevo', 50)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '24 semanas.', dosificacion: '3 porciones de lácteos al día.', pauta: 'Exposición solar breve diaria.', suplementos: 'Calcio y vitamina D según laboratorio.' },
  { id: 'd-calcio-vegetal', nombre: 'Dieta rica en calcio de origen vegetal', diseases: ['osteoporosis'], kcal: 1900, objetivos: 'Aumentar el calcio sin lácteos.', definicion: 'Fuentes vegetales de calcio y vitamina C.', componentes: [c('tofu', 120), c('espinaca', 100), c('brocoli', 100), c('almendras', 30), c('naranja', 150), c('frijoles', 80)], ingesta: '4 comidas al día.', via: 'Oral', duracion: '24 semanas.', dosificacion: 'Tofu o legumbres en 2 comidas diarias.', pauta: 'Combinar con vitamina C.', suplementos: 'Vitamina D.' },
];

// Cuentas de Google simuladas. Solo las "registradas" pueden ingresar.
export const ACCOUNTS = [
  { email: 'natalia.restrepo@clinicanutri.co', nombre: 'Dra. Natalia Restrepo', registrada: true },
  { email: 'sebastian.mejia@clinicanutri.co', nombre: 'Dr. Sebastián Mejía', registrada: true },
  { email: 'laura.paz@gmail.com', nombre: 'Laura Paz', registrada: false },
];

export const PATIENTS_SEED = [
  { id: 'p1', nombre: 'María Fernanda', apellidos: 'Ospina Restrepo', domicilio: 'Cra 43A #12-30, Medellín', telefono: '300 555 0142', ss: '1020-3344-01', nacimiento: '1972-03-14', peso: 78, talla: 162, alergias: ['frutos-secos'], incompatibilidades: ['lactosa'], antecedentes: 'Madre con diabetes tipo 2. Padre con hipertensión.', enfermedades: ['dm2', 'hta'], asignaciones: [] },
  { id: 'p2', nombre: 'Juan David', apellidos: 'Cardona Álvarez', domicilio: 'Cll 10 #35-18, Envigado', telefono: '311 555 0178', ss: '1020-5521-07', nacimiento: '1990-09-02', peso: 102, talla: 176, alergias: ['mani'], incompatibilidades: [], antecedentes: 'Padre con obesidad y dislipidemia.', enfermedades: ['obesidad'], asignaciones: [] },
  { id: 'p3', nombre: 'Luisa Fernanda', apellidos: 'Gómez Mesa', domicilio: 'Cra 70 #44-21, Medellín', telefono: '315 555 0119', ss: '1020-7788-03', nacimiento: '1996-06-21', peso: 56, talla: 165, alergias: ['huevo', 'mariscos'], incompatibilidades: ['soya'], antecedentes: 'Madre con anemia crónica.', enfermedades: ['anemia'], asignaciones: [] },
  { id: 'p4', nombre: 'Carlos Andrés', apellidos: 'Vélez Ruiz', domicilio: 'Cll 50 #80-12, Medellín', telefono: '320 555 0166', ss: '1020-9012-05', nacimiento: '1985-11-30', peso: 61, talla: 174, alergias: ['pescado'], incompatibilidades: ['gluten'], antecedentes: 'Hermana con enfermedad celíaca.', enfermedades: ['celiaca'], asignaciones: [] },
  { id: 'p5', nombre: 'Ana Sofía', apellidos: 'Muñoz Pineda', domicilio: 'Cra 65 #32-70, Medellín', telefono: '301 555 0133', ss: '1020-2266-09', nacimiento: '1958-01-08', peso: 58, talla: 158, alergias: ['pescado'], incompatibilidades: ['lactosa'], antecedentes: 'Madre con fractura de cadera a los 70 años.', enfermedades: ['osteoporosis'], asignaciones: [] },
  { id: 'p6', nombre: 'Pedro Nel', apellidos: 'Zapata Henao', domicilio: 'Cll 30 #55-04, Bello', telefono: '318 555 0190', ss: '1020-4433-02', nacimiento: '1979-05-17', peso: 84, talla: 172, alergias: [], incompatibilidades: [], antecedentes: 'Sin antecedentes relevantes.', enfermedades: [], asignaciones: [] },
];
