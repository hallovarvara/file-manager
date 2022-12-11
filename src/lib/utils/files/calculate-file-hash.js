import { createHash } from 'crypto';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { showCurrentPath } from '../show-current-path.js';
import { checkFileExist } from './check-file-exist.js';
import { resolvePath } from '../resolve-path.js';
import { handleFileData } from './handle-file-data.js';
import { throwErrorNoFile } from './throw-error-no-file.js';

const calculateHash = (data = '') => {
    const hashSum = createHash('sha256');
    hashSum.update(data);
    return hashSum.digest('hex');
};

export const calculateFileHash = async ({ currentPath, filename }) => {
    const filePath = resolvePath(currentPath, filename);
    let isData = false;

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

    checkFileExist(
        filePath,
        () => {
            handleFileData(
                filePath,
                (data) => {
                    const hex = calculateHash(data);
                    write(`Hex of "${filename}" file is "${hex}"`);
                    isData = true;
                },
                () => {
                    if (!isData) {
                        write(
                            `Hex of "${filename}" file is "${calculateHash()}"`,
                        );
                    }

                    showCurrentPath();
                },
            );
        },
        () => {
            throwErrorNoFile({ path: filePath, showCurrentPath: true });
        },
    );
};
