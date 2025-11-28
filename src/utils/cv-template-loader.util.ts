import { readFileSync } from 'fs';
import { join } from 'path';

export class CVTemplateLoader {
    private static cssCache: string | null = null;

    //Load CV CSS template (cached after first load)
    static loadCSS(): string {
        if (this.cssCache) {
            return this.cssCache;
        }

        try {
            const cssPath = join(__dirname, '..', 'utils', 'cv-template.css');
            this.cssCache = readFileSync(cssPath, 'utf-8');
            return this.cssCache;
        } catch (error) {
            console.error('Failed to load CV CSS template:', error);
            return ''; // Return empty string as fallback
        }
    }

    //Clear CSS cache (useful for development/hot reload)
    static clearCache(): void {
        this.cssCache = null;
    }
}
