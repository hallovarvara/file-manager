import { createReadStream } from 'fs';
import { throwError } from '../throw-error.js';

export const handleFileData = (filePath, onData, onEnd) => {
    const readableStream = createReadStream(filePath);

    readableStream.on('error', function (readErr) {
        throwError({ isOperationFailed: true, error: readErr });
    });

    readableStream.on('data', (chunk) => {
        const data = chunk.toString();
        onData?.(data);
    });

    readableStream.on('end', onEnd);
};
