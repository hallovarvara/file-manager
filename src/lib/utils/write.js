import { EOL } from 'os';
import { isString } from './is-string.js';

export const write = (str = '') => {
    if (!isString(str)) {
        return;
    }

    process.stdout.write(`${str}${EOL}${EOL}`);
};
