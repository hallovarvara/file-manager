import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { compressFile } from '../../lib/utils/files/compress-file.js';

export const compress = async (command, currentPath) => {
    const [, filename = '', newFilename = ''] = getCommandAttributes(command);
    await compressFile({ currentPath, filename, newFilename });
};
