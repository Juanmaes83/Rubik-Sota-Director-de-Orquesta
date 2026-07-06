# ZOLTAN Style Oracle / El Oraculo de tu Outfit

Modulo 39 de Rubik Sota Gesture Lab.

## Que es

ZOLTAN Style Oracle es una experiencia de personal shopper mentalista para moda, retail, escaparates, eventos y e-commerce.

El usuario piensa una prenda sin tocarla. La experiencia pregunta varias veces si su prenda aparece en pantalla. La respuesta se da por gesto, por zona tactil o por botones grandes. Al final, ZOLTAN revela el producto pensado y genera un recuerdo PNG de marca.

## Como se juega

1. La pantalla muestra un showroom de prendas.
2. El usuario piensa una prenda y no la pulsa.
3. ZOLTAN muestra grupos de productos y pregunta: "Tu prenda aparece aqui?".
4. Mano izquierda, zona izquierda o boton NO = no aparece.
5. Mano derecha, zona derecha o boton SI = si aparece.
6. El sistema revela la prenda.
7. El usuario descarga resultado o activa CTA comercial.

## Personalizacion

El panel permite editar:

- nombre de marca;
- claim de campana;
- CTA final;
- color de marca;
- tono del anfitrion: Premium, Provocador o Divertido;
- preset sectorial;
- numero de productos entre 8 y 20;
- imagenes o videos de prendas;
- logo;
- fondo opcional;
- placeholders visibles si faltan medios.

Regla importante: no se repiten assets ocultamente. Si faltan imagenes o videos, el sistema bloquea el deck o usa placeholders visibles si el usuario lo activa.

## Motor de adivinacion

El modulo usa el mismo principio binario validado en Magic Card Mentalism:

- cada producto tiene un valor binario;
- cada ronda pregunta por un bit;
- cada SI suma ese bit;
- al final se revela `answerBits - 1`;
- el resultado se valida dentro del deck.

La mecanica matematica queda invisible. El usuario vive una lectura de estilo, no una calculadora.

## Gestos y fallback

- Camara opcional.
- Movimiento o zona izquierda = NO.
- Movimiento o zona derecha = SI.
- Cooldown para evitar dobles respuestas.
- Si falla la camara, la experiencia sigue con touch/mouse y botones.

## Privacidad

La camara solo detecta gestos en este dispositivo. No se graba video, no se envian imagenes y no hay backend ni cookies.

## Analytics local

Usa `window.ZoltanAnalytics.track` si existe y mantiene fallback local.

Eventos principales:

- `zoltan_style_oracle_loaded`
- `zoltan_style_oracle_started`
- `zoltan_style_oracle_product_set_loaded`
- `zoltan_style_oracle_answered`
- `zoltan_style_oracle_revealed`
- `zoltan_style_oracle_cta_clicked`
- `zoltan_style_oracle_exported`
- `camera_started`
- `camera_denied`
- `fallback_used`

## Casos de uso

- escaparates interactivos;
- personal shopper de tienda;
- activaciones de marca;
- ferias de moda;
- sneaker drops;
- belleza y perfumes;
- campañas con cupón o wishlist;
- dinamizacion de e-commerce.

## QA

- Abrir `gesture-lab/zoltan/style-oracle/`.
- Confirmar que el usuario entiende el juego en menos de 5 segundos.
- Probar productos demo.
- Probar subida de imagenes.
- Probar subida de videos.
- Probar respuestas SI/NO por botones.
- Probar click/touch en zonas izquierda/derecha.
- Probar camara denegada.
- Probar camara activa cuando haya dispositivo disponible.
- Confirmar reveal correcto.
- Confirmar PNG descargable.
- Confirmar responsive movil.
- Confirmar que no hay errores JS.
- Confirmar que no rompe Magic Card Mentalism, ZOLTAN Oracle ni el Hub.
