import { isAbsolute, resolve } from 'path';
import { removeQuotesFromPath } from './remove-quotes-from-path.js';

export const resolvePath = (currentPath, path) => {
    if (!path) {
        return currentPath || '';
    }

    const normalisedPath = removeQuotesFromPath(path);

    return isAbsolute(normalisedPath)
        ? normalisedPath
        : resolve(currentPath, normalisedPath);
};
