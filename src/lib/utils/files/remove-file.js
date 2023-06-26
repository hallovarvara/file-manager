import { stat, unlink } from 'fs/promises';
import { throwError } from '../throw-error.js';
import { resolvePath } from '../resolve-path.js';
import { writeSuccessMessage } from '../write-success-message.js';

export const removeFile = async ({
    currentPath = '',
    filePath: filePathRaw = '',
}) => {
    const filePath = resolvePath(currentPath, filePathRaw);

    try {
        await stat(filePath);
    } catch {
        throwError({
            isOperationFailed: true,
            error: { message: `No file found by path "${filePath}"` },
            showCurrentPath: true,
        });

        return;
    }

    try {
        await unlink(filePath);
        writeSuccessMessage(`File "${filePath}" was successfully removed`);
    } catch (deleteError) {
        throwError({
            isOperationFailed: true,
            error: deleteError,
            showCurrentPath: true,
        });
    }
};
