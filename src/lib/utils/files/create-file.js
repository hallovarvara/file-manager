import { stat, writeFile, readdir } from 'fs/promises';
import { throwError } from '../throw-error.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { resolvePath } from '../resolve-path.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const createFile = async ({ directory, filename: filenameRaw }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolvePath(directory, filename);

    try {
        await readdir(filePath);

        throwError({
            isOperationFailed: true,
            error: {
                message: `"${filePath}" is a directory, provide file path after "add" command`,
            },
            showCurrentPath: true,
        });

        return;
    } catch {}

    try {
        await stat(filePath);

        throwError({
            isOperationFailed: true,
            error: {
                message: `File "${filename}" already exists`,
            },
            showCurrentPath: true,
        });

        return;
    } catch {}

    try {
        await writeFile(filePath, '', { encoding: 'utf-8' });

        writeSuccessMessage(
            `File "${filename}" was successfully created in "${directory}" directory`,
        );
    } catch (createError) {
        throwError({
            isOperationFailed: true,
            showCurrentPath: true,
            error: createError,
        });
    }
};
