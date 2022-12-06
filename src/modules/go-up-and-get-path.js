import { resolvePath } from '../lib/utils/resolve-path.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';

export const goUpAndGetPath = (currentPath) => {
    const newPath = resolvePath(currentPath, '..');
    showCurrentPath(newPath);
    return newPath;
};
