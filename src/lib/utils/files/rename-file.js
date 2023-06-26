import { EOL } from 'os';
import { rename, stat } from 'fs/promises';
import { throwError } from '../throw-error.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const renameFile = async ({
    directory,
    filename: filenameRaw,
    newFilename: newFilenameRaw,
}) => {
    if (!directory) {
        throwError({
            isOperationFailed: true,
            error: { message: 'No "directory" argument passed' },
            showCurrentPath: true,
        });
        return;
    }

    if (!filenameRaw || !newFilenameRaw) {
        throwError({
            isOperationFailed: true,
            showCurrentPath: true,
            error: {
                message: `Please, pass "filename" and "newFilename" in command in this format:${EOL}rn filename newFilename`,
            },
        });
        return;
    }

    const filename = removeQuotesFromPath(filenameRaw);
    const newFilename = removeQuotesFromPath(newFilenameRaw);
    const filePath = resolvePath(directory, filename);

    try {
        await stat(filePath);
    } catch (err) {
        throwErrorNoFile({ path: filePath });

        return;
    }

    const newFilePath = resolvePath(directory, newFilename);

    try {
        await stat(newFilePath);

        throwError({
            isOperationFailed: true,
            error: {
                message: `"${newFilename}" already exists in directory "${directory}"`,
            },
            showCurrentPath: true,
        });
    } catch {
        try {
            await rename(filePath, newFilePath);

            writeSuccessMessage(
                `File "${filename}" was successfully renamed to "${newFilename}"`,
            );
        } catch (renameError) {
            throwError({
                isOperationFailed: true,
                showCurrentPath: true,
                error: renameError,
            });
        }
    }
};
