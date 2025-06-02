import { IFormatter } from './Formatter';
import { FileEntry } from '../walker';

export class PlainFormatter implements IFormatter {
    format(entries: FileEntry[]): string {
        return entries.map(e => {
            if (typeof e.content === 'string') return `// ${e.relativePath}\n${e.content}`;
            return `// ${e.relativePath}\n<vils unable to read: ${e.content.error}>`;
        }).join('\n\n');
    }
}
