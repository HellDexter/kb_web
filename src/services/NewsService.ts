export interface NewsItem {
    id: string;
    title: string;
    desc: string;
    fullDesc?: string;
    date: string;
    link: string;
    type: 'warning' | 'info' | 'event';
    source: 'NÚKIB' | 'CISA' | 'CSIRT.cz' | 'OTHER';
}

class NewsService {
    private readonly PROXY_SOURCES = [
        { name: 'NÚKIB' as const, url: 'https://portal.nukib.gov.cz/rss.xml' },
        { name: 'CSIRT.cz' as const, url: 'https://csirt.cz/feed/' },
        { name: 'CISA' as const, url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml' }
    ];

    async fetchAllNews(): Promise<NewsItem[]> {
        try {
            // Priority 1: Load pre-scraped news from our own server (Variant 1)
            const response = await fetch(`/data/news.json?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    console.log("✅ News loaded from local JSON");
                    return data;
                }
            }
        } catch (error) {
            console.warn("Local news.json not found, falling back to live proxy...");
        }

        // Priority 2: Fallback to live RSS proxy (Variant 2 - for testing/development)
        try {
            console.log("📡 Fetching live news via proxy...");
            return await this.fetchLiveNewsFromProxy();
        } catch (proxyError) {
            console.error("Error loading news from proxy:", proxyError);
            return [];
        }
    }

    private async fetchLiveNewsFromProxy(): Promise<NewsItem[]> {
        const allItems: NewsItem[] = [];
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        for (const source of this.PROXY_SOURCES) {
            try {
                // Using rss2json.com as a public proxy for RSS feed to JSON conversion
                const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`;
                const response = await fetch(proxyUrl);
                if (!response.ok) continue;

                const data = await response.json();
                if (data.status !== 'ok') continue;

                const mappedItems: NewsItem[] = data.items
                    .filter((item: any) => new Date(item.pubDate) > monthAgo)
                    .map((item: any, index: number) => {
                        const cleanContent = this.stripHtml(item.content || item.description || "");
                        const title = this.stripHtml(item.title);
                        
                        let type: 'warning' | 'info' = 'info';
                        const lowerTitle = title.toLowerCase();
                        if (lowerTitle.includes('varování') || lowerTitle.includes('hrozba') || lowerTitle.includes('warning') || lowerTitle.includes('vulnerability')) {
                            type = 'warning';
                        }

                        return {
                            id: `live-${source.name}-${index}`,
                            title: title,
                            desc: cleanContent.slice(0, 160) + (cleanContent.length > 160 ? '...' : ''),
                            fullDesc: cleanContent,
                            date: new Date(item.pubDate).toLocaleDateString('cs-CZ'),
                            link: item.link,
                            type: type,
                            source: source.name
                        };
                    });
                
                allItems.push(...mappedItems);
            } catch (e) {
                console.error(`Failed to fetch ${source.name} via proxy`, e);
            }
        }

        // Sort by date
        return allItems.sort((a, b) => {
            const dateA = new Date(a.date.split('.').reverse().join('-'));
            const dateB = new Date(b.date.split('.').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
        });
    }

    private stripHtml(html: string): string {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        let text = doc.body.textContent || "";
        return text.replace(/\s+/g, ' ').trim();
    }
}

export const newsService = new NewsService();
