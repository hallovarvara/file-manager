import { stat } from 'fs';
import { getNewPath } from '../lib/utils/get-new-path.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { throwError } from '../lib/utils/throw-error.js';
import { getNoDirectoryMessage } from '../lib/utils/get-no-directory-message.js';
import { ERROR_ROOT_DIRECTORY } from '../lib/constants/errors.js';

import {
    currentPath,
    setCurrentPath,
} from '../lib/utils/handle-current-path.js';

export const executeUp = (args) => {
    if (args.length > 0) {
        throwError({
            isInputInvalid: true,
            showCurrentPath: true,
            error: { message: 'No parameters should be typed after "up"' },
        });

        return;
    }

    const newPart = '..';
    const newPath = getNewPath(newPart);

    if (currentPath === newPath) {
        throwError({
            isOperationFailed: true,
            showCurrentPath: true,
            error: { message: ERROR_ROOT_DIRECTORY },
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
