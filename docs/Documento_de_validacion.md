# Documento de validación: EPC28, Asignación de tratamiento nutricional

**Universidad Pontificia Bolivariana · Ingeniería de Software**
**Curso:** Ingeniería de Requisitos · **Profesor:** Oscar Eduardo Sánchez García
**Actividad:** U3A2 Prototipado (Misión 7) · **Estudiante:** Santiago Maya Horta · **Fecha:** 20 de septiembre de 2026
**Prototipo:** [enlace de Vercel] · **Repositorio:** [enlace de GitHub]

---

## 1. Objetivo del prototipo

Validar que el médico del Departamento de Nutrición puede consultar las dietas asociadas al diagnóstico de un paciente, ver de forma inequívoca cuáles contienen alimentos que sus alergias o incompatibilidades desaconsejan, y asignar una dieta con seguridad sin cruzar manualmente la historia clínica con el catálogo de dietas.

**Historia épica EPC28.** Como médico del Departamento de Nutrición quiero consultar las dietas compatibles con el diagnóstico de un paciente, señalando explícitamente si alguna dieta contiene alimentos incompatibles con sus alergias registradas, para elegir con seguridad un tratamiento sin cruzar manualmente la historia clínica con el catálogo de dietas.

**Incluye:** cruce de datos clínicos con el catálogo de dietas, alertas, ficha técnica, asignación y registro en la historia clínica.
**No incluye:** edición de catálogos e historia clínica (RF1 a RF6 se consultan, no se gestionan), autenticación real con Google, persistencia en servidor.

---

## 2. División de la épica y priorización

| ID | Requisito | Criterio de aceptación | Prioridad | Justificación |
|---|---|---|---|---|
| RF-A3 | Cruzar los alimentos de cada dieta con las alergias e incompatibilidades del paciente, señalar el conflicto y exigir reconocimiento explícito antes de asignar | CA2 | Alta | Es el riesgo clínico de la épica: una alergia no detectada puede dañar al paciente |
| RF-A2 | Mostrar en un único paso las dietas asociadas a la enfermedad registrada del paciente | CA1 | Alta | Sin ella no hay nada que cruzar ni elegir |
| RF-A4 | Abrir la ficha técnica completa de la dieta sin perder el contexto del paciente | CA3 | Alta | El médico decide con la ficha; perder el contexto del paciente reintroduce el cruce manual |
| RF-A5 | Confirmar la asignación y registrarla en la historia clínica | CA4 | Alta | Cierra el flujo de la épica: “elegir con seguridad un tratamiento” |
| RF-A1 | Consultar la historia clínica del paciente (alergias, incompatibilidades, enfermedades y demás datos) | CA1 | Media | Habilitador. La gestión completa de la historia clínica es RF6 y aquí solo se consulta |
| RNF-1 | Un usuario nuevo elige una dieta segura en menos de 90 s sin pasar por alto ninguna alerta | CA4 | Alta | Requisito de usabilidad; se mide con la prueba de la sección 5 |

### Trazabilidad

| Criterio | Requisito | Dónde está en el prototipo | Cómo se verifica |
|---|---|---|---|
| CA1 | RF-A1, RF-A2 | `PatientView.jsx` (lista de dietas por enfermedad) | Abrir a María Fernanda Ospina y ver las dietas de diabetes |
| CA2 | RF-A3 | `logic.js` (`analyzeDiet`), `AssignModal.jsx` | Intentar asignar “Dieta de control glucémico con lácteos”: aparece la alerta y la confirmación queda bloqueada hasta marcar la casilla |
| CA3 | RF-A4 | `DietDrawer.jsx`, `PatientContext.jsx` | Abrir “Ver ficha técnica” y comprobar que el paciente y sus alergias siguen visibles |
| CA4 | RF-A5, RNF-1 | `PatientView.jsx` (temporizador y registro) | Prueba con usuarios (sección 5) |

---

## 3. Lista de verificación IEEE

Base: características de una buena especificación de requisitos de IEEE 830-1998 (sección 4.3), más “factible” de ISO/IEC/IEEE 29148. Se aplica a la historia y a cada criterio de aceptación.

Leyenda: **C** cumple · **P** cumple parcialmente · **N** no cumple

| Característica | Historia | CA1 | CA2 | CA3 | CA4 |
|---|---|---|---|---|---|
| Correcto | P (O1) | C | C | C | C |
| No ambiguo | P (O2) | P (O3) | P (O4) | P (O5) | P (O6) |
| Completo | N (O7) | P (O8) | P (O9) | P (O5) | P (O6) |
| Consistente | P (O2) | C | P (O2) | C | C |
| Clasificado por importancia | P (O10) | N (O10) | N (O10) | N (O10) | N (O10) |
| Verificable | P | P (O3) | P (O4) | P (O5) | C |
| Modificable | C | C | C | C | C |
| Trazable | C | C | C | C | C |
| Factible | C | C | C | C | C |

### Observaciones

- **O1.** La historia refleja la necesidad descrita en el caso, pero no se ha confirmado con un médico real; solo con el enunciado del curso.
- **O2. Terminología inconsistente.** La historia habla de “alergias”; CA2 habla de “alérgeno/incompatible”; CA1 usa “enfermedad registrada” y la historia “diagnóstico”. Hay que unificar y decidir si alergia e incompatibilidad tienen el mismo tratamiento.
- **O3. CA1.** “En un único paso” no dice si es un clic, una pantalla o una consulta. Con dos enfermedades registradas, el prototipo muestra las dietas de la primera y una segunda enfermedad queda a un clic.
- **O4. CA2.** “De forma inequívoca” no se puede medir. Tampoco distingue la gravedad de una alergia frente a una incompatibilidad.
- **O5. CA3.** “Ficha técnica completa” no lista los campos, y “contexto del paciente” no dice qué datos deben seguir visibles.
- **O6. CA4.** “Usuario nuevo” y “dieta segura” no están definidos. Faltan el número de participantes, la tarea exacta y desde qué instante se cuenta el tiempo.
- **O7. Historia incompleta.** No define (a) qué ocurre si ninguna dieta es segura, (b) qué ocurre con pacientes con varias enfermedades, (c) de dónde sale la información de alérgenos de cada alimento.
- **O8.** CA1 no cubre al paciente con varias enfermedades ni al que no tiene ninguna.
- **O9.** CA2 no cubre cantidades, contaminación cruzada ni nutrientes, solo la presencia de alimentos.
- **O10.** Ningún criterio trae prioridad. La priorización de la sección 2 la asigna este documento.

---

## 4. Registro de defectos

Severidad: **Crítico** (pone en riesgo al paciente o impide validar), **Mayor** (el requisito es incompleto o inconsistente y bloquea decisiones), **Menor** (mejora o limitación aceptable en un prototipo).

| ID | Sobre | Descripción | Severidad | Responsable de corregir | Estado |
|---|---|---|---|---|---|
| D-01 | Requisito | El catálogo de alimentos (RF1) no tiene un atributo de alérgenos, y la historia clínica describe alergias e incompatibilidades sin vocabulario definido. Sin un dato común es imposible detectar conflictos | Crítico | Analista de requisitos, con el nutricionista dueño del catálogo | Mitigado en el prototipo con etiquetas de alérgeno; falta ajustar RF1 y RF6 |
| D-02 | Requisito | Alergia, alérgeno e incompatibilidad se usan de forma inconsistente entre la historia y CA2 | Mayor | Analista de requisitos | Abierto |
| D-03 | Requisito | No se define el comportamiento cuando ninguna dieta de la enfermedad es segura | Mayor | Analista de requisitos, con el médico como cliente | Abierto; el prototipo avisa y permite asignar con reconocimiento explícito |
| D-04 | Requisito | CA1 (“único paso”) es ambiguo y no cubre varias enfermedades | Menor | Analista de requisitos | Abierto |
| D-05 | Requisito | CA2 (“inequívoca”) y CA3 (“completa”, “contexto”) no son medibles | Menor | Analista de requisitos | Abierto |
| D-06 | Requisito | CA4 no define muestra, tarea ni punto de inicio del tiempo | Menor | Analista de requisitos | Abierto; ver sección 5 |
| D-07 | Prototipo | El cruce evalúa solo alimentos, no cantidades ni contaminación cruzada | Menor | Desarrollador | Abierto |
| D-08 | Prototipo | Inicio de sesión con Google simulado y datos en `localStorage` del navegador | Menor | Desarrollador | Aceptado para el prototipo |
| D-09 | Prototipo | Catálogos e historia clínica son de solo consulta | Menor | Desarrollador | Aceptado; fuera del alcance de EPC28 |

---

## 5. Prueba con usuarios (CA4 y criterio de Aceptación)

**Participantes:** 3 a 5 personas que no hayan visto la app.
**Tarea:** “Ingresa con la cuenta de la Dra. Natalia Restrepo. La paciente es María Fernanda Ospina y tiene diabetes. Elige una dieta segura para ella y confírmala.” No se da ayuda.
**Tiempo:** la app lo muestra al asignar y lo cuenta desde que se abre al paciente. Si quieres medir todo el flujo, cronometra desde la pantalla de inicio de sesión y anótalo aparte.
**CA4 se cumple** si el participante confirma una dieta sin alertas, sin ayuda y en menos de 90 s.

| Participante | ¿Había visto la app? | Tiempo (s) | ¿Pidió ayuda? | ¿Eligió una dieta sin alertas? | ¿Cumple CA4? | Observaciones |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

**Resultado:** [cuántos cumplen y qué dificultades aparecieron, tras hacer la prueba].

---

## 6. Conclusión

**Decisión: el requisito debe reformularse.** Esta decisión es preliminar y se confirma con los resultados de la sección 5.

El prototipo demuestra que EPC28 es factible y comprensible: el cruce entre la historia clínica y el catálogo funciona y el flujo de asignación es corto. Sin embargo, la lista de verificación muestra que la historia es incompleta (D-01, D-03) y que tres de sus cuatro criterios de aceptación no se pueden medir tal como están escritos (D-04, D-05, D-06).

### Criterios de aceptación reformulados (propuesta)

- **CA1.** Dado un paciente con al menos una enfermedad registrada, al abrir su ficha el sistema muestra las dietas asociadas a esa enfermedad sin acciones adicionales. Si tiene varias enfermedades, muestra las de la primera y permite cambiar de enfermedad con un clic.
- **CA2.** Si una dieta incluye un alimento cuyo alérgeno figura entre las alergias del paciente, o cuya sustancia figura entre sus incompatibilidades, la lista muestra, sin interacción adicional, el alimento y el motivo (alergia o incompatibilidad) con texto, icono y color. El sistema impide confirmar la asignación hasta que el médico reconozca la alerta de forma explícita.
- **CA3.** Desde la lista, el médico abre en un clic una ficha con los diez campos de la dieta (objetivos, definición técnica, aporte calórico, componentes, ingesta necesaria, vía de administración, duración, dosificación, pauta y suplementos). Mientras está abierta se siguen viendo el nombre del paciente, sus alergias y sus incompatibilidades.
- **CA4.** Al menos 4 de 5 usuarios nuevos, sin ayuda, eligen y confirman una dieta sin alertas en menos de 90 segundos, contados desde que abren la ficha del paciente.
- **CA5 (nuevo).** Si ninguna dieta de la enfermedad está libre de alertas, el sistema lo indica y solo permite asignar con reconocimiento explícito de cada alerta.

### Decisiones pendientes

1. Añadir el atributo de alérgenos al catálogo de alimentos (RF1) y un vocabulario común de alergias e incompatibilidades a la historia clínica (RF6).
2. Confirmar con el profesor o el cliente si alergia e incompatibilidad deben bloquear con la misma severidad.
3. Confirmar el comportamiento cuando no hay dieta segura (CA5).
