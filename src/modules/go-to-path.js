import { isAbsolute } from 'path';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { getCommandAttributes } from '../lib/utils/get-command-attributes.js';
import { resolvePathWithExistenceCheck } from '../lib/utils/resolve-path-with-existence-check.js';
import { write } from '../lib/utils/write.js';
import { removeQuotesFromPath } from '../lib/utils/remove-quotes-from-path.js';
import { IS_MAC_OS } from '../lib/constants/index.js';

export const goToPath = ({ command, currentPath }) => {
    const [, pathAdditionRaw] = getCommandAttributes(command);
    const pathAddition = removeQuotesFromPath(pathAdditionRaw);

    const isWindowsDiskPassed =
        /^[a-zA-Z]:\\$/.test(pathAddition) && !IS_MAC_OS;

    const newPath = resolvePathWithExistenceCheck(
        currentPath,
        pathAddition,
        isAbsolute(pathAddition) || isWindowsDiskPassed,
    );

    if (currentPath === newPath) {
        write(
            pathAddition === '..' || pathAddition === '../'
                ? 'No way back, you are in root directory'
                : 'Type correct path after "cd" command',
        );
    } else {
        currentPath = newPath;
    }

    showCurrentPath(currentPath);

    return currentPath;
};
