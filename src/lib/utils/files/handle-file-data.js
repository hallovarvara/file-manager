import { createReadStream } from 'fs';
import { throwError } from '../throw-error.js';

export const handleFileData = (filePath, onData, onEnd) => {
    const readableStream = createReadStream(filePath);

    readableStream.on('error', function (error) {
        throwError({ isOperationFailed: true, error });
    });

    readableStream.on('data', (chunk) => {
        const data = chunk.toString();
        onData?.(data);
    });

    readableStream.on('end', onEnd);
};
