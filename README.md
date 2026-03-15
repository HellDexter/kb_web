# JCKB - Jihočeské centrum kybernetické bezpečnosti

Tento repozitář obsahuje zdrojové kódy moderní Single Page Application (SPA) vytvořené v Reactu (s TypeScriptem) a Vite. Aplikace prezentuje krajský "Kybernetický Štít" Jihočeského kraje a obsahuje mimo jiné dynamické prvky jako je 3D karusel u pracovních nabídek.

## 🚀 Technologie

- **Framework**: React 18 + TypeScript + Vite
- **Stylování**: Tailwind CSS v4
- **Ikony**: Lucide React
- **Animace**: Framer Motion
- **i18n (Vícejazyčnost)**: react-i18next
- **Témata**: Vlastní implementace Light / Dark Mode (`ThemeContext`)

## 🏗️ Architektura a Design

Aplikace byla původně navržena jako více-stránková (multi-page) přes `react-router-dom`, ale následně byla restrukturalizována do moderního **Onepage** rozložení s hladkým scrollováním (Smooth Scroll).
- Aplikace je plně lokalizovaná a běží dvoufázově přes jazykové mutace (`cs`, `en`).
- Navigace funguje přes Hash links (`#sekce`).
- Tlačíto "Dark Mode / Light Mode" a přepínač Jazyka "CZ/EN" jsou nativně umístěné v záhlaví.
- Domovská stránka (Hero section) a Kariéra využívá pokročilých Framer Motion animací včetně dominantního 3D coverflow rolování v bloku otevřených pracovních pozic.

## 🛠️ Instalace a spuštění

Pro lokální běh nebo vývoj potřebujete mít nainstalované prostředí: Node.js (doporučeno min. v18) a `npm`.

1. Klonování repozitáře a instalace závislostí
```bash
npm install
```

2. Spuštění lokálního vývojového serveru (Local Dev Server)
```bash
npm run dev
```

3. Build pro produkční nasazení (dist složka)
```bash
npm run build
```

4. Spuštění Linteru pro kontrolu chyb TS/ESLint
```bash
npm run lint
```

## 📂 Struktura projektu
- `/public/locales`: Jazykové JSON slovníky (`cs`, `en`).
- `/src`
  - `/components`: Globální sdílené komponenty (Navbar, Footer, Section wrappery).
  - `/pages`: Segmenty tvořící jednotlivé bloky na hlavní onepage ploše (`Home.tsx`, `Aktuality.tsx`, `Kariera.tsx`, atd.).
  - `/data`: Datové definice k inzerátům (`jobs.ts`), ke zprávám z aktualit (`news.ts`).
  - `App.tsx`: Sdružuje Navbar, jednotlivé pages, Footer a spravuje kontext tématu.
  - `ThemeContext.tsx`: Poskytuje mechanismus pro přepínání defaultního a tmavého režimu, automaticky rozpoznává systémové preference.
  - `index.css`: Globální styly, import Tailwind CSS, definice palety barev a konfigurace pro dark mode tématiku.

## 📝 Licence
Vývoj je veden pro interní potřeby společnosti JCKB s.r.o.
