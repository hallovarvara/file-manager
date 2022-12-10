import { isAbsolute } from 'path';
import { stat } from 'fs';
import { getCommandAttributes } from '../lib/utils/get-command-attributes.js';
import { getNewPath } from '../lib/utils/get-new-path.js';
import { write } from '../lib/utils/write.js';
import { removeQuotesFromPath } from '../lib/utils/remove-quotes-from-path.js';
import { throwError } from '../lib/utils/throw-error.js';
import { setCurrentPath } from '../lib/utils/handle-current-path.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { IS_MAC_OS } from '../lib/constants/index.js';
import { currentPath } from '../lib/utils/handle-current-path.js';

export const executeCd = (command) => {
    const [, pathAdditionRaw] = getCommandAttributes(command);
    const pathAddition = removeQuotesFromPath(pathAdditionRaw);

    const isWindowsDiskPassed =
        /^[a-zA-Z]:\\$/.test(pathAddition) && !IS_MAC_OS;

    const newPath = getNewPath(
        pathAddition,
        isAbsolute(pathAddition) || isWindowsDiskPassed,
    );

    if (currentPath === newPath) {
        write(
            pathAddition === '..' || pathAddition === '../'
                ? 'No way back, you are in root directory'
                : 'Type correct path after "cd" command',
        );

        showCurrentPath();

        return;
    }

    stat(newPath, (error, stats) => {
        if (error || !stats.isDirectory()) {
            throwError({
                isInputInvalid: true,
                path: newPath,
                error: !!error
                    ? error
                    : { message: `"${newPath}" is not directory` },
                showCurrentPath: true,
            });
        } else {
            setCurrentPath(newPath);
            showCurrentPath();
        }
    });
};
