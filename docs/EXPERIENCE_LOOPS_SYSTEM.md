# Experience Loops System

Metodología operativa de Rubik Sota Director de Orquesta.

Este documento es memoria para humanos y para futuras IAs. Si trabajas sobre este repo, lee esto antes de actuar.

---

## 1. Qué es Rubik (y qué no es)

Rubik Sota Director de Orquesta **no es una colección de demos**.

Rubik es una **plataforma modular de experiencias inmersivas, visuales, gestuales, de IA y hardware**, personalizables para sectores, empresas y marcas.

Su función es la de un director de orquesta:

- **orquestar**: coordinar módulos, motores y datos;
- **lanzar**: convertir un módulo en experiencia concreta para un cliente;
- **documentar**: dejar memoria de cada decisión y cada regla aprendida;
- **conectar**: unir captura de datos, assets, preview, QR/landing, outreach y CRM.

Complementa (no sustituye) a `docs/Rubik-Sota-Director-de-Orquesta_STRATEGY.md`: un solo motor madre, los verticales son aplicaciones del mismo núcleo.

---

## 2. La regla de oro: adaptabilidad comercial

Cada módulo, existente o nuevo, se evalúa por una pregunta:

> ¿Puede convertirse en una experiencia sectorial o de marca que ayude a vender?

Criterios de evaluación de cualquier módulo:

1. Mayor valor comercial.
2. Menor riesgo técnico.
3. Mayor adaptabilidad a marcas.
4. Mejor potencial WOW/viral.
5. Más fácil de probar.
6. Más fácil de vender.
7. Más reutilizable en otros sectores.
8. Menos peso dentro de Rubik.
9. Más privacidad y seguridad.
10. Más claridad para futuras IAs.

Si un módulo no genera una acción comercial, es solo un experimento visual (Regla 6 de la estrategia).

---

## 3. Arquitectura: módulos ligeros dentro, motores pesados fuera

| Tipo | Dónde vive | Ejemplos |
|------|-----------|----------|
| Módulo ligero (HTML standalone, MediaPipe vía CDN, canvas) | Dentro de Rubik, en `gesture-lab/` | Bola de Imagen, Before/After, Retail Window Pro |
| Motor pesado (build propio, modelos ML, Unity, node_modules) | Repo externo propio | `human` (Human Vision Engine / MIRRORA Engine), `Hand-Gesture-Gaming` (Gesture Gaming / Arena Control) |

Reglas:

- **Nunca copiar un repo pesado dentro de Rubik.** Ni `human`, ni `Hand-Gesture-Gaming`, ni builds de Unity.
- Los motores externos se conectan por **enlace, iframe, demo pública o adaptación documentada**, no por copia.
- Rubik guarda la **capa de personalización y la documentación de adaptación**; el motor guarda el código.

Motores externos registrados:

| Motor | Repo | Rol para Rubik |
|-------|------|----------------|
| Human Vision Engine / MIRRORA Engine | [Juanmaes83/human](https://github.com/Juanmaes83/human) | Rostro, cuerpo, manos, iris, emoción, gestos, segmentación. Ver `docs/RUBIK_HUMAN_VISION_ENGINE_ADAPTATION.md` en ese repo. |
| Gesture Gaming / Arena Control | [Juanmaes83/Hand-Gesture-Gaming](https://github.com/Juanmaes83/Hand-Gesture-Gaming) | Juego 3D (Unity WebGL) controlado por gestos de mano (TF.js handpose + fingerpose). Ver `docs/ARENA_CONTROL_PERSONALIZATION.md` en ese repo. |

---

## 4. El Experience Loop

Todo trabajo sobre Rubik (humano o IA) sigue este bucle:

1. **Entiende el porqué.** Objetivo comercial, no tarea suelta.
2. **Observa** el estado real del proyecto (README, docs, estructura, ramas).
3. **Decide** la mejor ruta con los criterios del punto 2.
4. **Actúa** solo sobre lo reversible, útil y coherente.
5. **Prueba** con QA real (móvil incluido cuando aplique).
6. **Detecta** errores.
7. **Corrige** con el fix mínimo seguro.
8. **Aprende**: documenta la regla para no repetir el error.
9. **Repite** la acción mejorada hasta acercarte al objetivo.
10. **Documenta** lo hecho y lo que falta.

Funciona como un GPS: el destino está claro, la ruta puede cambiar. Si una vía está cortada, se recalcula; solo se pide decisión al propietario ante bloqueos importantes o riesgos reales.

### Loop de usuario (la otra cara)

Cada experiencia publicada también es un loop, visto desde el usuario final:

```
Atracción → Interacción (gesto/tacto/cámara) → Transformación visual
→ Recompensa/Reward → Souvenir compartible → CTA / Lead
```

Un módulo no está terminado hasta que cierra el loop completo, incluido el CTA.

---

## 5. Reglas operativas para IAs

- Lee README.md y `docs/*.md` antes de actuar; si algo ya está decidido ahí, respétalo.
- Trabaja siempre en ramas `feature/`, nunca directamente en `main`.
- No hagas merge a `main` sin aprobación del propietario.
- No uses `git add .`; añade archivos de forma explícita.
- No modifiques versiones publicadas salvo corrección explícita; cada versión nueva es archivo nuevo.
- No añadas librerías externas sin justificación.
- No digas que algo está live si no lo está; no inventes estados.
- No publiques nada nuevo sin aprobación explícita.
- QA mínimo: `git diff --check`; si hay cambios HTML, servir con `python -m http.server 8080` y probar `/` y `/gesture-lab/`.
- Los gestos siempre con fallback manual; los módulos deben ser útiles aunque la cámara falle.

---

## 6. Documentos del sistema

| Documento | Propósito |
|-----------|-----------|
| `docs/Rubik-Sota-Director-de-Orquesta_STRATEGY.md` | Visión estratégica: motor madre, verticales, fases |
| `docs/EXPERIENCE_LOOPS_SYSTEM.md` | Este documento: metodología de trabajo |
| `docs/PERSONALIZATION_CORE_SCHEMA.md` | Schema común de personalización de experiencias |
| `docs/WOW_PREMIUM_MODULES_BACKLOG.md` | Backlog de módulos WOW/premium con evaluación comercial |
| `docs/ASSET_AND_EFFECTS_LIBRARY.md` | Gobierno de assets y efectos reutilizables |
| `docs/SYSTEM_RULES_WEB_COMPLETA_BLUEPRINT.md` | Reglas del sistema web |
| `gesture-lab/_module-template/README.md` | Patrón técnico de cada módulo |

---

## 7. Frase guía

> Rubik no colecciona demos. Orquesta módulos, motores y datos reales para convertirlos en experiencias memorables que venden.
