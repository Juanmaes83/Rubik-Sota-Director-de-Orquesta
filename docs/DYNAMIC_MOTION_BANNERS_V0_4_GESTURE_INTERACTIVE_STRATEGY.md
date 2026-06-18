# Dynamic Motion Banners v0.4 — Gesture Interactive Edition Strategy

## Estrategia Aprobada

Dynamic Motion Banners v0.4 sera una version experimental separada para preparar interaccion gestual real sobre banderolas dinamicas sin sustituir ni romper la version estable v0.3.

La estrategia aprobada es ampliar el motor gestual validado de Rubik Sota, no reemplazarlo por otro pipeline externo.

## Principio De No Sustitucion

El pipeline core actual se mantiene:

`webcam -> hand landmarks -> normalizacion -> gesto estable -> cooldown -> action router -> accion personalizada por modulo`

v0.4 debe respetar esta arquitectura:

- el motor reconoce gestos comunes;
- el router estabiliza y enfria acciones;
- cada modulo decide que accion ejecutar;
- mouse y touch siguen funcionando como fallback;
- la version estable v0.3 permanece intacta.

## Recursos Estudiados

### quiet-node / gesture-lab

Referencia: `https://github.com/quiet-node/gesture-lab`

Se estudia como referencia tecnica por su uso de TypeScript, Three.js, MediaPipe Tasks Vision y Vite.

Patrones aprovechables:

- open palm;
- closed fist;
- pinch;
- wave;
- two hands apart/together;
- force field;
- vortex;
- grab;
- sculpt;
- smoothing de posicion, escala y rotacion;
- grace period;
- gesture-to-effect mapping.

Que no copiar:

- estetica arcade/cosmica;
- escenas completas;
- dependencia directa;
- sustitucion del motor Rubik Sota.

### Prachi142 / gesture-cube

Referencia: `https://github.com/Prachi142/gesture-cube/blob/main/README.md`

No sirve como dependencia web directa porque usa Python, OpenGL, Pygame, OpenCV y MediaPipe. Si aporta heuristicas utiles para el clasificador.

Patrones aprovechables:

- landmark history;
- finger extension / finger curl;
- wrist motion tracking;
- multi-frame velocity;
- cooldown por gesto;
- live debug overlay.

Que no copiar:

- Python;
- OpenGL/Pygame;
- arquitectura de escritorio;
- dependencias no web;
- conversion del modulo en app local externa.

## Ampliaciones Aprobadas Del Motor

- `LandmarkHistory`: buffer temporal de landmarks para calcular estabilidad, velocidad y direccion.
- `PalmCenter`: centro normalizado de palma para posicion e interaccion con zonas del banner.
- `PalmScale`: escala relativa de mano para estimar profundidad/distancia.
- `GestureStabilizer`: estabilidad multi-frame, grace period y cooldown.
- `GestureActionMap`: mapeo comun gesto -> accion por modulo.
- `QA/Debug Panel`: lectura de gesto bruto, gesto estable, confianza, cooldown y accion resuelta.

## Arquitectura Prevista

- `InputManager`: unifica mouse, touch y webcam.
- `HandTrackingAdapter`: adapta MediaPipe Hands / Tasks Vision al formato interno.
- `GestureClassifier`: clasifica open palm, fist, pinch, swipe y estados derivados.
- `GestureStabilizer`: filtra ruido, aplica estabilidad y cooldown.
- `BannerPhysicsController`: traduce acciones a viento, agarre, estiramiento y reset.
- `FallbackManager`: mantiene mouse/touch cuando no hay camara o permisos.
- `ExportManager`: conserva PNG, HTML, ZIP y WebM sin capturar UI de depuracion.
- `QA/Debug Panel`: muestra landmarks/gestos/acciones para pruebas.

## Gestos MVP

- mouse drag = mover/deformar banderola;
- touch drag = mover/deformar banderola;
- open palm = viento / mover suavemente;
- pinch = agarrar punto de banderola;
- pinch + drag = estirar/deformar;
- swipe = latigazo visual / cambio de estado;
- palma quieta = reset suave;
- mano sobre QR = iluminar/ampliar CTA.

## Gestos Posteriores

- two hands apart = ensanchar;
- two hands close = comprimir;
- wrist rotation = enrollar / retorcer.

## Aplicacion Transversal Por Modulos

El gesto no pertenece al modulo. El motor reconoce gestos comunes y cada modulo decide su accion.

Ejemplo `pinch`:

- Dynamic Motion Banners -> `grabFabric`
- Retail Catalog -> `selectProduct`
- Real Estate Viewer -> `openHotspot`
- Fashion Lookbook -> `selectLook`
- Optical Module -> `selectFrame`
- Ferias/Showrooms -> `selectPanel`

## Plan De Implementacion

1. Crear una copia separada `rubik-sota-dynamic-motion-banners-v0-4-gesture.html`.
2. Mantener intacto `rubik-sota-dynamic-motion-banners-v0-3.html`.
3. Preparar panel `Gesture Mode` con placeholders tecnicos.
4. Implementar primero mouse/touch drag como interaccion segura.
5. Conectar `InputManager` y `BannerPhysicsController`.
6. Integrar webcam/MediaPipe sobre el pipeline validado.
7. Anadir `LandmarkHistory`, `PalmCenter`, `PalmScale` y `GestureStabilizer`.
8. Conectar `GestureActionMap` sin acoplar acciones a gestos globales.
9. Validar QA/Debug Panel en escritorio y movil.
10. Mantener exportaciones v0.3 intactas antes de plantear Hub.

## Riesgos

- permisos de camara;
- rendimiento movil;
- ruido de landmarks;
- falsos positivos en pinch/swipe;
- cooldown demasiado corto o largo;
- diferencias iOS/Safari en `MediaRecorder`;
- gesto real no verificable sin camara fisica;
- riesgo de romper export si se mezcla UI de debug con canvas exportable.

## Decision Final

La decision aprobada es avanzar a Dynamic Motion Banners v0.4 como modulo separado, experimental y no conectado al Hub todavia.

No se sustituye el pipeline gestual validado. Se amplia con historial, estabilizacion, heuristicas y un mapa de acciones transversal.

La version estable v0.3 permanece intacta hasta que v0.4 supere QA funcional y visual propio.
