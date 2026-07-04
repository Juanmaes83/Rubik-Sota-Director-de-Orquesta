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
- 04 - Real Estate Immersive Viewer - Disponible - v2.3
- 05 - Real Estate Capture Tour - Disponible - v2.4
- 06 - Golf Experience / Home Practice - Disponible - v2.5
- 07 - Retail Catalog - Disponible - v2.6
- 08 - Interactive Gesture Catalog / Retail Catalog - Disponible - v2.7
- 09 - Interactive Retail Window - Disponible - v2.8
- 10 - Fashion Lookbook - Disponible - v2.9
- 11 - Dynamic Motion Banners - Disponible - v0.3.9 stable / v0.4 gesture experimental
- 12 - Selfie Style / Outfit Visualizer - Disponible - v2.10.1

**Linea conectada desde Escaparates Pro / Camera FX:**

- Camera FX Cum Laude - Disponible como laboratorio independiente en `gesture-lab/camera-fx-cum-laude/`
- Webcam Pixelation PRO
- Motion Detection Camera PRO
- Red Light Green Light Camera PRO
- Glitch Camera PRO
- Air Guitar Camera PRO
- Air Guitar Camera PRO Festival
- Air Guitar Camera PRO V2

### Dynamic Motion Banners v0.4 — Gesture Interactive Edition

Dynamic Motion Banners existe como linea de trabajo dentro de Gesture Lab. La version v0.3.9 es la base estable de editor/exportacion; la version v0.4 gestual se mantiene separada para experimentar con Gesture Mode antes de publicarla como dependencia de otros modulos.

- Se amplia el motor gestual validado; no se sustituye el pipeline actual.
- No se toca la version estable v0.3/v0.3.9.
- La version separada v0.4 ya existe como laboratorio experimental para Gesture Mode.
- `quiet-node/gesture-lab` y `Prachi142/gesture-cube` se usan como referencias tecnicas, no como dependencias.
- Documento estrategico: [DYNAMIC_MOTION_BANNERS_V0_4_GESTURE_INTERACTIVE_STRATEGY.md](docs/DYNAMIC_MOTION_BANNERS_V0_4_GESTURE_INTERACTIVE_STRATEGY.md)

**Versiones estables actuales:**

- Bola de Imagen v1.3
- Before / After Reforma v2.1.2
- Community Improvement / Vecinia v2.2.1
- Real Estate Immersive Viewer v2.3
- Real Estate Capture Tour v2.4
- Golf Experience / Home Practice v2.5
- Retail Catalog v2.6
- Interactive Gesture Catalog / Retail Catalog v2.7
- Interactive Retail Window v2.8
- Fashion Lookbook v2.9
- Dynamic Motion Banners v0.3.9 stable / v0.4 gesture experimental
- Selfie Style / Outfit Visualizer v2.10.1

**Archivos:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`
- `gesture-lab/before-after-reforma/rubik-sota-before-after-reforma-v2-1-2.html`
- `gesture-lab/community-improvement-vecinia/rubik-sota-community-improvement-vecinia-v2-2-1.html`
- `gesture-lab/real-estate-immersive-viewer/rubik-sota-real-estate-immersive-viewer-v2-3.html`
- `gesture-lab/real-estate-capture-tour/rubik-sota-real-estate-capture-tour-v2-4.html`
- `gesture-lab/golf-experience-home-practice/rubik-sota-golf-experience-home-practice-v2-5.html`
- `gesture-lab/retail-catalog/rubik-sota-retail-catalog-v2-6.html`
- `gesture-lab/interactive-gesture-catalog/rubik-sota-interactive-gesture-catalog-v2-7.html`
- `gesture-lab/interactive-retail-window/rubik-sota-interactive-retail-window-v2-8.html`
- `gesture-lab/fashion-lookbook/rubik-sota-fashion-lookbook-v2-9.html`
- `gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-3.html`
- `gesture-lab/dynamic-motion-banners/rubik-sota-dynamic-motion-banners-v0-4-gesture.html`
- `gesture-lab/selfie-style-outfit-visualizer/rubik-sota-selfie-style-outfit-visualizer-v2-10-1.html`
- `gesture-lab/camera-fx-cum-laude/index.html`
- `gesture-lab/camera-fx-cum-laude/webcam-pixelation-pro/index.html`
- `gesture-lab/camera-fx-cum-laude/motion-detection-camera-pro/index.html`
- `gesture-lab/camera-fx-cum-laude/red-light-green-light-camera-pro/index.html`
- `gesture-lab/camera-fx-cum-laude/glitch-camera-pro/index.html`
- `gesture-lab/camera-fx-cum-laude/air-guitar-camera-pro/index.html`
- `gesture-lab/camera-fx-cum-laude/air-guitar-camera-pro-festival/index.html`
- `gesture-lab/camera-fx-cum-laude/air-guitar-camera-pro-v2/index.html`

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

## Hub v2.0.6

El Hub v2.0.6 organiza Gesture Lab como plataforma multisectorial con 34 aplicaciones/modulos.

**Archivo:**

- `gesture-lab/index.html`

**Demos activas:**

- `gesture-lab/bola-imagen/rubik-sota-gesture-lab-bola-imagen-v1-3.html`
- `gesture-lab/before-after-reforma/rubik-sota-before-after-reforma-v2-1-2.html`
- `gesture-lab/community-improvement-vecinia/rubik-sota-community-improvement-vecinia-v2-2-1.html`
- `gesture-lab/real-estate-immersive-viewer/rubik-sota-real-estate-immersive-viewer-v2-3.html`
- `gesture-lab/real-estate-capture-tour/rubik-sota-real-estate-capture-tour-v2-4.html`
- `gesture-lab/golf-experience-home-practice/rubik-sota-golf-experience-home-practice-v2-5.html`
- `gesture-lab/retail-catalog/rubik-sota-retail-catalog-v2-6.html`
- `gesture-lab/interactive-gesture-catalog/rubik-sota-interactive-gesture-catalog-v2-7.html`
- `gesture-lab/interactive-retail-window/rubik-sota-interactive-retail-window-v2-8.html`

**Meta:**

- `v2.0.6 - 14 modulos activos - 20 en planificacion`

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
- galería;
- comparación estado actual / propuesta;
- selector de intervención;
- argumento para junta;
- descarga PNG comparativa;
- descarga PNG estado actual;
- descarga PNG propuesta;
- WhatsApp;
- email;
- copiar enlace;
- código visual / enlace;
- modo escaparate / mupi;
- guardado local básico.

### Nota Real Estate Immersive Viewer v2.3

Real Estate Immersive Viewer v2.3 lleva el patron Gesture Lab al eje inmobiliario por zonas:

- selector de zona (salon, cocina, dormitorio, bano, terraza, fachada);
- subir imagen o hacer foto in-app por zona;
- captura modal con preview y cancelar/volver siempre visible;
- fallback a input nativo capture=environment si no hay contexto seguro;
- comparacion original vs version comercial / staged con slider;
- modos cortina, fundido y split 50/50;
- argumento comercial editable (punto fuerte + beneficio + nivel premium/medio/basico);
- vista completa con cerrar, home y descarga PNG siempre accesibles;
- descarga PNG por zona;
- WhatsApp, email y copiar enlace con texto inmobiliario;
- guardado local de configuracion (zona, modo, nivel, slider, textos) con key rubik-sota-real-estate-viewer-v2-3-snapshot.

### Nota Real Estate Capture Tour v2.4

Real Estate Capture Tour v2.4 incorpora captura guiada de vivienda por estancias:

- datos de vivienda: referencia, ubicacion, precio orientativo, operacion y notas internas;
- flujo guiado de 4 pasos: portada, estancias, argumento y exportacion;
- seis estancias: Portada, Salon, Cocina, Dormitorio, Bano y Terraza;
- captura in-app con getUserMedia y fallback a input nativo;
- subida de imagen desde galeria;
- imagen actual y mejora/propuesta por estancia;
- checklist comercial por estancia (luz natural, orden, amplitud, acabados, potencial, necesita mejora);
- estado de captura por estancia: Pendiente, Capturada, Lista para presentar;
- canvas comparativo con Cortina, Fundido y Split 50/50;
- resumen de progreso del tour con porcentaje y siguiente estancia recomendada;
- descarga PNG por estancia;
- grabacion WebM si el navegador lo permite;
- WhatsApp, email, copiar enlace y guardado local;
- localStorage key: rubik-sota-real-estate-capture-tour-v2-4-snapshot.

### Nota Golf Experience / Home Practice v2.5

Golf Experience / Home Practice v2.5 incorpora practica visual guiada:

- datos de sesion: jugador, coach, tipo de practica, palo usado, objetivo y notas internas;
- flujo guiado de 4 pasos: captura posicion, selecciona fase, ajusta guia visual y exporta feedback;
- seis fases: Setup, Grip, Backswing, Impacto, Follow Through y Resultado;
- captura in-app con getUserMedia y fallback a input nativo;
- subida de imagen desde galeria;
- imagen actual y referencia/correccion por fase;
- checklist tecnico por fase (postura, pies, grip, cabeza, peso, fluidez);
- estado de fase: Pendiente, Revisado, Listo;
- guias visuales simples sobre canvas: linea objetivo, eje corporal, pies, trayectoria y equilibrio (orientativas, no medicion biomecanica);
- canvas comparativo con Cortina, Fundido y Split 50/50;
- resumen de progreso de practica;
- descarga PNG;
- grabacion WebM si el navegador lo permite;
- WhatsApp, email, copiar enlace y guardado local;
- localStorage key: rubik-sota-golf-experience-home-practice-v2-5-snapshot.

### Nota Retail Catalog v2.6

Retail Catalog v2.6 incorpora catálogo comercial interactivo:

- motor local de productos;
- categorías: Destacados, Moda, Calzado, Accesorios, Hogar y Promociones;
- producto destacado con ficha, precio, beneficio, stock demo y promoción;
- favoritos;
- carrito local;
- total estimado;
- resumen de selección;
- código de continuación / QR demo sin API externa;
- modo producto, ficha, carrito y código;
- descarga PNG;
- grabación WebM si el navegador lo permite;
- WhatsApp, email, copiar enlace y guardado local;
- localStorage key: rubik-sota-retail-catalog-v2-6-snapshot.

### Nota Interactive Gesture Catalog / Retail Catalog v2.7

Interactive Gesture Catalog / Retail Catalog v2.7 incorpora control gestual real sobre catalogo retail:

- motor local de productos heredado de Retail Catalog;
- categorias, ficha de producto, favoritos y carrito local;
- reconocimiento de mano con MediaPipe Tasks Vision / Hand Landmarker;
- camara con getUserMedia y fallback manual;
- gestos: mano abierta, swipe izquierda/derecha, pinza, puno y gesto hacia arriba;
- swipe de mano para cambiar producto;
- pinza para seleccionar o abrir ficha;
- puno para anadir al carrito;
- mano abierta hacia arriba para mostrar codigo de continuacion;
- botones tactiles siempre activos como fallback;
- panel de calibracion: sensibilidad, cooldown, estado de mano y gesto detectado;
- codigo de continuacion / QR demo sin API externa;
- descarga PNG;
- grabacion WebM si el navegador lo permite;
- WhatsApp, email, copiar enlace y guardado local;
- localStorage key: rubik-sota-interactive-gesture-catalog-v2-7-snapshot.

### Nota Interactive Retail Window v2.8

Interactive Retail Window v2.8 incorpora experiencia de escaparate digital:

- modo escaparate / kiosk;
- attract loop automatico;
- escenas de storytelling de marca;
- producto destacado en pantalla grande;
- promociones automaticas;
- simulacion de transeunte / acercamiento;
- estados: sin transeunte, transeunte cerca e interaccion activa;
- ficha rapida de producto;
- CTA hacia movil;
- codigo de continuacion / QR demo sin API externa;
- interaccion tactil siempre activa;
- gestos opcionales si la camara/modelo estan disponibles;
- descarga PNG;
- grabacion WebM si el navegador lo permite;
- WhatsApp, email, copiar enlace y guardado local;
- localStorage key: rubik-sota-interactive-retail-window-v2-8-snapshot.

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
| 04 | Real Estate Immersive Viewer | Disponible - v2.3 |
| 05 | Real Estate Capture Tour | Disponible - v2.4 |
| 06 | Golf Experience / Home Practice | Disponible - v2.5 |
| 07 | Retail Catalog | Disponible - v2.6 |
| 08 | Interactive Gesture Catalog / Retail Catalog | Disponible - v2.7 |
| 09 | Interactive Retail Window | Disponible - v2.8 |
| 10 | Fashion Lookbook | Disponible - v2.9 |
| 11 | Dynamic Motion Banners | Disponible - v0.3.9 stable / v0.4 gesture experimental |
| 12 | Selfie Style / Outfit Visualizer | Disponible - v2.10.1 |
| 13 | Dental Kids | Disponible - v2.11 |
| 14 | Retail Window Pro | Disponible - v2.12 |
| 15 | Food Assembly General | Próximamente - v2.13 |
| 16 | Sushi Roll Interactive | Próximamente - v2.14 |
| 17 | Burger Layers Interactive | Próximamente - v2.15 |
| 18 | Pizza / Cheese Pull Visualizer | Próximamente - v2.16 |
| 19 | Museo / Patrimonio | Próximamente - v2.17 |
| 20 | Educación Visual | Próximamente - v2.18 |
| 21 | Higiene de Manos | Próximamente - v2.19 |
| 22 | Fisioterapia Guiada | Próximamente - v2.20 |
| 23 | Salud / Clínicas | Próximamente - v2.21 |
| 24 | Automoción | Próximamente - v2.22 |
| 25 | Industria / Cocinas / B2B | Próximamente - v2.23 |
| 26 | Instituciones / Urbanismo | Próximamente - v2.24 |
| 27 | Eventos / Activaciones | Próximamente - v2.25 |
| 28 | Nutrición Infantil | Próximamente - v2.26 |
| 29 | Seguridad Laboral | Próximamente - v2.27 |
| 30 | Educación Ambiental | Próximamente - v2.28 |
| 31 | Pádel Tactical Lab | Próximamente - v2.29 |
| 32 | Tennis Gesture Court | Próximamente - v2.30 |
| 33 | Nautical Visualizer | Próximamente - v2.31 |
| 34 | Golf Course Visualizer | Próximamente - v2.32 |

### Notas de módulos nuevos (v2.0.6)

- **05 — Real Estate Capture Tour**: el agente hace fotos del salón, cocina, baño, terraza o fachada desde la plataforma y genera una experiencia visual rápida. Acelera captaciones inmobiliarias y crea material comercial en minutos.
- **06 — Golf Experience / Home Practice**: combina imagen del jugador y campo de golf. El usuario se hace una foto o graba postura de swing, elige hoyo/campo y ve trayectoria, dirección, zona de impacto y objetivo. Practicar en casa, clases, academias, membresías y resorts.
- **07 — Retail Catalog**: catálogo comercial interactivo con categorías, favoritos, carrito local, código de continuación y share layer. Sirve para tiendas, marcas, showrooms, franquicias y ferias.
- **12 — Selfie Style / Outfit Visualizer**: selfie convertida en base para estilos, outfits, accesorios o comparación outfit base vs completo. v2.10.1 añade MediaPipe Pose Auto Fit para hombros, torso y rostro, cámara reforzada, prendas SVG/canvas internas y fallback manual permanente. Personaliza moda, belleza, retail, peluquería, eventos y campañas.
- **13 — Dental Kids**: coach educativo de cepillado real con cámara, MediaPipe Face/Hand Landmarker, seis zonas, avisos de cambio cada 20 segundos, reto de 2 minutos, fallback manual, recompensas, misiones 3 veces al día y racha local. No es diagnóstico clínico; es entrenamiento de hábito.
- **14 — Retail Window Pro**: evolución directa de Interactive Retail Window v2.8. Añade carrito, wishlist, código/QR, resumen comercial, continuidad móvil y modo kiosk pro para retail, franquicias, ferias, campañas y mupis.
- **15 — Food Assembly General**: platos, menús o productos montados por capas. Vende producto gastronómico de forma visual y apetecible.
- **16 — Sushi Roll Interactive**: sushi que se enrolla, se corta o revela ingredientes (alga, arroz, pescado, toppings y salsa). Restaurantes japoneses, delivery y campañas virales.
- **17 — Burger Layers Interactive**: hamburguesa construida por capas (pan, carne, queso, bacon, salsa, lechuga, tomate y packaging). Ingredientes premium y clips apetecibles para redes.
- **18 — Pizza / Cheese Pull Visualizer**: porción separada, queso estirado, toppings y detalles de producto. Pizzerías, delivery y productos preparados.
- **32 — Interactive Retail Window**: escaparate digital que responde al gesto. Cambia colección, producto, promoción o historia de marca desde una pantalla interactiva.
- **33 — Personal Avatar / Selfie Campaign**: selfie convertida en pieza interactiva de campaña. Activaciones, eventos, moda, deporte, clínicas, educación y marcas.

---

## Prioridad estratégica

El siguiente módulo recomendado es:

**v2.13 - Food Assembly General**

**Motivo:**

Tras activar Retail Window Pro, el siguiente paso recomendado es Food Assembly General: platos, menús o productos montados visualmente por capas.

**Flujo previsto:**

1. Elegir reto educativo.
2. Guiar limpieza por zonas.
3. Mostrar progreso visual.
4. Recompensar constancia.
5. Exportar resumen o pieza social.

**Frase clave:**

> Del visualizador personal a la educacion visual gamificada.

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
- `v2.0` / `v2.0.1` / `v2.0.2` / `v2.0.3` / `v2.0.4` corresponde al Hub multisectorial.
- `v2.1` en adelante corresponde a módulos sectoriales.
- Cada fase debe implementarse paso a paso.
- No construir todos los módulos a la vez.

---

## Roadmap resumido

- v2.0 — Hub multisectorial
- v2.0.1 — Roadmap ampliado 33 módulos
- v2.0.2 — Hub actualizado a 34 módulos y 11 activos
- v2.0.6 — Retail Window Pro v2.12 activo como evolución comercial del módulo 09; 14 módulos activos
- v2.1 — Before / After Reforma — validado
- v2.1.1 — Capture Input System — sustituido por v2.1.2
- v2.1.2 - In-app Camera Capture - estable
- v2.2 - Community Improvement / Vecinia - validado
- v2.2.1 - Export & Share Layer - estable
- v2.2.2 - Promote Vecinia - documentacion/Hub
- v2.3 - Real Estate Immersive Viewer - estable
- v2.4 - Real Estate Capture Tour - estable
- v2.5 - Golf Experience / Home Practice - estable
- v2.6 - Retail Catalog - estable
- v2.7 - Interactive Gesture Catalog / Retail Catalog - estable
- v2.8 - Interactive Retail Window - estable
- v2.9 - Fashion Lookbook - estable
- Dynamic Motion Banners v0.3.9 - estable editor/exportacion
- Dynamic Motion Banners v0.4 - laboratorio gestual experimental
- v2.10.1 - Selfie Style / Outfit Visualizer - estable actual
- v2.11 - Dental Kids - estable actual
- v2.12 - Retail Window Pro - estable actual
- v2.13 - Food Assembly: Sushi + Burger + Pizza - siguiente
- v2.14 - Museo / Patrimonio
- v2.15 - Educación Visual
- v2.16 - Higiene de Manos
- v2.17 - Fisioterapia Guiada
- v2.18 - Salud / Clínicas
- v2.19 - Automoción
- v2.20 - Industria / Cocinas / B2B
- v2.21 - Instituciones / Urbanismo
- v2.22 - Eventos / Activaciones
- v2.23 - Nutrición Infantil
- v2.24 - Seguridad Laboral
- v2.25 - Educación Ambiental
- v2.26 - Pádel Tactical Lab
- v2.27 - Tennis Gesture Court
- v2.28 - Nautical Visualizer
- v2.29 - Tourism / Resort Tour
- v2.30 - Product 360
- v2.31 - Golf Course Visualizer
- v2.32 - Personal Avatar / Selfie Campaign

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

- Hub v2.0.6 con 34 módulos documentados.
- Capture Input System validado in-app (v2.1.2).
- Bola de Imagen v1.3 publicada y funcional.
- Before / After Reforma v2.1.2 publicada y funcional.
- Community Improvement / Vecinia v2.2.1 publicada y funcional.
- Real Estate Immersive Viewer v2.3 publicada y funcional.
- Real Estate Capture Tour v2.4 publicada y funcional.
- Golf Experience / Home Practice v2.5 publicada y funcional.
- Retail Catalog v2.6 publicada y funcional.
- Interactive Gesture Catalog / Retail Catalog v2.7 publicada y funcional.
- Interactive Retail Window v2.8 publicada y funcional.
- Fashion Lookbook v2.9 publicada y funcional.
- Dynamic Motion Banners v0.3.9 disponible como editor/exportador; v0.4 gesture se mantiene experimental.
- Selfie Style / Outfit Visualizer v2.10.1 publicada con Pose Auto Fit, cámara reforzada, prendas internas y fallback manual.
- Dental Kids v2.11 publicado como coach educativo de cepillado real.
- Retail Window Pro v2.12 publicado y funcional.
- Siguiente fase: v2.13 - Food Assembly General.
