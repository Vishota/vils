import { IFormatter } from './Formatter';
import { FileEntry } from '../walker';

export class JsonFormatter implements IFormatter {
    format(entries: FileEntry[]): string {
        return JSON.stringify(entries.map(e => ({
            path: e.relativePath,
            content: typeof e.content === 'string' ? e.content : `<vils unable to read: ${e.content.error}>`
        })), null, 2);
    }
}
