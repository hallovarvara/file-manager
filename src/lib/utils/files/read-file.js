import { EOL } from 'os';
import { stat } from 'fs/promises';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { handleFileData } from './handle-file-data.js';
import { resolvePath } from '../resolve-path.js';
import { throwErrorNoFile } from './throw-error-no-file.js';

export const readFile = async ({ filename: filenameRaw, directory }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolvePath(directory, filename);

    try {
        await stat(filePath);
    } catch {
        throwErrorNoFile({ path: filePath, showCurrentPath: true });
        return;
    }

    handleFileData(
        filePath,
        (data) => {
            write(`${EOL}${data}`);
        },
        showCurrentPath,
    );
};
