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

**Módulos activos:**

- 01 - Bola de Imagen - Disponible - v1.3
- 02 - Before / After Reforma - Disponible - v2.1.2
- 03 - Community Improvement / Vecinia - Disponible - v2.2.1

**Versiones estables actuales:**

- Bola de Imagen v1.3
- Before / After Reforma v2.1.2
- Community Improvement / Vecinia v2.2.1

**Archivos:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`
- `gesture-lab/before-after-reforma/rubik-sota-before-after-reforma-v2-1-2.html`
- `gesture-lab/community-improvement-vecinia/rubik-sota-community-improvement-vecinia-v2-2-1.html`

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

## Hub v2.0.1

El Hub v2.0.1 organiza Gesture Lab como plataforma multisectorial con 33 aplicaciones/módulos.

**Archivo:**

- `gesture-lab/index.html`

**Demos activas:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`
- `gesture-lab/before-after-reforma/rubik-sota-before-after-reforma-v2-1-2.html`
- `gesture-lab/community-improvement-vecinia/rubik-sota-community-improvement-vecinia-v2-2-1.html`

**Meta:**

- `v2.0.1 · 3 m-dulos activos · 30 en planificacion`

### Nota Before / After Reforma v2.1.2

Before / After Reforma v2.1.2 incorpora Capture Input System con captura in-app:

- hacer foto actual;
- hacer foto futura;
- galería;
- optimización de imagen a 1920 px;
- comparación cortina/fundido;
- vista completa;
- grabación y descarga cuando el navegador lo permite.

### Nota Community Improvement / Vecinia v2.2.1

Community Improvement / Vecinia v2.2.1 incorpora Export & Share Layer:

- captura in-app;
- galer-a;
- comparacion estado actual / propuesta;
- selector de intervenci-n;
- argumento para junta;
- descarga PNG comparativa;
- descarga PNG estado actual;
- descarga PNG propuesta;
- WhatsApp;
- email;
- copiar enlace;
- codigo visual / enlace;
- modo escaparate / mupi;
- guardado local b-sico.

---

## Capture Input System

Capacidad transversal para subir imagen desde galería, hacer foto con cámara trasera, hacer selfie con cámara frontal y usar esa imagen dentro del módulo. Primero se aplicará a Before / After Reforma y después al resto de módulos.

**No es un módulo aislado: es una función base reutilizable por todos los módulos de Gesture Lab.**

---

## Mapa de módulos multisectoriales

| Nº | Módulo | Estado |
|----|--------|--------|
| 01 | Bola de Imagen | Disponible · v1.3 |
| 02 | Before / After Reforma | Disponible · v2.1.2 |
| 03 | Community Improvement / Vecinia | Disponible - v2.2.1 |
| 04 | Real Estate Immersive Viewer | Próximamente · v2.3 |
| 05 | Real Estate Capture Tour | Próximamente · v2.4 |
| 06 | Golf Experience / Home Practice | Próximamente · v2.5 |
| 07 | Golf Course Visualizer | Próximamente · v2.6 |
| 08 | Pádel Tactical Lab | Próximamente · v2.14 |
| 09 | Tennis Gesture Court | Próximamente · v2.15 |
| 10 | Nautical Visualizer | Próximamente · v2.13 |
| 11 | Tourism / Resort Tour | Próximamente · v2.12 |
| 12 | Product 360 | Próximamente · v2.10 |
| 13 | Lookbook Gestual / Moda | Próximamente · v2.8 |
| 14 | Selfie Style / Outfit Visualizer | Próximamente · v2.9 |
| 15 | Food Assembly General | Próximamente · v2.7 |
| 16 | Sushi Roll Interactive | Próximamente · v2.7 |
| 17 | Burger Layers Interactive | Próximamente · v2.7 |
| 18 | Pizza / Cheese Pull Visualizer | Próximamente · v2.7 |
| 19 | Museo / Patrimonio | Próximamente · v2.16 |
| 20 | Educación Visual | Próximamente · v2.17 |
| 21 | Dental Kids / Cepillado Interactivo | Próximamente · v2.18 |
| 22 | Higiene de Manos | Próximamente · v2.19 |
| 23 | Fisioterapia Guiada | Próximamente · v2.20 |
| 24 | Salud / Clínicas | Próximamente · v2.21 |
| 25 | Automoción | Próximamente · v2.22 |
| 26 | Industria / Cocinas / B2B | Próximamente · v2.23 |
| 27 | Instituciones / Urbanismo | Próximamente · v2.24 |
| 28 | Eventos / Activaciones | Próximamente · v2.25 |
| 29 | Nutrición Infantil | Próximamente · v2.26 |
| 30 | Seguridad Laboral | Próximamente · v2.27 |
| 31 | Educación Ambiental | Próximamente · v2.28 |
| 32 | Interactive Retail Window | Próximamente · v2.11 |
| 33 | Personal Avatar / Selfie Campaign | Próximamente · v2.29 |

### Notas de módulos nuevos (v2.0.1)

- **05 — Real Estate Capture Tour**: el agente hace fotos del salón, cocina, baño, terraza o fachada desde la plataforma y genera una experiencia visual rápida. Acelera captaciones inmobiliarias y crea material comercial en minutos.
- **06 — Golf Experience / Home Practice**: combina imagen del jugador y campo de golf. El usuario se hace una foto o graba postura de swing, elige hoyo/campo y ve trayectoria, dirección, zona de impacto y objetivo. Practicar en casa, clases, academias, membresías y resorts.
- **07 — Golf Course Visualizer**: campo, hoyo, green, bunker, viento y trayectoria por capas. Revela estrategia, zonas de riesgo y golpe recomendado.
- **14 — Selfie Style / Outfit Visualizer**: selfie convertida en base para estilos, outfits, accesorios o comparación outfit base vs completo. Personaliza moda, belleza, retail, peluquería, eventos y campañas.
- **15 — Food Assembly General**: platos, menús o productos montados por capas. Vende producto gastronómico de forma visual y apetecible.
- **16 — Sushi Roll Interactive**: sushi que se enrolla, se corta o revela ingredientes (alga, arroz, pescado, toppings y salsa). Restaurantes japoneses, delivery y campañas virales.
- **17 — Burger Layers Interactive**: hamburguesa construida por capas (pan, carne, queso, bacon, salsa, lechuga, tomate y packaging). Ingredientes premium y clips apetecibles para redes.
- **18 — Pizza / Cheese Pull Visualizer**: porción separada, queso estirado, toppings y detalles de producto. Pizzerías, delivery y productos preparados.
- **32 — Interactive Retail Window**: escaparate digital que responde al gesto. Cambia colección, producto, promoción o historia de marca desde una pantalla interactiva.
- **33 — Personal Avatar / Selfie Campaign**: selfie convertida en pieza interactiva de campaña. Activaciones, eventos, moda, deporte, clínicas, educación y marcas.

---

## Prioridad estrat-gica

El siguiente m-dulo recomendado es:

**v2.3 - Real Estate Immersive Viewer**

**Motivo:**

Despu-s de validar Bola de Imagen, Before / After Reforma y Community Improvement / Vecinia, el siguiente paso natural es llevar el patr-n a una experiencia inmobiliaria inmersiva: capturar o subir im-genes de una vivienda, navegar visualmente por zonas, presentar puntos fuertes y compartir la demo con clientes compradores o propietarios.

**Flujo previsto:**

1. Subir o capturar im-genes de una vivienda.
2. Navegar por zonas clave: sal-n, cocina, ba-o, terraza, fachada o dormitorio.
3. Activar puntos fuertes y argumentos comerciales.
4. Exportar imagen, enlace o clip.
5. Compartir la demo con comprador, propietario o agencia.

**Frase clave:**

> De ense-ar una vivienda a dirigir una experiencia comercial.

---

## Aprendizajes reutilizables de Bola de Imagen

Bola de Imagen v1.3 ha servido para definir un patrón técnico y UX que debe aplicarse al resto de módulos.

- Trabajar siempre con versiones nuevas, no sobrescribir archivos publicados.
- Primero validar una experiencia base antes de escalar sectores.
- En móvil no depender solo de Fullscreen API: usar vista inmersiva CSS propia.
- Los controles críticos deben estar visibles dentro de vista completa.
- Home, Cerrar, Grabar, Detener y Descargar deben estar accesibles cuando aplique.
- La grabación debe ser opcional y tolerante a fallos por limitaciones de iOS/Safari.
- Los gestos deben tener fallback manual.
- OPEN / FIST / swipe deben probarse en móvil real.
- La UI debe explicar estado de cámara, gesto y progreso.
- Cada módulo debe ser útil aunque la cámara falle.
- La prioridad es claridad comercial, no complejidad técnica.
- Primero slider/manual; después gesto; después grabación.
- No construir muchos módulos a la vez: implementar uno por fase.

---

## Patrón base de cada módulo Gesture Lab

Cada módulo debe incluir, cuando aplique:

- propósito comercial;
- efecto visual;
- acción del usuario;
- carga de imagen o demo interna;
- control manual;
- control gestual opcional;
- vista completa;
- Home;
- grabación si el navegador lo permite;
- descarga si existe clip;
- copy comercial;
- riesgos técnicos documentados.

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
- `v2.0` / `v2.0.1` corresponde al Hub multisectorial.
- `v2.1` en adelante corresponde a módulos sectoriales.
- Cada fase debe implementarse paso a paso.
- No construir todos los módulos a la vez.

---

## Roadmap resumido

- v2.0 — Hub multisectorial
- v2.0.1 — Roadmap ampliado 33 módulos
- v2.1 — Before / After Reforma — validado
- v2.1.1 — Capture Input System — sustituido por v2.1.2
- v2.1.2 - In-app Camera Capture - estable
- v2.2 - Community Improvement / Vecinia - validado
- v2.2.1 - Export & Share Layer - estable actual
- v2.2.2 - Promote Vecinia - documentacion/Hub
- v2.3 - Real Estate Immersive Viewer - siguiente
- v2.4 — Real Estate Capture Tour
- v2.5 — Golf Experience / Home Practice
- v2.6 — Golf Course Visualizer
- v2.7 — Food Assembly: Sushi + Burger + Pizza
- v2.8 — Lookbook Gestual / Moda
- v2.9 — Selfie Style / Outfit Visualizer
- v2.10 — Product 360
- v2.11 — Interactive Retail Window
- v2.12 — Tourism / Resort Tour
- v2.13 — Nautical Visualizer
- v2.14 — Pádel Tactical Lab
- v2.15 — Tennis Gesture Court
- v2.16 — Museo / Patrimonio
- v2.17 — Educación Visual
- v2.18 — Dental Kids
- v2.19 — Higiene de Manos
- v2.20 — Fisioterapia Guiada
- v2.21 — Salud / Clínicas
- v2.22 — Automoción
- v2.23 — Industria / Cocinas / B2B
- v2.24 — Instituciones / Urbanismo
- v2.25 — Eventos / Activaciones
- v2.26 — Nutrición Infantil
- v2.27 — Seguridad Laboral
- v2.28 — Educación Ambiental
- v2.29 — Personal Avatar / Selfie Campaign

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

- Hub v2.0.1 con 33 módulos documentados.
- Capture Input System validado in-app (v2.1.2).
- Bola de Imagen v1.3 publicada y funcional.
- Before / After Reforma v2.1.2 publicada y funcional.
- Community Improvement / Vecinia v2.2.1 publicada y funcional.
- Siguiente fase: v2.3 - Real Estate Immersive Viewer.
