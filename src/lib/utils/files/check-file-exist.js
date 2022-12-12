import { stat } from 'fs';
import { throwErrorNoFile } from './throw-error-no-file.js';

export const checkFileExist = (
    path,
    onExist,
    onNotExist,
    isDirectory = false,
) => {
    if (!path) {
        throwErrorNoFile({ isDirectory });
    }

    try {
        stat(path, (error, stats) => {
            if (error || (isDirectory ? stats.isFile() : !stats.isFile())) {
                onNotExist?.({ error, path, stats });
            } else {
                onExist?.({ path, stats });
            }
        });
    } catch (error) {
        throwErrorNoFile({ path, error, isDirectory });
    }
};
