import { EOL } from 'os';
import { isString } from './is-string.js';
import { UNKNOWN_USERNAME } from '../constants/index.js';

export const getPartingPhrase = (username = '') =>
    `${EOL}Thank you for using File Manager, ${
        isString(username) && username.length > 0
            ? username.trim()
            : UNKNOWN_USERNAME
    }, goodbye!`;
