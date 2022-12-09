import { rename } from 'fs';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { resolvePath } from '../resolve-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { checkFileExist } from './check-file-exist.js';
import { throwErrorNoFile } from './throw-error-no-file.js';

export const renameFile = async ({
    directory,
    filename: filenameRaw,
    newFilename: newFilenameRaw,
}) => {
    if (!directory) {
        throwError({
            isOperationFailed: true,
            error: { message: 'No "directory" argument passed' },
            currentPath: directory,
        });
        return;
    }

    if (!filenameRaw || !newFilenameRaw) {
        throwError({
            isOperationFailed: true,
            error: {
                message:
                    'Please, pass "filename" and "newFilename" in command in this format:\nrn filename newFilename',
            },
            currentPath: directory,
        });
        return;
    }

    const filename = removeQuotesFromPath(filenameRaw);
    const newFilename = removeQuotesFromPath(newFilenameRaw);
    const filePath = resolvePath(directory, filename);

    checkFileExist(
        filePath,
        () => {
            const newFilePath = resolvePath(directory, newFilename);

            checkFileExist(
                newFilePath,
                () => {
                    throwError({
                        isOperationFailed: true,
                        error: {
                            message: `File "${newFilename}" already exists in directory "${directory}"`,
                        },
                        currentPath: directory,
                    });
                },
                () => {
                    rename(filePath, newFilePath, (renameErr) => {
                        if (renameErr) {
                            throwError({
                                isOperationFailed: true,
                                error: renameErr,
                                currentPath: directory,
                            });
                            return;
                        }

                        write(
                            `File "${filename}" was successfully renamed to "${newFilename}"`,
                        );

                        showCurrentPath(directory);
                    });
                },
            );
        },
        () => {
            throwErrorNoFile({ path: filePath, currentPath: directory });
        },
    );
};
