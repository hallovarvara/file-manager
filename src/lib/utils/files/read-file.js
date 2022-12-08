import { existsSync, createReadStream } from 'fs';
import { resolve } from 'path';
import { write } from '../write.js';
import { throwError } from '../throw-error.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';

export const readFile = async ({ filename: filenameRaw, directory }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolve(directory, filename);

    if (!existsSync(filePath)) {
        throwError({
            isOperationFailed: true,
            error: { message: `File "${filePath}" doesn't exist` },
        });
        return;
    }

    const readableStream = createReadStream(filePath);

    readableStream.on('error', function (readErr) {
        throwError({ isOperationFailed: true, error: readErr });
    });

    readableStream.on('data', (chunk) => {
        const fileContent = chunk.toString();
        write(fileContent);
    });

    readableStream.on('end', (chunk) => {
        showCurrentPath(directory);
    });
};
