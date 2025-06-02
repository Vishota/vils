import { FileEntry } from '../walker';
import { Config } from '../types';

export interface IFormatter {
    format(entries: FileEntry[], config: Config): string;
}
