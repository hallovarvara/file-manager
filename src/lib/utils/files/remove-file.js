import { existsSync, unlink } from 'fs';
import { isAbsolute, resolve } from 'path';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';

export const removeFile = async ({
    currentPath = '',
    filePath: filePathRaw = '',
}) => {
    const filePathString = removeQuotesFromPath(filePathRaw);

    const filePath = isAbsolute(filePathString)
        ? filePathString
        : resolve(currentPath, filePathString);

    if (!existsSync(filePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `No file found by path "${filePath}"`,
            },
        });
        return;
    }

    await unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
            throwError({
                isOperationFailed: true,
                error: unlinkErr,
            });
            return;
        }

        write(`File "${filePath}" was successfully removed`);

        showCurrentPath(currentPath);
    });
};
