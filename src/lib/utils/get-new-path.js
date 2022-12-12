import { resolve } from 'path';
import { isString } from './is-string.js';
import { currentPath } from './handle-current-path.js';
import { sep } from 'path';
import { throwError } from './throw-error.js';

export const getNewPath = (newPart = '', isAbsolute = false) => {
    let newPath = currentPath;

    if (!isAbsolute) {
        const isCurrentPathIncorrect = !isString(currentPath);

        if (isCurrentPathIncorrect || !isString(newPart)) {
            return isCurrentPathIncorrect ? '' : currentPath;
        }

        newPath = resolve(currentPath, newPart);
    } else {
        newPath = newPart;
    }

    if (newPath.replaceAll(sep, '') === '') {
        return '';
    }

    return newPath.length > 1 && newPath[newPath.length - 1] === sep
        ? newPath.slice(0, -1)
        : newPath;
};
