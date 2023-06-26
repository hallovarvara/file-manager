import { throwError } from '../throw-error.js';
import { stat, unlink } from 'fs/promises';
import { isAbsolute, sep } from 'path';
import { isString } from '../is-string.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { handleCopyFile } from './handle-copy-file.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const copyFile = async ({
    currentPath = '',
    filename: filenameRaw = '',
    newDirectoryName = '',
    shouldDeleteSource,
}) => {
    const filenameNoQuotes = removeQuotesFromPath(filenameRaw);

    const filename =
        isAbsolute(filenameNoQuotes) || filenameNoQuotes.includes(sep)
            ? filenameNoQuotes.split(sep).pop()
            : filenameNoQuotes;

    const filePath = resolvePath(
        currentPath,
        filenameNoQuotes.includes(sep) ? filenameNoQuotes : filename,
    );

    const newDirectory = resolvePath(currentPath, newDirectoryName);

    if (!isString(filePath) || filename === '') {
        throwError({
            isOperationFailed: true,
            error: { message: 'Pass correct file path' },
            showCurrentPath: true,
        });

        return;
    }

    try {
        await stat(newDirectory);
    } catch {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Incorrect directory name "${
                    newDirectory || ''
                }" passed. Pass correct directory name`,
            },
            showCurrentPath: true,
        });

        return;
    }

    try {
        await stat(filePath);
    } catch {
        throwErrorNoFile({ path: filename });

        return;
    }

    const newFilePath = resolvePath(newDirectory, filename);

    try {
        await stat(newFilePath);

        throwError({
            isOperationFailed: true,
            error: {
                message: `"${filename}" already exists in directory "${newDirectory}"`,
            },
            showCurrentPath: true,
        });
    } catch {
        handleCopyFile({
            filePath,
            newFilePath,
            callback: async (error) => {
                if (error) {
                    throwError({
                        isOperationFailed: true,
                        error,
                    });
                } else if (shouldDeleteSource) {
                    try {
                        await unlink(filePath);

                        writeSuccessMessage(
                            `File "${filename}" was successfully moved to "${newDirectory}" folder`,
                        );
                    } catch (deleteError) {
                        throwError({
                            isOperationFailed: true,
                            error: deleteError,
                        });
                    }
                } else {
                    writeSuccessMessage(
                        `File "${filename}" was successfully copied to "${newDirectory}" folder`,
                    );
                }
            },
        });
    }
};
