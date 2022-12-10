import { unlink } from 'fs';
import { throwError } from '../throw-error.js';
import { isString } from '../is-string.js';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { handleCopyFile } from './handle-copy-file.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { checkFileExist } from './check-file-exist.js';

export const moveFile = async ({
    currentPath = '',
    filename: filenameRaw = '',
    newDirectoryName = '',
}) => {
    const filename = removeQuotesFromPath(filenameRaw);
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
                    const newFilePath = resolvePath(newDirectory, filename);

                    checkFileExist(
                        newFilePath,
                        () => {
                            throwError({
                                isOperationFailed: true,
                                error: {
                                    message: `File "${filename}" already exists in directory "${newDirectory}"`,
                                },
                                showCurrentPath: true,
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
                                            );

                                            showCurrentPath();
                                        });
                                    }
                                },
                            });
                        },
                    );
                },
                () => {
                    throwErrorNoFile({ path: filename });
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
