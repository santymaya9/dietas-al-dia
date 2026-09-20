# Prompt para AI Studio (versión corregida)

## Contexto
Crea una app web progresiva llamada **Dietas al Día**. Es un prototipo de alta fidelidad, visual y funcionalmente muy
cercano al producto final, para validar la historia épica **EPC28: Asignación de tratamiento nutricional**.
Usuarios: médicos del Departamento de Nutrición. Objetivo del sistema: apoyar su decisión clínica.

Historia de usuario: como médico quiero consultar las dietas compatibles con el diagnóstico de un paciente, señalando
explícitamente si alguna contiene alimentos incompatibles con sus alergias, para elegir con seguridad un tratamiento
sin cruzar manualmente la historia clínica con el catálogo de dietas.

## Alcance del prototipo (requisitos derivados de EPC28)
- **RF-A1** Seleccionar un paciente y ver su historia clínica: datos personales, peso, talla, alergias, incompatibilidades,
  antecedentes familiares y enfermedades asociadas.
- **RF-A2 (CA1)** Dado un paciente con una enfermedad registrada, mostrar las dietas asociadas en un único paso.
- **RF-A3 (CA2)** Cruzar los alimentos de cada dieta con las alergias e incompatibilidades del paciente. Si hay conflicto,
  señalarlo de forma inequívoca en la lista y en la confirmación, y exigir un reconocimiento explícito antes de asignar.
- **RF-A4 (CA3)** Abrir la ficha técnica completa de la dieta (objetivos, definición técnica, aporte calórico,
  componentes, ingesta necesaria, vía de administración, duración, dosificación, pauta, suplementos) sin perder el
  contexto del paciente.
- **RF-A5** Confirmar la asignación y registrarla en la historia clínica del paciente.
- **RNF-1 (CA4)** Un usuario nuevo debe poder elegir una dieta segura en menos de 90 segundos sin pasar por alto ninguna
  alerta. Mide y muestra el tiempo transcurrido.
- Catálogos de consulta de alimentos, nutrientes, vitaminas y minerales, dietas y enfermedades (solo lectura).

## Datos
Sin backend. Usa datos ficticios en un archivo local: 25 a 30 alimentos con etiquetas de alérgeno, 8 enfermedades
nutricionales, 15 a 18 dietas compuestas de alimentos y 6 pacientes. Incluye casos límite: dieta segura, dieta con
incompatibilidad, dieta con alergia, paciente sin ninguna dieta segura y paciente sin enfermedad registrada.

## Stack y diseño
- React + styled-components. Responsive. Minimalista y **claro**, con paleta verde de salud, inspirada en la app Longevo.
- Un solo tema (claro). Las alertas usan rojo (alergia) y ámbar (incompatibilidad) con texto e icono, no solo color.

## Comportamiento
- Al cargar: inicio de sesión con Google (simulado). **Solo entran cuentas registradas**; una cuenta no registrada
  ve un mensaje de rechazo claro.
- Flujo: inicio de sesión → lista de pacientes → historia clínica → enfermedad → dietas asociadas → ficha técnica →
  confirmación → asignación registrada.

## Restricciones
- Prototipo rápido, sin backend real ni autenticación real.
- No inventar funciones fuera de EPC28 y de los catálogos de consulta.
- Comentarios breves solo donde la lógica no sea obvia.

## Entregable
Código completo y funcional, listo para ejecutar con `npm install` y `npm run dev`, y desplegable en Vercel.
