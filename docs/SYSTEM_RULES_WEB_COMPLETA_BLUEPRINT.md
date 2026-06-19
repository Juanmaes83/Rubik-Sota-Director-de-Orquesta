# Regla de sistema — Web Desarrollada Completa · Blueprint Premium

**Aplicable a:** AURUM_PROPERTIES_BOUTIQUE · toda ruta `/[cliente]-web-completa`  
**Establecido en:** Sprint 4 Ganchos Costa Invest (2026-06-19)  
**Patrón de referencia:** `CostaInvestWebCompleta.tsx`

---

## Requisitos obligatorios

Toda Web Desarrollada Completa (Gancho 3 del sistema de 4 ganchos) debe cumplir:

### 1. Hero video/motion AURUM — obligatorio

```tsx
// imports
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

// refs + efecto GSAP
const headlineRef = useRef<HTMLHeadingElement>(null);

useEffect(() => {
  if (!headlineRef.current) return;
  const text = new SplitType(headlineRef.current, { types: 'words' });
  const ctx = gsap.context(() => {
    gsap.from(text.words ?? [], {
      yPercent: 100, rotate: 4, opacity: 0,
      duration: 1.4, stagger: 0.05, ease: 'expo.out', delay: 0.4,
    });
  });
  return () => { text.revert(); ctx.revert(); };
}, []);

// JSX hero
<section id="hero" className="relative min-h-screen overflow-hidden flex items-center">
  <video
    autoPlay muted loop playsInline preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ opacity: 0.42 }}
  >
    <source src="/VIDEO_AURUM_HEROWEB.mp4" type="video/mp4" />
  </video>
  {/* Fallback visible mientras el vídeo carga */}
  <img
    src="/[cliente]/place-to-live.jpg"
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-cover opacity-35"
    style={{ zIndex: -1 }}
  />
  <h1
    ref={headlineRef}
    className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.92] max-w-3xl overflow-hidden"
  >
    Titular del cliente
  </h1>
</section>
```

### 2. Estructura mínima — 8 secciones

| # | Sección | Notas |
|---|---------|-------|
| 1 | Hero video/motion | Obligatorio, véase arriba |
| 2 | Diagnóstico / Score CRM | Score numérico + prioridad + fortalezas + oportunidades |
| 3 | Before/After o Comparativa web actual | `<CurrentWebsiteComparisonSection>` reutilizable |
| 4 | Experiencia Visual de Propiedad | `<VisualExperienceBannerSection>` con iframe EV o preview |
| 5 | Galería de propiedades / activos | Mínimo 3 imágenes del cliente |
| 6 | Mercados internacionales o Servicios | 4 bloques con narrativa comercial |
| 7 | Proceso / Pasos | 4-5 pasos numerados |
| 8 | Contacto alta intención | `<HighIntentContactSection>` WhatsApp primario |

### 3. Reglas de contenido

- Sin copiar textos, imágenes ni datos de otro cliente.
- Sin placeholders críticos visibles: si falta un asset, usar fallback controlado (degradado, estructura vacía, imagen genérica).
- Responsive mobile-first con Tailwind. Sin overflow horizontal.
- `<Helmet>` con `noindex, nofollow` (es preview privada).

---

## Arquitectura de URLs (sistema de 4 ganchos)

| Gancho | Ruta AURUM | Rubik (interno) |
|--------|-----------|-----------------|
| G1 — EV | `/visual-experience/[cliente]` | iframe → Rubik EV `?embed=1` |
| G2 — Landing | `/[cliente]` | — |
| G3 — Web Completa | `/[cliente]-web-completa` | — |
| G4 — Pack Banners | `/banners/[cliente]` | iframe → `banner-vertical.html` / `banner-horizontal.html` |

### Regla de iframe para banners

Los wrappers AURUM deben apuntar al archivo `.html` directamente, **no** a la URL de rewrite:

```tsx
// CORRECTO — resuelve imports ES modules relativos correctamente
src="https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/[cliente]/banner-vertical.html"

// INCORRECTO — los imports relativos resuelven contra la URL del rewrite → 404
src="https://rubik-sota-director-de-orquesta.vercel.app/dynamic-motion-banner/[cliente]/banner-pack/vertical/"
```

---

## Reglas de CRM

- `url` principal siempre AURUM (`aurum-properties-boutique.vercel.app/*`).
- Rubik solo en `embedUrl` (campo interno para iframe).
- `status: "generated"` solo si la URL responde 200 en producción.
- No inventar URLs. No copiar URLs de otro cliente.
- `/gesture-lab/` nunca como URL cliente-facing.

---

## Clientes activos con patrón validado

| Cliente | Web Completa | EV | Landing | Banners |
|---------|-------------|-----|---------|---------|
| Costa Invest | `/costa-invest-web-completa` ✓ | `/visual-experience/costa-invest` ✓ | `/costa-invest` ✓ | `/banners/costa-invest` ✓ |
| Casas y Mar | `/casas-y-mar` (landing avanzada) | embed en landing ✓ | — | — |
