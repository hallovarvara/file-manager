import { resolve } from 'path';
import { isString } from './is-string.js';
import { getCurrentPath } from './handle-current-path.js';
import { sep } from 'path';

export const getNewPath = (newPart = '', isAbsolute = false) => {
    let newPath = getCurrentPath();

    if (!isAbsolute) {
        const isCurrentPathIncorrect = !isString(getCurrentPath());

        if (isCurrentPathIncorrect || !isString(newPart)) {
            return isCurrentPathIncorrect ? '' : getCurrentPath();
        }

        newPath = resolve(getCurrentPath(), newPart);
    } else {
        newPath = newPart;
    }

    if (newPath.replaceAll(sep, '') === '') {
        return `${sep}`;
    }

    return newPath.length > 1 && newPath[newPath.length - 1] === sep
        ? newPath.slice(0, -1)
        : newPath;
};
