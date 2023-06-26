import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { readdir, stat } from 'fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { isString } from '../is-string.js';
import { throwError } from '../throw-error.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { resolvePath } from '../resolve-path.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const compressFile = async ({
    currentPath,
    filename,
    newFilename,
    shouldDecompress,
}) => {
    const commandName = shouldDecompress ? 'decompress' : 'compress';

    if (!isString(filename) || !isString(newFilename)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Pass a correct filename after ${commandName} command`,
            },
            showCurrentPath: true,
        });
        return;
    }

    const filePath = resolvePath(currentPath, filename);

    try {
        await stat(filePath);
    } catch {
        throwErrorNoFile({ path: filePath, showCurrentPath: true });
        return;
    }

    let newFilePath = resolvePath(currentPath, newFilename);

    try {
        await readdir(newFilePath);

        throwError({
            isOperationFailed: true,
            error: {
                message: `Path "${newFilename}" ends with a directory name. Specify a file name at the end of this path for successful ${commandName}ion`,
            },
            showCurrentPath: true,
        });

        return;
    } catch {
        try {
            await stat(newFilePath);

            throwError({
                isOperationFailed: true,
                error: {
                    message: `File "${newFilename}" already exists. Pass other filename for ${commandName} command`,
                },
                showCurrentPath: true,
            });

            return;
        } catch {}
    }

    pipeline(
        createReadStream(filePath),
        (shouldDecompress ? createBrotliDecompress : createBrotliCompress)(),
        createWriteStream(newFilePath),
        (error) => {
            if (error) {
                throwError({
                    isOperationFailed: true,
                    showCurrentPath: true,
                    error,
                });
            } else {
                writeSuccessMessage(
                    `File "${filename}" was successfully ${commandName}ed to "${newFilename}"`,
                );
            }
        },
    );
};
