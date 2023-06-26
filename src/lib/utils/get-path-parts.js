import { throwError } from './throw-error.js';
import { ERROR_INCORRECT_PATH } from '../constants/errors.js';

export const getPathParts = (path) => {
    if (typeof path !== 'string' || path === '') {
        throwError({
            isInputInvalid: true,
            showCurrentPath: true,
            error: {
                message: ERROR_INCORRECT_PATH,
            },
        });
        return;
    }

    if (path.includes('/') && path.includes('\\')) {
        throwError({
            isInputInvalid: true,
            showCurrentPath: true,
            error: {
                message: `Path "${path}" has two types of separators (\\ and /), please input correct path`,
            },
        });
        return;
    }

    return path.split(path.includes('/') ? '/' : '\\');
};
