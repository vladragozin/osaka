import { randomInt } from "crypto";

export class RandomFile {
    private items: string[];
    private availableItems = new Set<string>();

    public constructor(content: string, delimeter: RegExp) {
        const items = new Array<string>();
        const lines = content.split(delimeter);
        
        for(const line of lines) {
            let text = line.trimEnd();

            // Skip blank lines
            if (text.length == 0) {
                continue;
            }

            // Skip comments 
            if (text.startsWith('#')) {
                continue;
            }

            // Skip multi-lined entries 
            if (text.includes('\n')) {
                continue;
            }

            // Replace multiple spaces with single space
            text = text.replace(/\s+/g, ' ');
            
            // Skip lines that are too long
            if (text.length >= 2000) {
                continue;
            }
            
            items.push(text);
        }

        this.items = items;
        this.availableItems = new Set(items);
    }

    public reset(): void {
        this.availableItems = new Set(this.items);
    }

    public next(): string {
        if (this.availableItems.size == 0) {
            this.reset();
        }

        const index = randomInt(0, this.availableItems.size - 1);
        const line = [...this.availableItems][index];
        this.availableItems.delete(line);

        return line;
    }
}