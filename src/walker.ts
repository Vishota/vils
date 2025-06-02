import fs from 'fs-extra';
import path from 'path';
import { Config } from './types';

export interface FileEntry {
    relativePath: string;
    content: string | { error: string };
}

export async function walk(config: Config): Promise<FileEntry[]> {
    const results: FileEntry[] = [];
    let hadError = false;

    async function recurse(dir: string) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            const rel = path.relative(config.source, full) || entry.name;
            if (config.ignore && config.ignore.some(pattern =>
                typeof pattern === 'string' ? rel.startsWith(pattern) : pattern.test(rel)
            )) continue;

            if (entry.isDirectory()) {
                await recurse(full);
            } else if (entry.isFile()) {
                try {
                    const data = await fs.readFile(full, 'utf-8');
                    results.push({ relativePath: rel, content: data });
                } catch (err: any) {
                    hadError = true;
                    results.push({ relativePath: rel, content: { error: err.message } });
                }
            }
        }
    }

    await recurse(path.resolve(config.source));
    if (hadError) process.exitCode = 1;
    return results;
}
