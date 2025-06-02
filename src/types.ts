export interface CLIArgs {
    _: (string | number)[];
    log: boolean;
    file?: string;
    config?: string;
    ignore: string[];
    format: string;
    y: boolean;
    info: boolean;
    source?: string;
}

export interface Config {
    source: string;
    log?: boolean;
    file?: string;
    ignore?: (string | RegExp)[];
    format?: string;
    confirm?: boolean;
}
