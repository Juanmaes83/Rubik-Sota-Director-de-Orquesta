# ZOLTAN Brand Magic Square

Ruta: `gesture-lab/zoltan/brand-magic-square/`

## Que es

Experiencia ZOLTAN de magia matematica aplicada a branding. El usuario introduce un numero de campana y el modulo genera un cuadrado magico 4x4 verificable donde filas, columnas y diagonales principales suman el mismo numero.

## Como funciona

1. El usuario elige un numero o sector.
2. ZOLTAN genera el cuadrado.
3. La interfaz valida filas, columnas y diagonales.
4. Se muestra el reveal comercial: claim, CTA y numero objetivo.
5. Se descarga un PNG final cerrado.

## Algoritmo

Para un numero objetivo `N`:

```text
N-20   1     12    7
11     8     N-21  2
5      10    3     N-18
4      N-19  6     9
```

Todas las filas, columnas y diagonales principales suman `N`.

## Privacidad

- Sin backend.
- Sin cookies.
- Camara opcional.
- No se graba video.
- No se envian imagenes ni frames fuera del navegador.

## Analytics local

Usa `window.ZoltanAnalytics.track` si existe. Eventos principales:

- `zoltan_magic_square_loaded`
- `zoltan_magic_square_started`
- `zoltan_magic_square_number_changed`
- `zoltan_magic_square_preset_selected`
- `zoltan_magic_square_sector_selected`
- `zoltan_magic_square_generated`
- `zoltan_magic_square_validation_passed`
- `zoltan_magic_square_validation_failed`
- `zoltan_magic_square_revealed`
- `zoltan_magic_square_exported`
- `camera_started`
- `camera_denied`
- `fallback_used`

## QA manual

- Probar numeros 34, 49, 99, 360 y 2026.
- Confirmar filas, columnas y diagonales.
- Probar numero menor de 34 y aviso.
- Probar selector sector.
- Probar color de marca.
- Probar descarga PNG.
- Denegar camara y confirmar que touch sigue funcionando.
- Confirmar que no rompe `zoltan/oracle-card`, `magic-card-mentalism` ni el hub.

## Casos de uso

- Retail y moda.
- Turismo.
- Inmobiliaria 360.
- Automocion.
- Educacion y museo.
- Eventos y ferias.
