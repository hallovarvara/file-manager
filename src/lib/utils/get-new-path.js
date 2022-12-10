import { resolve } from 'path';
import { throwError } from './throw-error.js';
import { isString } from './is-string.js';
import { currentPath } from './handle-current-path.js';

export const getNewPath = (newPart = '', isAbsolute = false) => {
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

    if (newPath.length < 1) {
        throwError({
            isOperationFailed: true,
            error: { message: 'Empty string is not valid path' },
        });
    }

    return newPath;
};
