# Next Module Packs Roadmap

Este documento registra packs futuros para Rubik Sota Director de Orquesta. No implica que esten integrados, publicados o listos para produccion.

## PACK A - Gesture Gaming Pack

**Modulos candidatos:**

- Hand-Gesture-Gaming / Arena Control
- Air-Draw
- hand-gesture-recognition-mediapipe

**Rol estrategico:** juegos gestuales, dibujo con manos y motores de control por camara.

**Despliegue probable:** externo para demos ya publicadas; backend separado para Air Draw; engine local/documentado para reconocimiento.

**Tipo:** externo, backend, engine, research.

**Riesgos:** permisos de camara, rendimiento movil, latencia, ausencia de fallback, UX de juego poco clara.

**Prioridad:** alta para demo externa live; media para Air Draw; media-alta para engine si se convierte en capa reusable.

**Adaptacion comercial:** eventos, retail, ferias, centros comerciales, educacion, instalaciones y juegos de marca.

## PACK B - Commercial Interaction Pack

**Modulos candidatos:**

- map-gesture-controls
- Virtual-Shopping-Cart-OPENCV
- Real-Time-Hand-Gesture-Control-System-for-Racing-Games

**Rol estrategico:** interaccion comercial directa: mapas, carritos, navegacion, control de compra y juego aplicado a conversion.

**Despliegue probable:** externo o laboratorio dedicado; algunos modulos pueden necesitar Python/OpenCV o backend.

**Tipo:** externo, engine, backend, research.

**Riesgos:** privacidad, usabilidad en movil, precision de gestos, integracion con ecommerce real, seguridad de datos.

**Prioridad:** alta si se conecta a retail; media si solo es demo tecnica.

**Adaptacion comercial:** shopping wall, carrito gestual, mapa turistico, configurador de tienda, carrera promocional y activacion con QR.

## PACK C - Lightweight Gesture Utilities

**Modulos candidatos:**

- hand-gesture-game-controller
- Air Draw Lite futuro
- otros modulos HTML/JS convertibles a GitHub Pages

**Rol estrategico:** utilidades ligeras que puedan entrar en Rubik sin cargar motores pesados.

**Despliegue probable:** GitHub Pages interno o externo.

**Tipo:** interno ligero, externo ligero.

**Riesgos:** demos demasiado simples, poca narrativa, falta de salida final, duplicidad con modulos existentes.

**Prioridad:** media-alta si se empaquetan como experiencias sectoriales.

**Adaptacion comercial:** control basico de pantallas, minijuegos, onboarding, kioscos, escaparates y pruebas rapidas.

## PACK D - MIRRORA / Human Vision Engine Pack

**Modulos candidatos:**

- human
- face-api
- handtrack.js

**Rol estrategico:** vision humana, rostro, mano, identidad visual, avatar, try-on y souvenirs personalizados.

**Despliegue probable:** engines documentados y prototipos aislados; no dentro del core hasta pasar privacidad y rendimiento.

**Tipo:** engine, research, posible modulo externo.

**Riesgos:** privacidad facial, sesgos, consentimiento, rendimiento movil, peso de modelos, compatibilidad iOS/Safari.

**Prioridad:** alta para estrategia MIRRORA, pero solo como foundation hasta tener privacy/QA.

**Adaptacion comercial:** probadores virtuales, avatar de marca, foto recuerdo, belleza, moda, eventos y retail.

## PACK E - Hardware / Physical Interaction Pack

**Modulos candidatos:**

- tello-gesture-control
- esp32-mini-oled-webcam-stream-mediapipe
- esp32-pinball
- 1-bit-doom-stream

**Rol estrategico:** conectar Rubik con dispositivos fisicos, sensores, microcontroladores y experiencias instalables.

**Despliegue probable:** repos externos, hardware labs, instalaciones locales.

**Tipo:** hardware, backend, research.

**Riesgos:** seguridad fisica, permisos de red, mantenimiento, compatibilidad de hardware, coste de soporte, fallos en evento real.

**Prioridad:** media; alta solo cuando haya cliente/instalacion concreta.

**Adaptacion comercial:** stands interactivos, escaparates fisicos, ferias, museos, deporte, educacion tecnica y eventos.

## PACK F - AI Visual Engine / Safety Pack

**Modulos candidatos:**

- sdnext
- sd-extension-steps-animation
- nudenet

**Rol estrategico:** generacion visual, animacion por pasos y seguridad/moderacion de contenido.

**Despliegue probable:** backend/engine externo. No debe cargarse en el core de Rubik.

**Tipo:** engine, backend, research, safety.

**Riesgos:** peso extremo, GPU, latencia, coste, privacidad de imagenes, seguridad de contenido, licencias y moderacion.

**Prioridad:** media para estrategia; alta solo si hay pipeline de producto con backend claro.

**Adaptacion comercial:** posters personalizados, fondos generativos, avatares, campañas visuales, filtros de seguridad y recuerdos premium.

## Nota para futuras IAs

Estos packs son roadmap. No afirmar que estan integrados si solo estan documentados. No copiar motores pesados dentro del core. Cada avance debe indicar estado tecnico real, estado comercial real y siguiente paso seguro.
