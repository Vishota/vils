import readline from 'readline';

export function escapeHTML(str: string): string {
    return str.replace(/[&<>"']/g, tag => {
        const map: any = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        return map[tag] || tag;
    });
}

export async function promptConfirm(message: string): Promise<boolean> {
    return new Promise(resolve => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question(message, answer => {
            rl.close();
            resolve(answer.trim().toLowerCase().startsWith('y'));
        });
    });
}
