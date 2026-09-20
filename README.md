# Dietas al Día · Prototipo de alta fidelidad (EPC28)

App web progresiva (React + styled-components, sin backend) que simula el cruce entre la historia clínica del paciente
y el catálogo de dietas para asignar un tratamiento nutricional con seguridad.

## Contenido de la entrega

| Qué | Dónde |
|---|---|
| Prototipo (código) | `src/` |
| Objetivo y requisitos priorizados, dentro de la app | Menú “Objetivo” |
| División de EPC28, trazabilidad, lista IEEE, defectos, prueba con usuarios y conclusión | `docs/Documento_de_validacion.md` |
| Prompt para AI Studio | `docs/PROMPT_AI_STUDIO.md` |

## Ejecutar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
```

## Publicar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En Vercel: Add New → Project → importa el repositorio. Vite se detecta solo (build: `npm run build`, salida: `dist`).

## Cómo ver cada criterio de aceptación

| Criterio | Dónde verlo |
|---|---|
| CA1 | Abre un paciente: las dietas de su enfermedad aparecen de inmediato, con las seguras primero. |
| CA2 | María Fernanda Ospina + Diabetes: “Dieta de control glucémico con lácteos” muestra alerta de alergia. Al asignar, el modal exige marcar la casilla de confirmación. |
| CA3 | “Ver ficha técnica” abre un panel lateral con el paciente y sus alergias siempre visibles. |
| CA4 | Al asignar, la app muestra el tiempo transcurrido desde que abriste al paciente (meta: menos de 90 s). |

## Pacientes de demostración

| Paciente | Caso que ejercita |
|---|---|
| María Fernanda Ospina | Dos enfermedades; dietas seguras, con incompatibilidad y con alergia |
| Juan David Cardona | Alergia al maní; una dieta con alergia |
| Luisa Fernanda Gómez | Ninguna dieta libre de alertas |
| Carlos Andrés Vélez | Todas las dietas seguras |
| Ana Sofía Muñoz | Lácteos y pescado en conflicto; una alternativa vegetal segura |
| Pedro Nel Zapata | Sin enfermedad registrada (estado vacío) |

## Notas

- El acceso con Google está simulado. Solo las cuentas marcadas como registradas en `src/data.js` pueden entrar;
  `laura.paz@gmail.com` sirve para probar el rechazo.
- Los datos viven en `localStorage`. El botón “Restablecer datos de demostración” los reinicia.
- Los catálogos (RF1 a RF5) son de consulta; la edición queda fuera del alcance de este prototipo.
