---
layout: home

hero:
  name: Mezmer
  text: Predictable UI For Enterprise React
  tagline: A minimal, contract-driven component kit built for fast delivery with clean APIs, strong accessibility, and AI-ready structure.
  image:
    src: /mezmer-hero-diagram.svg
    alt: Mezmer ecosystem diagram
  actions:
    - theme: brand
      text: Get Started
      link: /INSTALLATION
    - theme: alt
      text: Components
      link: /components/
    - theme: alt
      text: Architecture
      link: /ARCHITECTURE

features:
  - icon: '🧩'
    title: Contract First
    details: Every public component is backed by machine-readable contracts to keep API, docs, and behavior aligned.
  - icon: '♿'
    title: Accessible By Default
    details: Keyboard support, role semantics, and interaction guarantees are expected and tested.
  - icon: '🎨'
    title: Theme Ready
    details: Token-driven styling with predictable overrides and multiple packaged themes.
  - icon: '🤖'
    title: AI Workflow Native
    details: Built for agent-assisted delivery with structure and validation, not prompt-only conventions.
  - icon: '🧪'
    title: Test Backed
    details: Vitest plus targeted component testing workflows keep behavior stable during changes.
  - icon: '📦'
    title: Publishable Library
    details: ESM output, typed APIs, and explicit package boundaries for real-world consumer apps.
---

<section class="hero-band">
  <div class="hero-band__left">
    <p class="hero-band__eyebrow">Trusted Building Blocks</p>
    <p class="hero-band__copy">
      Compose production-ready pages with domain-neutral APIs instead of project-specific one-offs.
    </p>
  </div>
  <div class="hero-band__right">
    <a href="/INSTALLATION">Install Guide</a>
    <a href="/MCP-SERVER">MCP Workflow</a>
  </div>
</section>

<section class="landing-shell">
  <div class="landing-grid">
    <article class="landing-card landing-card--primary">
      <p class="landing-eyebrow">Quick Install</p>
      <pre><code>pnpm add @tarikukebede/mezmer</code></pre>
      <p>Import once and start composing with typed, reusable components.</p>
      <div class="landing-links">
        <a href="/INSTALLATION">Installation</a>
        <a href="/components/">Component Docs</a>
      </div>
    </article>
    <article class="landing-card">
      <p class="landing-eyebrow">MCP Included</p>
      <h3>Repository-local AI context</h3>
      <p>
        Contracts, docs, and validation tools are available through the built-in MCP server for deterministic agent workflows.
      </p>
      <a href="/MCP-SERVER">Read MCP server guide</a>
    </article>
  </div>
</section>

## Example

```tsx
import { Input } from '@tarikukebede/mezmer';
import '@tarikukebede/mezmer/styles.css';
import '@tarikukebede/mezmer/themes/default.css';

export function Example() {
  return <Input name="email" value="" onChange={() => {}} />;
}
```

Mezmer is built on React, TypeScript, shadcn/ui patterns, and tokenized styling conventions that scale across apps.

For architecture details and the complete stack rationale, see [Architecture](/ARCHITECTURE).

<style scoped>
:global(.VPHero) {
  margin-top: 0.6rem;
}

:global(.VPHero .container) {
  max-width: 1120px;
}

:global(.VPHero.has-image .container) {
  align-items: center;
  column-gap: 2.25rem;
}

:global(.VPHero.has-image .image) {
  transform: none;
}

:global(.VPHero.has-image .image-container) {
  width: min(35rem, 45vw);
  height: auto;
}

:global(.VPHero.has-image .image-src) {
  width: 100%;
  height: auto;
}

:global(.VPHero.has-image .image-bg) {
  transform: none;
  filter: blur(56px);
}

:global(.VPHero .name) {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  letter-spacing: -0.02em;
}

:global(.VPHero .text) {
  font-size: clamp(2.1rem, 4.8vw, 3.9rem);
  letter-spacing: -0.04em;
  line-height: 1.02;
  max-width: 13ch;
}

:global(.VPHero .tagline) {
  max-width: 62ch;
  font-size: 1.02rem;
}

:global(.VPHero .actions) {
  gap: 0.6rem;
}

:global(.VPHero .action .VPButton) {
  border-radius: 999px;
  min-height: 2.5rem;
}

.hero-band {
  margin: 0.35rem 0 1.2rem;
  padding: 0.95rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--vp-c-brand-1) 11%, transparent), transparent 43%),
    var(--vp-c-bg-soft);
}

.hero-band__left {
  min-width: 0;
}

.hero-band__eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  font-weight: 700;
}

.hero-band__copy {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-2);
}

.hero-band__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.hero-band__right a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.38rem 0.72rem;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-code-block-bg);
}

.landing-shell {
  margin: 0 0 2rem;
  display: grid;
  gap: 1rem;
}

.landing-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.landing-card {
  grid-column: span 6;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1rem;
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent), transparent 45%),
    var(--vp-c-bg-soft);
}

.landing-card--primary {
  grid-column: span 6;
}

.landing-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.landing-card h3 {
  margin: 0.35rem 0 0.45rem;
  font-size: 1.02rem;
}

.landing-card p {
  margin: 0.4rem 0 0;
  color: var(--vp-c-text-2);
}

.landing-card pre {
  margin: 0.55rem 0 0;
}

.landing-links {
  margin-top: 0.75rem;
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

:global(.VPFeature) {
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(
    170deg,
    color-mix(in srgb, var(--vp-c-brand-soft) 22%, transparent),
    var(--vp-c-bg-soft)
  );
}

@media (max-width: 820px) {
  :global(.VPHero.has-image .image-container) {
    width: min(30rem, 96vw);
  }

  :global(.VPHero .text) {
    max-width: 16ch;
  }

  .hero-band {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-band__right {
    justify-content: flex-start;
  }

  .landing-card,
  .landing-card--primary {
    grid-column: 1 / -1;
  }
}
</style>
