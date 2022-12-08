import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { handleFileData } from './handle-file-data.js';
import { checkFileExist } from './check-file-exist.js';
import { resolvePath } from '../resolve-path.js';

export const readFile = async ({ filename: filenameRaw, directory }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolvePath(directory, filename);

    checkFileExist(
        filePath,
        () => {
            handleFileData(
                filePath,
                (data) => {
                    write(data);
                },
                () => showCurrentPath(directory),
            );
        },
        () => showCurrentPath(directory),
    );
};
