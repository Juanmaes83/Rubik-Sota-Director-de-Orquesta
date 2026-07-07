# Gesture Gaming Pack

Gesture Gaming Pack es una linea R&D de Gesture Lab para evaluar experiencias controladas por manos, cuerpo o camara que puedan convertirse en activaciones comerciales, juegos de marca, instalaciones, escaparates o modulos de captacion.

Este pack no pertenece a ZOLTAN, no pertenece a MIRRORA y no modifica Sword. Complementa esas lineas como bloque independiente de juegos y control gestual.

## Estado del pack

| Modulo | Tipo | Estado | Despliegue | URL |
| --- | --- | --- | --- | --- |
| Gesture Gaming / Arena Control | Modulo externo desplegado | LIVE | GitHub Pages externo | https://juanmaes83.github.io/Hand-Gesture-Gaming/ |
| Air Draw | Server app / R&D | R&D / backend requerido | Flask + SocketIO + MediaPipe + OpenCV | https://github.com/Juanmaes83/Air-Draw |
| Hand Gesture Recognition / MediaPipe Core | Engine / research | R&D / motor local | Python + OpenCV + MediaPipe + TensorFlow | https://github.com/Juanmaes83/hand-gesture-recognition-mediapipe |

## Criterio de integracion

No se copia codigo pesado dentro de Rubik Sota. Rubik actua como hub, documentacion y launcher seguro.

- Si el modulo es HTML/JS ligero y exportable a GitHub Pages, puede alojarse internamente.
- Si el modulo necesita backend, WebSocket, Python, modelos o dependencias pesadas, debe vivir en repo independiente.
- Si el modulo es engine tecnico, se documenta como base futura, no como producto final.
- Si el modulo usa camara, debe tener privacidad visible, fallback y QA movil antes de entrar en produccion.

## 1. Gesture Gaming / Arena Control

**Rol estrategico:** demo inmediata de juego gestual. Sirve para probar el interes de experiencias tipo arena, control por manos y gameplay de marca.

**Estado:** publicado como demo externa.

**Launcher interno:** `gesture-lab/gesture-gaming/`

**Riesgos antes de productizar:**

- revisar UX de permisos de camara;
- documentar fallback si no hay camara;
- evaluar rendimiento movil;
- definir skin comercial por sector;
- separar demo tecnica de experiencia final de marca.

**Adaptaciones comerciales posibles:**

- eventos deportivos;
- ferias;
- gaming retail;
- activaciones de centros comerciales;
- stands de marcas;
- competiciones con ranking local.

## 2. Air Draw

**Rol estrategico:** dibujo gestual y captura creativa. Puede evolucionar hacia pizarras inmersivas, firmas de marca, graffiti digital, educacion, eventos y recuerdo descargable.

**Estado:** R&D. No esta publicado como GitHub Pages porque requiere servidor.

**Launcher interno:** `gesture-lab/air-draw/`

**Riesgos antes de productizar:**

- backend obligatorio;
- WebSocket/SocketIO;
- permisos de camara;
- latencia;
- guardado de dibujos;
- privacidad y borrado de imagenes si hay captura.

**Adaptaciones comerciales posibles:**

- mural de evento;
- dibujo colaborativo;
- firma visual de visitante;
- educacion infantil;
- activacion de marca con descarga de recuerdo.

## 3. Hand Gesture Recognition / MediaPipe Core

**Rol estrategico:** motor de reconocimiento de gestos para alimentar otros modulos. No debe venderse como demo final sin capa de experiencia.

**Estado:** R&D / engine local.

**Launcher interno:** `gesture-lab/hand-gesture-recognition-mediapipe/`

**Riesgos antes de productizar:**

- pipeline Python;
- dependencias ML;
- rendimiento variable por dispositivo;
- no hay narrativa comercial final;
- necesita capa de UI, privacidad, fallback y QA.

**Adaptaciones comerciales posibles:**

- motor comun para Gesture Lab;
- seleccion por gestos en retail;
- juegos de marca;
- instalaciones interactivas;
- control de escaparates;
- input para Director de Orquesta.

## Siguiente fase recomendada

1. Validar Gesture Gaming / Arena Control en movil real.
2. Definir primera skin comercial: evento, retail deportivo o feria.
3. Mantener Air Draw y Hand Gesture Recognition como motores externos hasta que tengan paquete ligero o despliegue dedicado.
4. Crear matriz de privacidad, permisos, fallback, rendimiento y salida final por modulo.
5. Solo integrar internamente lo que sea ligero, estable y vendible como experiencia adaptable.
