import { existsSync, writeFile } from 'fs';
import { write } from '../write.js';
import { throwError } from '../throw-error.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { resolvePath } from '../resolve-path.js';

export const createFile = async ({ directory, filename: filenameRaw }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolvePath(directory, filename);

    if (existsSync(filePath)) {
        throwError({
            isOperationFailed: true,
            error: {
                message: `File "${filename}" already exists in "${directory}" directory`,
            },
        });
        return;
    }

    writeFile(filePath, '', (writeErr) => {
        if (writeErr) {
            throwError({ isOperationFailed: true, error: writeErr });
            return;
        }

        write(
            `File "${filename}" was successfully created in "${directory}" directory`,
        );
        showCurrentPath(directory);
    });
};
