import { stat } from 'fs';
import { throwErrorNoFile } from './throw-error-no-file.js';

export const checkFileExist = (path, onExist, onNotExist) => {
    if (!path) {
        throwErrorNoFile();
    }

    try {
        stat(path, (error, stats) => {
            if (error || stats.isDirectory()) {
                throwErrorNoFile(path);
                onNotExist?.({ path, stats });
            } else {
                onExist?.({ path, stats });
            }
        });
    } catch (error) {
        throwErrorNoFile(path, error);
    }
};
