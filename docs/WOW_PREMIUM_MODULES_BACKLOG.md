# WOW Premium Modules Backlog

Backlog de módulos nuevos de alto impacto para Rubik Sota Director de Orquesta.

Cada módulo se evalúa por su capacidad de convertirse en experiencia sectorial o de marca (ver `docs/EXPERIENCE_LOOPS_SYSTEM.md`). Todos usan el contrato de `docs/PERSONALIZATION_CORE_SCHEMA.md`.

Leyenda de dificultad: 🟢 baja (HTML + MediaPipe, patrón existente) · 🟡 media (motor externo o física/3D) · 🔴 alta (integración multi-motor o hardware).

Motores base: **RSI** = Rubik interno (gesture-lab) · **HVE** = human (Human Vision Engine / MIRRORA) · **ACE** = Hand-Gesture-Gaming (Arena Control).

---

## 01 — Brand Portal

- **Porqué**: entrada memorable a cualquier activación; la marca "abre un portal" al usuario.
- **Sector**: eventos, ferias, retail, automoción.
- **Loop de usuario**: atracción (portal animado) → gesto de apertura (mano abierta) → mundo de marca revelado → reward (contenido exclusivo/QR) → compartir → CTA.
- **Interacción**: mano abierta/cerrada para abrir/cerrar portal; swipe para cambiar de sala.
- **Personalización**: palette, logo, assets del "mundo" de marca, música.
- **Reward/CTA**: código descuento o acceso VIP al escanear QR final.
- **Viralidad**: alta — vídeo del portal abriéndose con tu mano.
- **Dificultad**: 🟡. **Motor**: RSI + efecto WebGL de effects/.
- **Primer prototipo**: HTML standalone con transición portal (shader o CSS 3D) + Hand Landmarker.
- **Aplica a**: web, pantalla digital, escaparate, evento.

## 02 — Gesture Prize Machine

- **Porqué**: la máquina de premios sin tocar nada; conversión directa de tráfico en leads.
- **Sector**: retail, ferias, centros comerciales, eventos.
- **Loop**: attract loop → usuario detectado → gesto "agarrar" premio virtual → premio revelado → lead capture para canjear → CTA.
- **Interacción**: pinza/agarre (Hand Landmarker) para "coger" premio; puño para confirmar.
- **Personalización**: premios, marca, probabilidades, skin de máquina.
- **Reward/CTA**: premio real canjeable con email/teléfono (lead).
- **Viralidad**: media-alta — momento "lo he ganado con la mano".
- **Dificultad**: 🟢. **Motor**: RSI (patrón Retail Window Pro + gestos v2.7).
- **Primer prototipo**: HTML kiosk con 3 premios demo y código de canje local.
- **Aplica a**: escaparate, pantalla digital, evento.

## 03 — Immersive Product Ritual

- **Porqué**: presentar un producto como ritual (unboxing ceremonial) eleva percepción premium.
- **Sector**: perfumería, joyería, gourmet, automoción, tecnología.
- **Loop**: producto flotante → gestos secuenciales lo despiertan (girar, abrir, activar) → clímax visual → ficha/beneficios → reserva/compra.
- **Interacción**: secuencia de 3 gestos guiados; rotación por palma (patrón Bola de Imagen).
- **Personalización**: producto (imagen/GLB), pasos del ritual, copy premium.
- **Reward/CTA**: acceso anticipado, cita en tienda, muestra gratuita.
- **Viralidad**: alta en lanzamientos.
- **Dificultad**: 🟡 (3D opcional). **Motor**: RSI; GLB via Three.js si el cliente aporta modelo.
- **Primer prototipo**: versión imagen 2D con secuencia de gestos y clímax de partículas.
- **Aplica a**: web, escaparate, evento, pantalla digital.

## 04 — Interactive Window Challenge

- **Porqué**: convierte el escaparate en juego con ranking; para el transeúnte, 30 segundos de reto.
- **Sector**: retail, moda, centros comerciales.
- **Loop**: attract → transeúnte se acerca → reto de 30s con gestos (atrapa productos, esquiva) → puntuación → QR para reclamar descuento según score → ranking local.
- **Interacción**: posición de mano como pala/cursor; puño para acción.
- **Personalización**: productos que caen, branding, umbrales de premio.
- **Reward/CTA**: descuento proporcional al score; ranking con iniciales.
- **Viralidad**: alta — competición en la calle.
- **Dificultad**: 🟢🟡. **Motor**: RSI (evolución directa de Retail Window Pro v2.12).
- **Primer prototipo**: canvas 2D catch-game sobre el kiosk mode existente.
- **Aplica a**: escaparate, pantalla digital, evento.

## 05 — Tourism Memory Generator

- **Porqué**: el turista quiere un recuerdo único; el destino quiere su email y su alcance social.
- **Sector**: turismo, hoteles, oficinas de turismo, resorts.
- **Loop**: selfie/foto in-app → composición con escenario del destino + fecha + clima real → postal digital animada → descarga/compartir → CTA (reserva actividad, newsletter).
- **Interacción**: captura guiada (patrón Capture Input System v2.1.2) + gestos para elegir marco.
- **Personalización**: escenarios del destino, idiomas, temporada, marca del hotel/oficina.
- **Reward/CTA**: postal HD por email (lead) + descuento en actividad.
- **Viralidad**: muy alta — souvenir compartible nativo.
- **Dificultad**: 🟢. **Motor**: RSI; HVE opcional para segmentación de fondo.
- **Primer prototipo**: HTML con captura + 3 marcos de destino + share layer existente.
- **Aplica a**: web, pantalla digital, evento, hotel lobby.

## 06 — Real Estate Reveal Game

- **Porqué**: gamifica la presentación de vivienda; el comprador "descubre" la casa y deja lead cualificado.
- **Sector**: inmobiliaria, promotoras.
- **Loop**: fachada borrosa/cerrada → gestos revelan estancias una a una → cada reveal muestra punto fuerte → al completar: precio + tour completo → agenda visita.
- **Interacción**: swipe para cambiar estancia; mano abierta para "limpiar" el blur (patrón cortina).
- **Personalización**: fotos reales del inmueble (Capture Tour v2.4 como fuente), copy comercial.
- **Reward/CTA**: dossier PDF + agendar visita (lead cualificado).
- **Viralidad**: media; alto valor comercial por lead.
- **Dificultad**: 🟢. **Motor**: RSI (reusa Real Estate Capture Tour + Immersive Viewer).
- **Primer prototipo**: HTML con 4 estancias demo y reveal por cortina gestual.
- **Aplica a**: web, escaparate de agencia, feria inmobiliaria.

## 07 — Fashion Mirror Challenge

- **Porqué**: el espejo que te viste; prueba social instantánea para moda.
- **Sector**: moda, grandes almacenes, ferias.
- **Loop**: usuario frente a pantalla → detección de pose → outfit superpuesto → gesto swipe cambia look → foto del look favorito → compartir/QR → CTA a probador o ecommerce.
- **Interacción**: pose corporal (auto-fit hombros/torso) + swipe de mano.
- **Personalización**: colección de la marca, temporada, precios.
- **Reward/CTA**: descuento del look elegido; wishlist al móvil por QR.
- **Viralidad**: muy alta.
- **Dificultad**: 🟡. **Motor**: RSI (Selfie Style v2.10.1 como base) + HVE para body tracking robusto.
- **Primer prototipo**: evolución kiosk de Selfie Style con 5 looks de marca.
- **Aplica a**: escaparate, pantalla digital, evento, web.

## 08 — Automotive Gesture Configurator

- **Porqué**: configurar el coche con las manos en el concesionario o feria = experiencia premium memorable.
- **Sector**: automoción.
- **Loop**: coche en pantalla → gestos cambian color/llantas/ambiente → rotación por palma → configuración final → QR con tu configuración → test drive (lead).
- **Interacción**: swipe (color), pinza (detalle), palma (rotación 360).
- **Personalización**: modelos de la marca, opciones reales, campaña vigente.
- **Reward/CTA**: configuración guardada + cita test drive.
- **Viralidad**: media-alta en ferias.
- **Dificultad**: 🟡 (imágenes 360 pregeneradas) / 🔴 (GLB real-time).
- **Motor**: RSI; primer prototipo con sprites 360 del vehículo.
- **Aplica a**: pantalla digital, feria, showroom, web.

## 09 — Event Arena Ranking

- **Porqué**: torneo gestual en vivo con ranking en pantalla grande; la marca patrocina la competición.
- **Sector**: eventos, deportes, esports, festivales.
- **Loop**: jugador entra → juego Arena Control brandeado (60-90s) → score → ranking en vivo → foto podio compartible → premio del patrocinador.
- **Interacción**: los 6 gestos de Arena Control (avanzar, parar, izquierda, derecha, saltar, agacharse).
- **Personalización**: skin del entorno, premios, branding del ranking (ver `docs/ARENA_CONTROL_PERSONALIZATION.md` en Hand-Gesture-Gaming).
- **Reward/CTA**: premio físico al top diario; lead para participar.
- **Viralidad**: alta — gente jugando con el cuerpo en público.
- **Dificultad**: 🟡 (ranking overlay React sin tocar Unity) / 🔴 (skins dentro de Unity).
- **Motor**: ACE.
- **Primer prototipo**: overlay de marca + ranking localStorage sobre la demo pública existente.
- **Aplica a**: evento, feria, pantalla gigante.

## 10 — AI Souvenir Booth

- **Porqué**: photobooth con visión IA: tu selfie + tu emoción + el tema del evento = pieza única.
- **Sector**: eventos, bodas, ferias, museos, marcas.
- **Loop**: selfie → HVE detecta rostro/emoción/gesto → composición temática reactiva (tu sonrisa cambia el arte) → souvenir animado → email para recibirlo (lead) → compartir.
- **Interacción**: expresión facial y gestos de mano como "pincel".
- **Personalización**: tema visual del evento/marca, mensajes, idioma.
- **Reward/CTA**: pieza digital HD por email; versión impresa en evento premium.
- **Viralidad**: muy alta.
- **Dificultad**: 🟡. **Motor**: HVE (face + emotion) + RSI para share layer.
- **Primer prototipo**: demo de human (face/emotion) + canvas overlay temático + export PNG.
- **Aplica a**: evento, pantalla digital, museo.

## 11 — Gesture Product Drop

- **Porqué**: lanzamiento de producto estilo "drop" streetwear: solo quien completa el gesto accede.
- **Sector**: moda urbana, sneakers, gaming, bebidas.
- **Loop**: countdown → gesto secreto/challenge gestual → acceso al drop → compra/reserva limitada → badge compartible "I unlocked the drop".
- **Interacción**: secuencia de gestos (combo) con feedback visual.
- **Personalización**: producto, combo, estética del drop, stock.
- **Reward/CTA**: acceso a compra limitada; lista de espera (leads).
- **Viralidad**: muy alta en audiencias jóvenes.
- **Dificultad**: 🟢. **Motor**: RSI (fingerpose-like combos con Hand Landmarker).
- **Primer prototipo**: HTML con combo de 3 gestos y pantalla de unlock.
- **Aplica a**: web, escaparate, evento.

## 12 — Living Map Experience

- **Porqué**: mapa vivo del destino/ciudad/campus que responde a gestos; wayfinding memorable.
- **Sector**: turismo, ayuntamientos, campus, resorts, centros comerciales.
- **Loop**: mapa en pantalla → mano navega (pan/zoom gestual) → puntos de interés se animan al señalar → ficha del punto → QR con ruta al móvil.
- **Interacción**: palma para pan, pinza para zoom, señalar para seleccionar.
- **Personalización**: mapa/ilustración del cliente, POIs, eventos del día.
- **Reward/CTA**: ruta personalizada al móvil; cupones de comercios del mapa.
- **Viralidad**: media; alto valor institucional.
- **Dificultad**: 🟡. **Motor**: RSI + tiles/ilustración; HVE opcional.
- **Primer prototipo**: ilustración SVG con 6 POIs y navegación gestual.
- **Aplica a**: pantalla digital, tótem, oficina de turismo.

## 13 — Mirror of the Brand (MIRRORA)

- **Porqué**: el espejo mágico de la marca: te ve, te entiende y te responde. Pieza central de la línea MIRRORA.
- **Sector**: retail premium, hoteles, belleza, wellness.
- **Loop**: usuario se mira → espejo detecta presencia/rostro/edad aproximada/emoción (en cliente, sin subir datos) → mensaje personalizado de marca + recomendación → gesto para aceptar → QR con la recomendación → lead.
- **Interacción**: presencia, mirada, sonrisa, gesto de confirmación.
- **Personalización**: voz de marca, recomendaciones, umbrales, estética del espejo.
- **Reward/CTA**: recomendación personalizada al móvil; cita/reserva.
- **Viralidad**: alta — "el espejo me ha hablado".
- **Dificultad**: 🔴 (multi-modelo + hardware pantalla-espejo). **Motor**: HVE.
- **Primer prototipo**: demo human face+emotion+gaze con overlay de mensajes de marca.
- **Aplica a**: escaparate, retail, hotel, evento.
- **Privacidad**: procesamiento 100% en navegador; sin almacenamiento de imágenes; señalética informativa obligatoria.

## 14 — Retail Spell / ZOLTAN Commerce Ritual

- **Porqué**: el "adivino" del retail (línea ZOLTAN): teatraliza la recomendación de producto y captura lead jugando.
- **Sector**: retail, gran consumo, ferias, campañas estacionales.
- **Loop**: usuario activa a ZOLTAN (gesto de invocación) → 3 preguntas visuales respondidas por gesto → "predicción": tu producto ideal + motivo → ticket místico con QR → canje en tienda.
- **Interacción**: gestos de selección (izquierda/derecha/confirmar), animación de bola de cristal (reusa Bola de Imagen).
- **Personalización**: catálogo, tono del personaje, campaña (Navidad, rebajas...).
- **Reward/CTA**: ticket-predicción con descuento canjeable (lead + visita a tienda).
- **Viralidad**: alta — formato personaje.
- **Dificultad**: 🟢🟡. **Motor**: RSI.
- **Primer prototipo**: quiz gestual de 3 pasos + ticket PNG descargable.
- **Aplica a**: escaparate, evento, web, pantalla digital.

## 15 — Destination Unlock Challenge

- **Porqué**: el destino turístico como juego de niveles: cada reto desbloquea un lugar; fideliza y recoge datos de intención.
- **Sector**: turismo, DMOs, cadenas hoteleras, aerolíneas.
- **Loop**: mapa de destino bloqueado → mini-reto gestual por zona (playa, casco antiguo, gastronomía) → zona desbloqueada con vídeo/imagen premium → pasaporte digital → sorteo/descuento al completar → lead.
- **Interacción**: mini-juegos gestuales de 15s por zona.
- **Personalización**: zonas reales del destino, retos temáticos, premios.
- **Reward/CTA**: pasaporte completo = participación en sorteo (lead) + ofertas por zona.
- **Viralidad**: alta — coleccionismo compartible.
- **Dificultad**: 🟡. **Motor**: RSI; ACE para el reto "aventura".
- **Primer prototipo**: 3 zonas demo con retos del catálogo gestual v2.7.
- **Aplica a**: web, pantalla digital, oficina turismo, evento.

## 16 — Wellness Motion Coach

- **Porqué**: feedback postural en vivo sin apps ni wearables; para gimnasios, fisios y hoteles wellness.
- **Sector**: salud/bienestar, fitness, hoteles, RRHH (pausas activas).
- **Loop**: usuario frente a cámara → HVE body tracking → ejercicio guiado con feedback visual (ángulos, ritmo) → resumen de sesión → racha/reto → CTA (clase, bono, plan).
- **Interacción**: cuerpo completo; sin contacto.
- **Personalización**: ejercicios de la marca, niveles, branding.
- **Reward/CTA**: informe de sesión + oferta de servicio.
- **Viralidad**: media; retención alta (patrón racha de Dental Kids v2.11).
- **Dificultad**: 🟡. **Motor**: HVE (body pose).
- **Primer prototipo**: 1 ejercicio (sentadilla) con contador y semáforo postural.
- **Aplica a**: web, pantalla en gimnasio, evento wellness.
- **Nota**: experiencia de entrenamiento, no diagnóstico clínico (regla de módulos de salud).

## 17 — Hand Constellation Wall

- **Porqué**: pieza artística colectiva: cada visitante deja su "constelación" gestual en la pared de la marca.
- **Sector**: eventos, museos, inauguraciones, corporativo.
- **Loop**: mano detectada → estela de partículas con colores de marca → firma gestual guardada en el mural colectivo → foto de tu constelación → compartir con hashtag.
- **Interacción**: movimiento libre de manos; pinza para "fijar" estrellas.
- **Personalización**: paleta, logo constelación final, hashtag.
- **Reward/CTA**: tu pieza por email (lead) + mural colectivo en vivo.
- **Viralidad**: alta — arte generativo personal.
- **Dificultad**: 🟢. **Motor**: RSI (canvas partículas + Hand Landmarker).
- **Primer prototipo**: canvas de partículas con export PNG.
- **Aplica a**: evento, museo, pantalla gigante, escaparate.

## 18 — Face DJ / Emotion Soundtrack

- **Porqué**: tu cara controla la música/visuales; formato fiesta patrocinable.
- **Sector**: festivales, bebidas, nightlife, radio/música.
- **Loop**: rostro detectado → expresiones disparan capas de música y visuales → clip de 15s de tu "sesión" → compartir → CTA campaña.
- **Interacción**: cejas, sonrisa, boca abierta, giro de cabeza (HVE face mesh).
- **Personalización**: stems de audio de la campaña, visuales de marca.
- **Reward/CTA**: clip compartible con marca de agua; entrada/consumición por compartir.
- **Viralidad**: muy alta.
- **Dificultad**: 🟡. **Motor**: HVE + WebAudio.
- **Primer prototipo**: 3 expresiones → 3 capas de audio + grabación WebM existente.
- **Aplica a**: evento, web, escaparate nocturno.

---

## Ranking de potencial comercial (top 5)

| # | Módulo | Motivo |
|---|--------|--------|
| 1 | **05 — Tourism Memory Generator** | Dificultad baja, lead nativo (email para recibir postal), viralidad muy alta, encaja con turismo local (Torrevieja/Alicante) y con clientes actuales |
| 2 | **06 — Real Estate Reveal Game** | Reusa módulos v2.3/v2.4 ya estables, conecta con Immersphere Pro y CRM inmobiliario: monetización más corta |
| 3 | **02 — Gesture Prize Machine** | Fórmula probada de activación (premio = lead), implementable con patrones existentes en semanas |
| 4 | **04 — Interactive Window Challenge** | Evolución natural de Retail Window Pro v2.12; vendible a retail hoy |
| 5 | **13 — Mirror of the Brand (MIRRORA)** | El de mayor valor premium/diferencial a medio plazo; justifica la línea HVE completa |

## Reglas de activación del backlog

- Un módulo pasa de backlog a desarrollo solo con: vertical validado + primer cliente objetivo identificado + prototipo definido.
- Un solo módulo en construcción a la vez (regla de la plataforma).
- Cada módulo nuevo entra por `gesture-lab/_module-template/` y el schema de personalización.
