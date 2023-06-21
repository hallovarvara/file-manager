import { unlink } from 'fs';
import { throwError } from '../throw-error.js';
import { isString } from '../is-string.js';
import { write } from '../write.js';
import { showCurrentPath } from '../show-current-path.js';
import { handleCopyFile } from './handle-copy-file.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { checkFileExist } from './check-file-exist.js';
import { getPathParts } from '../get-path-parts.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';
import { ERROR_INCORRECT_PATH } from '../../constants/errors.js';

export const moveFile = async ({
    currentPath = '',
    filename,
    newDirectoryName = '',
}) => {
    const filePath = resolvePath(currentPath, filename);
    const newDirectory = resolvePath(currentPath, newDirectoryName);

    if (!isString(filePath) || filename === '') {
        throwError({
            isOperationFailed: true,
            error: { message: 'Pass correct file path' },
        });
        return;
    }

    checkFileExist(
        newDirectory,
        () => {
            checkFileExist(
                filePath,
                () => {
                    const pathParts = getPathParts(filename);

                    if (!Array.isArray(pathParts) || pathParts.length === 0) {
                        throwError({
                            isInputInvalid: true,
                            showCurrentPath: true,
                            error: {
                                message: ERROR_INCORRECT_PATH,
                            },
                        });
                        return;
                    }

                    const filenameOnly = pathParts.pop();
                    const newFilePath = resolvePath(newDirectory, filenameOnly);

                    checkFileExist(
                        newFilePath,
                        () => {
                            throwError({
                                isOperationFailed: true,
                                showCurrentPath: true,
                                error: {
                                    message: `File "${filename}" already exists in directory "${newDirectory}"`,
                                },
                            });
                        },
                        () => {
                            handleCopyFile({
                                filePath,
                                newFilePath,
                                callback: async (error) => {
                                    if (error) {
                                        throwError({
                                            isOperationFailed: true,
                                            error,
                                        });
                                    } else {
                                        unlink(filePath, (unlinkErr) => {
                                            if (unlinkErr) {
                                                throwError({
                                                    isOperationFailed: true,
                                                    error: unlinkErr,
                                                });

                                                return;
                                            }

                                            write(
                                                `File "${filename}" was successfully moved to "${newDirectory}" folder`,
                                                CONSOLE_COLOR.GREEN,
                                            );

                                            showCurrentPath();
                                        });
                                    }
                                },
                            });
                        },
                    );
                },
                ({ error }) => {
                    throwErrorNoFile({ path: filename, error });
                },
            );
        },
        () => {
            throwError({
                isOperationFailed: true,
                error: {
                    message: `Incorrect directory name "${
                        newDirectory || ''
                    }" passed. Pass correct directory name`,
                },
                showCurrentPath: true,
            });
        },
        true,
    );
};
