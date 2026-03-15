# Instrukce pro IT oddělení JCKB - Automatizace aktualit

Tento dokument popisuje, jak zprovoznit automatické stahování novinek a bezpečnostních hrozeb na serveru (Hetzner).

## 1. Požadavky
- **Node.js**: verze 18 nebo vyšší (doporučeno 20+).
- **npm**: pro instalaci závislostí.

## 2. Instalace
Scraper je navržen tak, aby byl co nejjednodušší a nevyžadoval složité databáze.

1. Naklonujte repozitář (nebo zkopírujte soubory) na server.
2. V kořenovém adresáři spusťte:
   ```bash
   npm install
   ```
   *Poznámka: Scraper používá vestavěné Node.js moduly, takže nevyžaduje mnoho externích balíčků.*

## 3. Ruční spuštění a testování
Pro ověření funkčnosti spusťte:
```bash
node scripts/update-news.js
```
Skript by měl vypsat zdroje, ze kterých stahuje (NÚKIB, CSIRT, CISA), a vytvořit soubor `public/data/news.json`.

## 4. Nastavení automatizace (Cron)
Aby byly aktuality stále čerstvé, doporučujeme nastavit spouštění každou hodinu přes Cron.

1. Otevřete editor cron tabulky:
   ```bash
   crontab -e
   ```
2. Přidejte následující řádek (upravte cestu k projektu):
   ```bash
   0 * * * * cd /home/user/jckb && node scripts/update-news.js >> /home/user/jckb/scraper.log 2>&1
   ```

## 5. Jak to funguje
- **Zdroje**: Skript čte RSS feedy definované v `scripts/update-news.js`.
- **Parsing**: Používá regulární výrazy pro zpracování XML a čištění HTML balastu.
- **Detekce hrozeb**: Skript automaticky detekuje klíčová slova jako "vulnerability", "warning" nebo "incident" a přiřazuje jim typ `warning` (červená barva v UI).
- **Časové omezení**: Stahují se pouze novinky za posledních 30 dní, aby soubor `news.json` nebyl příliš velký.

## 6. Údržba
Změna zdrojů se provádí v poli `SOURCES` přímo ve skriptu `scripts/update-news.js`.
