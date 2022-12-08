import { resolvePathWithExistenceCheck } from '../lib/utils/resolve-path-with-existence-check.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';

export const goUpAndGetPath = (currentPath) => {
    const newPath = resolvePathWithExistenceCheck(currentPath, '..');
    showCurrentPath(newPath);
    return newPath;
};
