import { compressFile } from '../../lib/utils/files/compress-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const compress = async (args) => {
    const [filename = '', newFilename = ''] = args;

    await compressFile({
        currentPath: getCurrentPath(),
        filename,
        newFilename,
    });
};
