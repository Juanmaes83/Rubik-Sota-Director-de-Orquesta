# ZOLTAN Physical QA Protocol

## Objetivo

Medir si una experiencia ZOLTAN funciona en condiciones reales sin afirmar pruebas fisicas no realizadas.

## Que medir

- Comprension en menos de 5 segundos.
- Tiempo hasta primera accion.
- Tiempo hasta reveal.
- Uso de fallback.
- Errores visibles.
- Reward entendido.
- CTA visible.
- Descarga PNG.
- Comportamiento si camara falla o se deniega.

## Que no medir ni registrar

- Video.
- Audio.
- Frames.
- Imagenes.
- Caras.
- Landmarks crudos.
- Telefono.
- Email.
- Nombres reales.

## Protocolo de privacidad

La telemetria local solo puede guardar datos de entorno, interacciones, fallbacks, tiempos, errores y notas de tester. No hay envio externo ni cookies.

## Escenarios

| Escenario | Objetivo |
|---|---|
| Portatil buena luz | Baseline |
| Portatil baja luz | Robustez |
| Movil vertical | Caso principal |
| Movil horizontal | Layout |
| Tablet | Layout medio |
| Pantalla externa / escaparate | Distancia y legibilidad |
| Distancia 50 cm | Touch/camara cercana |
| Distancia 1 m | Uso normal |
| Distancia 2 m | Escaparate |
| Fondo con movimiento | Falsos positivos |
| Camara denegada | Fallback |
| Usuario zurdo | Direccion |
| Usuario diestro | Direccion |

## Scoring

- 0 = fallo.
- 1 = usable con problemas.
- 2 = correcto.
- 3 = excelente.

## Criterios minimos

- Touch/mouse completa siempre.
- Camara nunca rompe.
- Reward se entiende.
- CTA visible.
- Privacy copy visible.
- No hay QR falso.
- No hay datos personales obligatorios.

## Plantilla de informe manual

```text
Modulo:
Dispositivo:
Navegador:
Orientacion:
Distancia:
Luz:
Camara usada: si/no
Fallback usado: si/no
Tiempo hasta primera accion:
Tiempo hasta reveal:
Reward entendido: 0/1/2/3
CTA visible: 0/1/2/3
PNG descargado: si/no
Errores:
Notas:
Decision: bloquear / revisar / aprobar
```
