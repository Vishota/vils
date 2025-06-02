import { IFormatter } from './Formatter';
import { FileEntry } from '../walker';

export class TreeFormatter implements IFormatter {
    format(entries: FileEntry[]): string {
        const tree: { [key: string]: any } = {};
        for (const e of entries) {
            const parts = e.relativePath.split(/[\\/]/);
            let node = tree;
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (!node[part]) node[part] = i === parts.length - 1 ? null : {};
                if (node[part] !== null) node = node[part];
            }
        }
        function render(node: any, prefix = ''): string {
            return Object.entries(node).map(([name, child], idx, arr) => {
                const isLast = idx === arr.length - 1;
                const pointer = isLast ? '└── ' : '├── ';
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                if (child === null) return `${prefix}${pointer}${name}`;
                return `${prefix}${pointer}${name}\n${render(child, newPrefix)}`;
            }).join('\n');
        }
        return render(tree);
    }
}
