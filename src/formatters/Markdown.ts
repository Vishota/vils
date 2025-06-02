import { IFormatter } from './Formatter';
import { FileEntry } from '../walker';

export class MarkdownFormatter implements IFormatter {
    format(entries: FileEntry[]): string {
        return entries.map(e => {
            if (typeof e.content === 'string') {
                return `# ${e.relativePath}\n\n\`\`\`\n${e.content}\n\`\`\``;
            } else {
                return `# ${e.relativePath}\n\n\`\`\`\n<vils unable to read: ${e.content.error}>\n\`\`\``;
            }
        }).join('\n\n');
    }
}
