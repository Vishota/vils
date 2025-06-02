import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loadConfig } from './config';
import { walk } from './walker';
import { MarkdownFormatter } from './formatters/Markdown';
import { HtmlFormatter } from './formatters/Html';
import { TreeFormatter } from './formatters/Tree';
import { JsonFormatter } from './formatters/Json';
import { PlainFormatter } from './formatters/Plain';
import fs from 'fs-extra';
import path from 'path';
import { promptConfirm } from './utils';
import { Config, CLIArgs } from './types';

async function main() {
    const startTime = Date.now();

    const argv = yargs(hideBin(process.argv))
        .scriptName('vils')
        .usage('$0 [source] [options]')
        .option('log', {
            alias: 'l',
            type: 'boolean',
            description: 'Log to console'
        })
        .option('file', {
            alias: 'f',
            type: 'string',
            description: 'Output file'
        })
        .option('config', {
            alias: 'c',
            type: 'string',
            description: 'Config file path'
        })
        .option('ignore', {
            alias: 'i',
            array: true,
            type: 'string',
            description: 'Ignore patterns',
            default: []         // <-- добавляем default: []
        })
        .option('format', {
            alias: 'F',
            type: 'string',
            description: 'Format (md, html, tree, json, plain)'
        })
        .option('y', {
            type: 'boolean',
            description: 'Assume yes for confirmations'
        })
        .option('info', {
            type: 'boolean',
            description: 'Show info without executing'
        })
        .help()
        .alias('h', 'help')
        .parseSync() as CLIArgs;

    const config = loadConfig(argv);
    const entries = await walk(config);

    const formatterMap: Record<string, any> = {
        md: MarkdownFormatter,
        markdown: MarkdownFormatter,
        html: HtmlFormatter,
        tree: TreeFormatter,
        json: JsonFormatter,
        plain: PlainFormatter,
        slash: PlainFormatter,
        hash: PlainFormatter
    };
    const fmtKey = (config.format ?? 'md').toLowerCase();
    const FormatterClass = formatterMap[fmtKey] || MarkdownFormatter;
    const formatter = new FormatterClass();

    const output = formatter.format(entries, config);
    const textFormats = ['slash', 'tree', 'plain']
    const outExt = textFormats.includes(fmtKey) ? 'txt' : fmtKey;
    const targetFile = config.file || `vils.${outExt}`;

    if (argv.info) {
        console.log(`Files: ${entries.length}`);
        console.log(`Output file: ${targetFile}`);
        console.log('File tree:');
        console.log(new TreeFormatter().format(entries));
        process.exit(0);
    }

    if (config.confirm && !argv.y) {
        console.log(`Writing ${entries.length} files to "${targetFile}"`);
        console.log(new TreeFormatter().format(entries));
        const ok = await promptConfirm('Continue? (y/n) ');
        if (!ok) process.exit(0);
    }

    if (config.log) console.log(output);

    if (config.file || !config.log) {
        const outPath = path.resolve(process.cwd(), targetFile);
        await fs.writeFile(outPath, output, 'utf-8');

        const lineCount = output.split('\n').length;
        const stats = await fs.stat(outPath);
        const sizeKb = (stats.size / 1024).toFixed(2);
        const fileCount = entries.length;

        const duration = (Date.now() - startTime) / 1000;

        console.log(`${fileCount} files, ${lineCount} lines printed to "${targetFile}" (${sizeKb}Kb) in ${duration.toFixed(3)} seconds.`);
    }


}

main().catch(err => { console.error(err); process.exit(1); });
