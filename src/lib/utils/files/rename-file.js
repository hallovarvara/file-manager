import { existsSync, rename } from 'fs';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { resolvePath } from '../resolve-path.js';
import { showCurrentPath } from '../show-current-path.js';

export const renameFile = async ({
    directory,
    filename: filenameRaw,
    newFilename: newFilenameRaw,
}) => {
    if (!directory) {
        throwError({
            isOperationFailed: true,
            error: {
                message:
                    'No "directory" argument passed, please try to restart file-manager',
            },
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

    if (!existsSync(filePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Nothing to rename. File "${filename}" doesn't exist in "${directory}" directory`,
            },
            currentPath: directory,
        });
        return;
    }

    const newFilePath = resolvePath(directory, newFilename);

    if (existsSync(newFilePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Pass another new filename. File "${newFilename}" already exists in "${directory}" directory`,
            },
            currentPath: directory,
        });
        return;
    }

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
};
