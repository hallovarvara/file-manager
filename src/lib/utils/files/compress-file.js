import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { isString } from '../is-string.js';
import { throwError } from '../throw-error.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { resolvePath } from '../resolve-path.js';
import { checkFileExist } from './check-file-exist.js';
import { showCurrentPath } from '../show-current-path.js';
import { write } from '../write.js';

export const compressFile = ({ currentPath, filename, newFilename }) => {
    if (!isString(filename) || !isString(newFilename)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Pass a correct filenames after "compress" command`,
            },
            showCurrentPath: true,
        });
        return;
    }

    const filePath = resolvePath(currentPath, filename);
    const newFilePath = resolvePath(currentPath, newFilename);

    checkFileExist(
        filePath,
        () => {
            checkFileExist(
                newFilePath,
                () => {
                    throwError({
                        isOperationFailed: true,
                        error: {
                            message: `File "${newFilename}" already exists. Pass other filename for compressed file`,
                        },
                        showCurrentPath: true,
                    });
                },
                () => {
                    pipeline(
                        createReadStream(filePath),
                        createBrotliCompress(),
                        createWriteStream(newFilePath),
                        (error) => {
                            if (error) {
                                throwError({
                                    isOperationFailed: true,
                                    showCurrentPath: true,
                                    error,
                                });
                            } else {
                                write(
                                    `File "${filename}" was successfully compressed to "${newFilename}"`,
                                );

                                showCurrentPath();
                            }
                        },
                    );
                },
            );
        },
        () => {
            throwErrorNoFile({ path: filePath, showCurrentPath: true });
        },
    );
};
