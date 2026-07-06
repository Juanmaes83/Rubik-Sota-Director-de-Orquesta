# ZOLTAN Portal 1089

Ruta: `gesture-lab/zoltan/portal-1089/`

## Que es

Experiencia ZOLTAN de magia matematica y branding. El usuario introduce un numero de 3 cifras, ZOLTAN lo invierte, resta mayor menos menor, invierte el resultado y demuestra la convergencia en 1089.

## Como funciona

1. El usuario introduce un numero valido de 3 cifras.
2. Primera y ultima cifra deben ser diferentes.
3. Se calcula mayor menos menor.
4. Se invierte el resultado.
5. Se suman ambos valores.
6. El portal abre 1089 y muestra claim/CTA.

## Algoritmo 1089

Ejemplo:

```text
732 ↔ 237
732 - 237 = 495
495 ↔ 594
495 + 594 = 1089
```

## Privacidad

- Sin backend.
- Sin cookies.
- Camara opcional.
- No se graba video.
- No se envian imagenes ni frames fuera del navegador.

## Analytics local

- `zoltan_portal_1089_loaded`
- `zoltan_portal_1089_started`
- `zoltan_portal_1089_seed_changed`
- `zoltan_portal_1089_preset_selected`
- `zoltan_portal_1089_sector_selected`
- `zoltan_portal_1089_step_viewed`
- `zoltan_portal_1089_validation_failed`
- `zoltan_portal_1089_result_confirmed`
- `zoltan_portal_1089_revealed`
- `zoltan_portal_1089_exported`
- `camera_started`
- `camera_denied`
- `fallback_used`

## QA manual

- Probar semillas 732, 421, 963 y 851.
- Confirmar convergencia en 1089.
- Probar inputs invalidos: menos de 3 cifras, 999, 121 y letras.
- Probar modo paso a paso.
- Probar auto ritual.
- Probar descarga PNG.
- Denegar camara y confirmar modo tactil.
- Confirmar que siguen funcionando Oracle, Brand Magic Square, Magic Card y Hub.

## Casos de uso

- Cupon secreto.
- Pagina desbloqueada.
- Producto recomendado.
- Promocion de escaparate.
- Activacion de feria.
- Landing interactiva.

## Limitaciones

- La camara usa detector de movimiento tolerante a fallos; no depende de MediaPipe.
- El PNG no captura frames de video de fondo por seguridad y estabilidad.
