import { isAbsolute } from 'path';
import { stat } from 'fs';
import { getNewPath } from '../lib/utils/get-new-path.js';
import { removeQuotesFromPath } from '../lib/utils/remove-quotes-from-path.js';
import { throwError } from '../lib/utils/throw-error.js';
import { getNoDirectoryMessage } from '../lib/utils/get-no-directory-message.js';
import { setCurrentPath } from '../lib/utils/handle-current-path.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { IS_MAC_OS } from '../lib/constants/index.js';
import { currentPath } from '../lib/utils/handle-current-path.js';

import {
    ERROR_INCORRECT_PATH,
    ERROR_ROOT_DIRECTORY,
} from '../lib/constants/errors.js';

export const executeCd = (args) => {
    const [pathAdditionRaw] = args;
    const pathAddition = removeQuotesFromPath(pathAdditionRaw);

    const isWindowsDiskPassed =
        /^[a-zA-Z]:\\$/.test(pathAddition) && !IS_MAC_OS;

    const newPath = getNewPath(
        pathAddition,
        isAbsolute(pathAddition) || isWindowsDiskPassed,
    );

    if (!newPath) {
        throwError({
            isInputInvalid: true,
            showCurrentPath: true,
            error: { message: ERROR_INCORRECT_PATH },
        });

        return;
    }

    if (currentPath.toLowerCase() === newPath.toLowerCase()) {
        throwError({
            isOperationFailed: true,
            showCurrentPath: true,
            error: {
                message:
                    pathAddition === '..' || pathAddition === '../'
                        ? ERROR_ROOT_DIRECTORY
                        : ERROR_INCORRECT_PATH,
            },
        });

        return;
    }

    stat(newPath, (error, stats) => {
        if (error || !stats.isDirectory()) {
            throwError({
                isInputInvalid: true,
                path: newPath,
                error: !!error
                    ? error
                    : { message: getNoDirectoryMessage(newPath) },
                showCurrentPath: true,
            });
        } else {
            setCurrentPath(newPath);
            showCurrentPath();
        }
    });
};
