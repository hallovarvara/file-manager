import { existsSync } from 'fs';
import { throwError } from '../throw-error.js';
import { isString } from '../is-string.js';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { handleCopyFile } from './handle-copy-file.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';

export const copyFile = async ({
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
    if (!isString(newDirectory) || !existsSync(newDirectory)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Incorrect directory name "${
                    newDirectory || ''
                }" passed. Pass correct directory name`,
            },
        });
        return;
    }

    if (!existsSync(filePath)) {
        throwErrorNoFile({ path: filename });
        return;
    }

    const newFilePath = resolvePath(newDirectory, filename);

    if (existsSync(newFilePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `File "${filename}" already exists in directory "${newDirectory}"`,
            },
        });
        return;
    }

    handleCopyFile({
        filePath,
        newFilePath,
        callback: (err) => {
            if (err) {
                throwError({ isOperationFailed: true, error: err });
            } else {
                write(
                    `File "${filename}" was successfully copied to "${newDirectory}" folder`,
                );

                showCurrentPath(currentPath);
            }
        },
    });
};
