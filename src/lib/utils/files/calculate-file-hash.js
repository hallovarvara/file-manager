import { createHash } from 'crypto';
import { isAbsolute } from 'path';
import { stat } from 'fs/promises';
import { throwError } from '../throw-error.js';
import { resolvePath } from '../resolve-path.js';
import { handleFileData } from './handle-file-data.js';
import { throwErrorNoFile } from './throw-error-no-file.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const calculateFileHash = async ({ currentPath, filename }) => {
    const filePath = isAbsolute(filename)
        ? filename
        : resolvePath(currentPath, filename);

    if (filePath === currentPath) {
        throwError({
            isOperationFailed: true,
            showCurrentPath: true,
            error: {
                message: `Pass correct filename after "hash" command`,
            },
        });

        return;
    }

    try {
        await stat(filePath);
    } catch {
        throwErrorNoFile({ path: filePath, showCurrentPath: true });
        return;
    }

    let fileData = '';

    handleFileData(
        filePath,
        (data) => {
            fileData = data;
        },
        () => {
            const hashSum = createHash('sha256');
            hashSum.update(fileData);

            writeSuccessMessage(
                `Hash of "${filename}" is "${hashSum.digest('hex')}"`,
            );
        },
    );
};
