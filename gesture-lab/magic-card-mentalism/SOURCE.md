# Magic Card Mentalism Retail PRO - Gesture Lab 35

Modulo independiente creado para `Rubik-Sota-Director-de-Orquesta/gesture-lab`.

## Base funcional

- Adaptado desde `Card Mentalism Media PRO` de Escaparates Pro.
- Mantiene la logica matematica por bits:
  - Las cartas tienen valor `1..N`.
  - Cada ronda pregunta por un bit.
  - Las respuestas Si/No reconstruyen el indice final.
  - La revelacion usa `answerBits - 1`.

## Contrato de medios

- Por defecto usa cartas demo internas, listas para jugar.
- Si el usuario sube imagenes o videos, el numero de medios debe coincidir con el numero de cartas.
- No se repiten archivos: se deduplican por nombre, peso, tipo y fecha.
- Si faltan medios, el juego se bloquea salvo que se active "Completar faltantes con placeholders visibles".
- Logo y fondo son independientes del deck.

## Interaccion

- Fallback tactil obligatorio:
  - Boton grande NO.
  - Boton grande SI.
- Modo gestual ligero:
  - Camara activa.
  - Movimiento en mitad izquierda = NO.
  - Movimiento en mitad derecha = SI.
  - Cooldown para evitar dobles respuestas.

## Salida comercial

- Descarga PNG del recuerdo final.
- Incluye campana, logo, claim, CTA y media revelado.
- Pensado para retail, ferias, escaparates, moda, eventos y lead capture.

## Pendientes posibles

- Integrar QR real de continuidad movil.
- Exportar JSON de partida.
- Ranking local por campana.
- Modo kiosk con auto-reset y atraccion.
