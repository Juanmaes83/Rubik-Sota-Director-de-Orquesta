# Sword Gesture Modules

## 1. Que son

Sword Gesture Modules es una nueva linea R&D independiente dentro de Gesture Lab / Director de Orquesta para explorar experiencias visuales controladas por mano con webcam, MediaPipe, WebGL y sistemas 3D.

En esta fase no se integra codigo interno. Solo se crean launchers que abren demos publicas externas ya publicadas.

## 2. Por que existen

Existen para validar el interes comercial y tecnico de experiencias gestuales de alto impacto antes de convertirlas en runtime interno de Gesture Lab o Escaparates Pro.

La prioridad es separar bien el descubrimiento publico, el QA movil y la futura integracion tecnica.

## 3. Diferencia entre Sword Rain y Sword Control

Sword Rain es la demo WOW inmediata. Es directa, visual y sirve para ensenar rapidamente una lluvia de espadas controlada por mano.

Sword Control es la base tecnica futura. Su stack modular con React, Vite, React Three Fiber, Zustand, MediaPipe y Three.js la hace mas adecuada para evolucionar hacia un motor mantenible.

## 4. Relacion con Gesture Lab

Dentro de Gesture Lab aparecen como modulos R&D independientes. No sustituyen Camera FX, ZOLTAN ni MIRRORA.

Su funcion actual es servir como entradas de lanzamiento hacia demos externas, con documentacion de riesgos y proximos pasos.

## 5. Relacion con ZOLTAN

No pertenecen a ZOLTAN.

ZOLTAN trabaja magia, mentalismo, oraculos, revelacion, reward y activaciones de asombro comercial.

Sword Gesture Modules trabaja control gestual 3D, particulas, espadas, mano/camara y efectos de accion.

## 6. Relacion con MIRRORA

No pertenecen a MIRRORA.

MIRRORA trabaja identidad facial, try-on, avatar, storytelling, souvenir y experiencias basadas en rostro.

Sword Gesture Modules trabaja control manual y visuales 3D con webcam.

## 7. Estado actual

Estado: external public demos / R&D launchers.

Los launchers dentro de Rubik Sota solo enlazan a las demos publicas. No cargan camara, no cargan scripts externos y no ejecutan el runtime de las demos.

## 8. Que NO son

- No son ZOLTAN.
- No son MIRRORA.
- No son producto final.
- No estan integrados todavia en runtime interno.
- No copian GordenSun/SwordArt.

## 9. URLs publicas

- Sword Rain Hand Control: https://juanmaes83.github.io/sword-rain-hand-control/
- Sword Control: https://juanmaes83.github.io/swordControl/

## 10. Riesgos

- Webcam permissions: cada demo externa necesita permiso de camara y debe explicar uso local.
- Mobile GPU load: particulas, instancing, bloom y WebGL pueden cargar demasiado algunos moviles.
- Safari/iOS: MediaPipe, WebGL, WASM, permisos de camara y captura pueden comportarse de forma irregular.
- External CDN/model dependencies: algunos modelos, WASM o librerias externas pueden fallar si el CDN no responde.
- No privacy screen yet: antes de integracion oficial hace falta pantalla previa de privacidad.
- Fallback insufficient: si la camara falla, debe existir modo manual/demo y mensaje claro.

## 11. Roadmap

- Fase 0: publicar demos externas.
- Fase 1: launchers en Gesture Lab.
- Fase 2: QA movil.
- Fase 3: privacy/fallback/LOD.
- Fase 4: Sword Gesture Lab PRO.
- Fase 5: integracion futura en Escaparates Pro.
