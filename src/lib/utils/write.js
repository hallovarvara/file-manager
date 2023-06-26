import { EOL } from 'os';
import { CONSOLE_COLOR } from '../constants/colors.js';
import { isString } from './is-string.js';

export const write = (str = '', color = CONSOLE_COLOR.WHITE) => {
    if (!isString(str)) {
        return;
    }

    process.stdout.write(`\x1b[9${color}m${str}${EOL}${EOL}\x1b[0m`);
};
