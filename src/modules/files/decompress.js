import { compressFile } from '../../lib/utils/files/compress-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const decompress = async (args) => {
    const [filename = '', newFilename = ''] = args;

    await compressFile({
        currentPath: getCurrentPath(),
        filename,
        newFilename,
        shouldDecompress: true,
    });
};
