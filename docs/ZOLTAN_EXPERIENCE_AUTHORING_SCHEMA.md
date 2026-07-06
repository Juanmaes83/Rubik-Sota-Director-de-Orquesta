# ZOLTAN Experience Authoring Schema

## Problema que resuelve

ZOLTAN necesita crecer por configuracion y no por demos artesanales. El schema separa historia, host, motor, items y reward para crear nuevas skins con menos riesgo.

## Campos obligatorios

- `id`
- `version`
- `moduleType`
- `sector`
- `campaign.brandName`
- `campaign.claim`
- `host.name`
- `host.tone`
- `host.lines`
- `story.visibleFantasy`
- `story.hiddenMechanic`
- `story.wowMoment`
- `experience.engine`
- `revealRules`
- `rewards`

## Campos de storytelling

- `visibleFantasy`: que cree vivir el usuario.
- `hiddenMechanic`: motor real.
- `userGoal`: objetivo consciente.
- `emotionalHook`: por que importa.
- `tensionMoment`: donde se crea suspense.
- `wowMoment`: que se revela.
- `rewardPromise`: que recibe el usuario.

## Host voice

El host debe sonar como personaje de marca, no como formulario. Debe tener:

- nombre;
- tono;
- persona;
- reglas de voz;
- frases por fase.

## Reward

Tipos MVP:

- `product`
- `outfit`
- `coupon`
- `drop_access`
- `route`
- `generic_cta`

No hay pagos, reservas reales, QR falso, SMS real con datos ni backend en v1.

## Ejemplo fashion

```js
ZoltanExperienceSchema.createDefaultExperienceConfig({
  id: 'fashion-style-oracle',
  sector: 'fashion',
  campaign: { brandName: 'Atelier Demo', claim: 'Tu estilo ya habia elegido.' },
  rewards: { defaultType: 'outfit' }
});
```

## Ejemplo sneaker

```js
ZoltanExperienceSchema.createDefaultExperienceConfig({
  id: 'sneaker-drop-oracle',
  sector: 'sneaker',
  host: { name: 'Drop Oracle', tone: 'hype' },
  rewards: { defaultType: 'drop_access' }
});
```

## Ejemplo travel

```js
ZoltanExperienceSchema.createDefaultExperienceConfig({
  id: 'travel-destiny-oracle',
  sector: 'travel',
  host: { name: 'Route Oracle', tone: 'inspirador' },
  rewards: { defaultType: 'route' }
});
```

## Checklist: se entiende en 5 segundos

- Titulo claro.
- Frase de accion clara.
- Boton de inicio visible.
- Pregunta SI/NO sin ambiguedad.
- Fallback tactil obvio.

## Checklist: termina en recompensa accionable

- Reveal visible.
- Reward claro.
- CTA principal.
- Copiar/guardar/descargar.
- Sin QR falso.
- Sin datos personales obligatorios.
