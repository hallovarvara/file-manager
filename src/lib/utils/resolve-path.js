import { resolve } from 'path';
import { existsSync } from 'fs';
import { throwError } from './throw-error.js';
import { isString } from './is-string.js';

export const resolvePath = (
    currentPath = '',
    newPart = '',
    isAbsolute = false,
) => {
    let newPath = currentPath;

    if (!isAbsolute) {
        const isCurrentPathIncorrect = !isString(currentPath);

        if (isCurrentPathIncorrect || !isString(newPart)) {
            throwError({
                isOperationFailed: true,
            });
            return isCurrentPathIncorrect ? '' : currentPath;
        }

        newPath = resolve(currentPath, newPart);
    } else {
        newPath = newPart;
    }

    if (!existsSync(newPath) || newPath.length < 1) {
        throwError({ isOperationFailed: true });
        return currentPath;
    }

    return newPath;
};
