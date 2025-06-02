import { Config, CLIArgs } from './types';
import path from 'path';
import fs from 'fs-extra';

export function loadConfig(cli: CLIArgs): Config {
    const cwd = process.cwd();
    let configPath: string | undefined;
    if (cli.config) {
        configPath = path.isAbsolute(cli.config) ? cli.config : path.join(cwd, cli.config);
    } else {
        const candidates = ['vils.config.ts', 'vils.config.js', 'vils.config.mjs', 'vils.config.cjs'];
        for (const name of candidates) {
            const full = path.join(cwd, name);
            if (fs.existsSync(full)) { configPath = full; break; }
        }
    }
    let cfg: Partial<Config> = {};
    if (configPath) {
        const ext = path.extname(configPath);
        if (ext === '.ts') {
            const tsNode = require('ts-node');
            tsNode.register({ transpileOnly: true });
            cfg = require(configPath).default;
        } else {
            cfg = require(configPath).default || require(configPath);
        }
    }
    const source = cli._[0] && typeof cli._[0] === 'string' ? (cli._[0] as string) : cfg.source || '.';
    const merged: Config = {
        source,
        log: cli.log ?? cfg.log ?? false,
        file: cli.file ?? cfg.file,
        ignore: cli.ignore.length
            ? cli.ignore
            : (cfg.ignore ?? ['node_modules', 'dist', '.git', 'package-lock.json', /^vils\..+$/]),
        format: cli.format ?? cfg.format ?? 'md',
        confirm: cfg.confirm ?? false
    };
    return merged;
}
