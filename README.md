# Rubik Sota Director de Orquesta

Rubik Sota Director de Orquesta es una plataforma experimental para crear experiencias visuales, inmersivas e interactivas aplicadas a comunicación, venta, formación, demostración de producto y experiencias sectoriales.

---

## Gesture Lab

Gesture Lab es el laboratorio modular de experiencias visuales controladas por gestos dentro de Rubik Sota.

Su objetivo es convertir imágenes, productos, espacios, procesos y contenidos sectoriales en experiencias interactivas reutilizables.

No es una demo aislada. Es una arquitectura modular donde cada experiencia comparte una base común:

- imagen;
- gesto;
- transformación visual;
- vista completa;
- grabación cuando el navegador lo permite;
- aplicación sectorial concreta.

---

## Estado actual

**Módulo activo:**

- 01 — Bola de Imagen

**Versión estable actual:**

- v1.3

**Archivo:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`

**Funciones actuales:**

- subir imagen;
- transformar imagen plana en bola 3D;
- control por mano abierta / puño;
- rotación por palma;
- swipe / lanzamiento;
- vista completa móvil;
- botón Home;
- grabación de clip cuando el navegador lo permite;
- descarga de clip cuando el navegador lo permite.

**Nota técnica:**
La grabación WebM puede no funcionar en algunos navegadores móviles, especialmente iOS/Safari, por limitaciones de `MediaRecorder` / `captureStream`.

---

## Hub v2.0

El Hub v2.0 organiza Gesture Lab como plataforma multisectorial.

**Archivo:**

- `gesture-lab/index.html`

**Demo activa:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`

---

## Mapa de módulos multisectoriales

| Nº | Módulo | Estado |
|----|--------|--------|
| 01 | Bola de Imagen | Disponible · v1.3 |
| 02 | Before / After Reforma | Próximamente · v2.1 |
| 03 | Community Improvement / Vecinia | Próximamente · v2.2 |
| 04 | Golf Experience | Próximamente · v2.3 |
| 05 | Pádel Tactical Lab | Próximamente · v2.4 |
| 06 | Tennis Gesture Court | Próximamente · v2.5 |
| 07 | Nautical Visualizer | Próximamente · v2.6 |
| 08 | Tourism / Resort Tour | Próximamente · v2.7 |
| 09 | Product 360 | Próximamente · v2.8 |
| 10 | Lookbook Gestual | Próximamente · v2.9 |
| 11 | Food / Packaging | Próximamente · v2.10 |
| 12 | Museo / Patrimonio | Próximamente · v2.11 |
| 13 | Educación Visual | Próximamente · v2.12 |
| 14 | Dental Kids / Cepillado Interactivo | Próximamente · v2.13 |
| 15 | Higiene de Manos | Próximamente · v2.14 |
| 16 | Fisioterapia Guiada | Próximamente · v2.15 |
| 17 | Salud / Clínicas | Próximamente · v2.16 |
| 18 | Automoción | Próximamente · v2.17 |
| 19 | Industria / Cocinas / B2B | Próximamente · v2.18 |
| 20 | Instituciones / Urbanismo | Próximamente · v2.19 |
| 21 | Eventos / Activaciones | Próximamente · v2.20 |
| 22 | Nutrición Infantil | Próximamente · v2.21 |
| 23 | Seguridad Laboral | Próximamente · v2.22 |
| 24 | Educación Ambiental | Próximamente · v2.23 |

---

## Prioridad estratégica

El siguiente módulo recomendado es:

**v2.1 — Before / After Reforma**

**Motivo:**

Conecta directamente con inmobiliaria, reformas, interiorismo, arquitectura, administradores de fincas, Vecinia, Immersphere y Rubik Sota.

**Flujo previsto:**

1. Subir imagen del estado actual.
2. Subir imagen del estado futuro.
3. Revelar antes/después con gesto o swipe.
4. Grabar clip.
5. Usarlo como demo comercial.

**Frase clave:**

> El cliente no solo lee una propuesta: ve el cambio.

---

## Reglas de desarrollo

- No modificar versiones anteriores ya publicadas salvo corrección explícita.
- Cada nueva versión debe crearse como archivo nuevo.
- Cada módulo debe tener su propia carpeta o archivo claramente versionado.
- No tocar `index.html` raíz salvo instrucción explícita.
- No añadir librerías externas sin justificación.
- No romper Bola de Imagen al crear nuevos módulos.
- Trabajar siempre por ramas `feature`.
- Validar IDs duplicados.
- Validar `getElementById`.
- Validar enlaces relativos.
- Probar en móvil antes de marcar una versión como estable.
- Documentar riesgos reales: iOS Safari, MediaRecorder, Fullscreen API, rendimiento móvil.

---

## Convención de versiones

- `v1.x` corresponde a Bola de Imagen.
- `v2.0` corresponde al Hub multisectorial.
- `v2.1` en adelante corresponde a módulos sectoriales.
- Cada fase debe implementarse paso a paso.
- No construir todos los módulos a la vez.

---

## Roadmap resumido

- v2.0 — Hub multisectorial completo
- v2.1 — Before / After Reforma
- v2.2 — Community Improvement / Vecinia
- v2.3 — Golf Experience
- v2.4 — Pádel Tactical Lab
- v2.5 — Tennis Gesture Court
- v2.6 — Nautical Visualizer
- v2.7 — Tourism / Resort Tour
- v2.8 — Product 360
- v2.9 — Lookbook Gestual
- v2.10 — Food / Packaging
- v2.11 — Museo / Patrimonio
- v2.12 — Educación Visual
- v2.13 — Dental Kids / Cepillado Interactivo
- v2.14 — Higiene de Manos
- v2.15 — Fisioterapia Guiada
- v2.16 — Salud / Clínicas
- v2.17 — Automoción
- v2.18 — Industria / Cocinas / B2B
- v2.19 — Instituciones / Urbanismo
- v2.20 — Eventos / Activaciones
- v2.21 — Nutrición Infantil
- v2.22 — Seguridad Laboral
- v2.23 — Educación Ambiental

---

## Riesgos técnicos conocidos

- iOS/Safari puede limitar `MediaRecorder` y WebM.
- Fullscreen API en móvil puede comportarse de forma irregular.
- Los módulos con cámara deben probarse en dispositivo real.
- Los módulos de salud deben evitar claims clínicos no validados.
- Los módulos educativos o infantiles deben plantearse como experiencias de aprendizaje, no diagnóstico.

---

## Estado de implementación

**Actual:**

- Hub v2.0 en desarrollo.
- Bola de Imagen v1.3 publicada y funcional.
- Siguiente fase: v2.1 — Before / After Reforma.
