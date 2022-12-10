import { stat } from 'fs';
import { getNewPath } from '../lib/utils/get-new-path.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { write } from '../lib/utils/write.js';
import { throwError } from '../lib/utils/throw-error.js';

import {
    currentPath,
    setCurrentPath,
} from '../lib/utils/handle-current-path.js';

export const executeUp = () => {
    const newPart = '..';
    const newPath = getNewPath(newPart);

    if (currentPath === newPath) {
        write(
            newPart === '..' || newPart === '../'
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
