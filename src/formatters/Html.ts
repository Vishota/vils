import { IFormatter } from './Formatter';
import { FileEntry } from '../walker';
import { escapeHTML } from '../utils';

export class HtmlFormatter implements IFormatter {
    format(entries: FileEntry[]): string {
        const header = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>vils Output</title></head><body><pre>vils@${require('../../package.json').version}</pre>`;
        const footer = `<pre><a href="https://github.com/Vishota/vils">https://github.com/Vishota/vils/</a></pre></body></html>`;
        const body = entries.map(e => {
            const safeName = escapeHTML(e.relativePath);
            if (typeof e.content === 'string') {
                const safeContent = escapeHTML(e.content);
                return `<h2>${safeName}</h2><pre>${safeContent}</pre>`;
            } else {
                return `<h2>${safeName}</h2><pre>&lt;vils unable to read: ${escapeHTML(e.content.error)}&gt;</pre>`;
            }
        }).join('');
        return header + body + footer;
    }
}
