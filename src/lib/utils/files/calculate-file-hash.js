import { createHash } from 'crypto';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { showCurrentPath } from '../show-current-path.js';
import { checkFileExist } from './check-file-exist.js';
import { resolvePath } from '../resolve-path.js';
import { handleFileData } from './handle-file-data.js';

export const calculateFileHash = async ({ currentPath, filename }) => {
    const filePath = resolvePath(currentPath, filename);

    if (filePath === currentPath) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `Pass correct filename after "hash" command`,
            },
            currentPath,
        });

        return;
    }

    checkFileExist(
        filePath,
        () => {
            handleFileData(
                filePath,
                (data) => {
                    const hashSum = createHash('sha256');
                    hashSum.update(data);
                    const hex = hashSum.digest('hex');
                    write(`Hex of "${filename}" file is "${hex}"`);
                },
                () => {
                    showCurrentPath(currentPath);
                },
            );
        },
        () => {
            showCurrentPath(currentPath);
        },
    );
};
