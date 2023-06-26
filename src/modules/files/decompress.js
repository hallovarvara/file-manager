import { decompressFile } from '../../lib/utils/files/decompress-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const decompress = async (args) => {
    const [filename = '', newFilename = ''] = args;
    await decompressFile({
        currentPath: getCurrentPath(),
        filename,
        newFilename,
    });
};
