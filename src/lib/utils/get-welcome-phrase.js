import { isString } from './is-string.js';
import { UNKNOWN_USERNAME } from '../constants/index.js';

export const getWelcomePhrase = (username = '') =>
    `Welcome to the File Manager, ${
        isString(username) ? username.trim() : UNKNOWN_USERNAME
    }!`;
