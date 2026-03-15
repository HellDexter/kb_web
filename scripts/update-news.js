import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Minimal RSS parser approach to avoid heavy dependencies
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCES = [
    { name: 'NÚKIB', url: 'https://portal.nukib.gov.cz/rss.xml', type: 'cs' },
    { name: 'CSIRT.cz', url: 'https://csirt.cz/feed/', type: 'cs' },
    { name: 'CISA', url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml', type: 'en' }
];

const OUTPUT_PATH = path.join(__dirname, '../public/data/news.json');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) JCKB-Scraper/1.0' }
        }, (res) => {
            res.setEncoding('utf8');
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function stripHtml(html) {
    if (!html) return "";
    
    // 1. Remove CDATA wrappers if present
    let text = html.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');

    // 2. Unescape common HTML entities
    text = text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—');

    // 3. Replace structural tags with newlines before stripping
    text = text
        .replace(/<(?:p|div|br|h[1-6]|tr|li)[^>]*>/gi, '\n')
        .replace(/<\/p>|<\/div>|<\/h[1-6]>|<\/tr>|<\/li>/gi, '\n');

    // 4. Agresively remove ALL remaining HTML tags
    text = text.replace(/<[^>]*>/g, ' ');

    // 5. Remove specific CISA/RSS metadata junk
    const junkPatterns = [
        /View CSAF/gi,
        /Expand All \+/gi,
        /intdot\s*\/\s*/gi,
        /Detailed Information/gi
    ];
    
    junkPatterns.forEach(pattern => {
        text = text.replace(pattern, '');
    });

    // 6. Fix specific broken words due to RSS formatting
    text = text
        .replace(/fol\s+low\s+ing/gi, 'following')
        .replace(/be\s+low/gi, 'below')
        .replace(/vul\s+ner\s+a\s+bil\s+i\s+ty/gi, 'vulnerability')
        .replace(/vul\s+ner\s+a\s+bil\s+i\s+ties/gi, 'vulnerabilities')
        .replace(/ad\s+vi\s+so\s+ry/gi, 'advisory')
        .replace(/in\s+for\s+ma\s+tion/gi, 'information');

    // 7. Normalize whitespace
    text = text
        .replace(/[ \t]+/g, ' ') 
        .replace(/\n\s*\n\s*\n+/g, '\n\n') 
        .replace(/^\s+|\s+$/g, '');
    
    // 8. Filter redundant headers
    const lines = text.split('\n');
    const filteredLines = lines.filter(line => {
        const trimmed = line.trim().toLowerCase();
        return !['summary', 'background', 'vulnerabilities', 'details'].includes(trimmed);
    });

    return filteredLines.join('\n').trim();
}

function parseRss(xml, sourceName) {
    const items = [];
    // More robust regex for items, handles namespaces and case
    const itemRegex = /<(?:item|ITEM)>([\s\S]*?)<\/(?:item|ITEM)>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
        const itemContent = match[1];
        
        const getTag = (tag) => {
            // Fix: Fixed RegExp constructor call
            const regex = new RegExp(`<${tag}[\\s\\S]*?>([\\s\\S]*?)<\\/${tag}>`, 'i');
            const m = itemContent.match(regex);
            if (!m) return "";
            return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
        };

        const title = getTag('title');
        const description = getTag('description');
        const pubDate = getTag('pubDate') || getTag('dc:date') || "";
        const link = getTag('link');

        if (!title) continue;

        const cleanTitle = stripHtml(title);
        const cleanDesc = stripHtml(description);

        // Rule: Only news from last 30 days
        const newsDate = new Date(pubDate);
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        
        if (newsDate < monthAgo) {
            continue;
        }

        let type = 'info';
        const lowerTitle = cleanTitle.toLowerCase();
        if (lowerTitle.includes('varování') || lowerTitle.includes('hrozba') || lowerTitle.includes('incident') || lowerTitle.includes('warning') || lowerTitle.includes('vulnerability')) {
            type = 'warning';
        }

        items.push({
            id: `${sourceName.toLowerCase()}-${items.length}-${Math.random().toString(36).slice(2)}`,
            title: cleanTitle,
            desc: cleanDesc.slice(0, 160) + (cleanDesc.length > 160 ? '...' : ''),
            fullDesc: cleanDesc,
            date: newsDate.toLocaleDateString(sourceName === 'CISA' ? 'en-US' : 'cs-CZ'),
            link: link.replace(/&amp;/g, '&').trim(),
            type,
            source: sourceName
        });
    }
    
    if (items.length === 0) {
        console.log(`⚠️ Warning: No items found for ${sourceName} (within 30 days limit).`);
    }
    return items;
}

async function main() {
    console.log('🚀 Starting news aggregation...');
    
    // Ensure data directory exists
    const dataDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const allNews = [];

    for (const source of SOURCES) {
        try {
            console.log(`📡 Fetching ${source.name}...`);
            const xml = await fetchUrl(source.url);
            const items = parseRss(xml, source.name);
            console.log(`✅ Found ${items.length} items from ${source.name}`);
            allNews.push(...items);
        } catch (error) {
            console.error(`❌ Error fetching ${source.name}:`, error.message);
        }
    }

    // Sort by date (naive but sort of works for RSS format if strings are comparable-ish, 
    // better to parse date but keep it simple as fallback)
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allNews, null, 2));
    console.log(`🎉 Success! Saved ${allNews.length} news items to ${OUTPUT_PATH}`);
}

main();
