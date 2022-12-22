import { unlink } from 'fs';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { showCurrentPath } from '../show-current-path.js';
import { resolvePath } from '../resolve-path.js';
import { checkFileExist } from './check-file-exist.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const removeFile = async ({
    currentPath = '',
    filePath: filePathRaw = '',
}) => {
    const filePath = resolvePath(currentPath, filePathRaw);

    checkFileExist(
        filePath,
        async () => {
            await unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    throwError({
                        isOperationFailed: true,
                        error: unlinkErr,
                        showCurrentPath: true,
                    });

                    return;
                }

                write(
                    `File "${filePath}" was successfully removed`,
                    CONSOLE_COLOR.GREEN,
                );

                showCurrentPath();
            });
        },
        () => {
            throwError({
                isOperationFailed: true,
                error: {
                    message: `No file found by path "${filePath}"`,
                },
                showCurrentPath: true,
            });
        },
    );
};
