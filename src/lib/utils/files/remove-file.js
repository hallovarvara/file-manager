import { existsSync, unlink } from 'fs';
import { throwError } from '../throw-error.js';
import { write } from '../write.js';
import { showCurrentPath } from '../show-current-path.js';
import { resolvePath } from '../resolve-path.js';

export const removeFile = async ({
    currentPath = '',
    filePath: filePathRaw = '',
}) => {
    const filePath = resolvePath(currentPath, filePathRaw);

    if (!existsSync(filePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `No file found by path "${filePath}"`,
            },
            currentPath,
        });
        return;
    }

    await unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
            throwError({
                isOperationFailed: true,
                error: unlinkErr,
                currentPath,
            });
            return;
        }

        write(`File "${filePath}" was successfully removed`);

        showCurrentPath(currentPath);
    });
};
