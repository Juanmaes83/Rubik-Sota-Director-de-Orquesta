# ZOLTAN Platform Layer

## Que es

ZOLTAN es una plataforma de activaciones inmersivas de marca. No debe presentarse como juegos matematicos, sino como experiencias donde una marca, anfitrion u oraculo parece leer, elegir, revelar o desbloquear algo para el usuario.

## Las 4 capas

1. Hidden Engine: motor invisible de seleccion, mentalismo, matching, probabilidad o reveal.
2. Experience Skin: mundo visible sectorial: fashion, sneaker, travel, perfume, inmobiliaria, automocion, restaurante, museo o evento.
3. Reward Layer: salida comercial accionable: producto, look, coupon, drop access, ruta o CTA generico.
4. Host Voice: voz anfitriona memorable. Nunca formulario frio.

## Shared core actual

- `gesture-lab/zoltan/shared/zoltan-selection-engine.js`: motor binario reusable.
- `gesture-lab/zoltan/shared/zoltan-reward-layer.js`: rewards locales seguros.
- `gesture-lab/zoltan/shared/zoltan-reward-layer.css`: UI base de reward.
- `gesture-lab/zoltan/shared/zoltan-experience-schema.js`: contrato de authoring.
- `gesture-lab/zoltan/shared/zoltan-telemetry.js`: QA local sin datos sensibles.

## Como crear un nuevo skin

1. Define fantasia visible en una frase.
2. Define objeto de deseo: producto, destino, look, premio o acceso.
3. Crea 8-20 items.
4. Usa `ZoltanSelectionEngine.createDeck`.
5. Usa preguntas SI/NO por touch y botones.
6. Añade tension antes del reveal.
7. Crea reward con `ZoltanRewardLayer.createReward`.
8. Exporta recuerdo PNG o muestra error claro.
9. No uses QR falso.
10. Documenta privacidad y QA.

## Que no hacer

- No explicar la matematica al usuario.
- No exigir camara.
- No pedir datos personales sin backend ni aviso.
- No inventar QR.
- No usar enlaces inseguros.
- No construir una demo sin recompensa.
- No copiar una skin sin adaptar voz, reward y sector.

## Checklist experiencia memorable

- Se entiende en menos de 5 segundos.
- Hay fantasia visible.
- Hay tension antes del reveal.
- El host tiene voz propia.
- El usuario recibe algo que guardar, copiar o usar.
- La marca queda integrada en el recuerdo final.

## Checklist salida comercial

- CTA visible.
- Reward accionable.
- PNG descargable o error claro.
- Link seguro.
- Fallback sin camara.
- Fallback sin localStorage.
- Privacidad visible.
