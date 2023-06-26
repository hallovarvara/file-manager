import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';

export const handleCopyFile = ({ filePath, newFilePath, callback }) => {
    pipeline(
        createReadStream(filePath),
        createWriteStream(newFilePath),
        callback,
    );
};
