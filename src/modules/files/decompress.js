import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { decompressFile } from '../../lib/utils/files/decompress-file.js';

export const decompress = async (command, currentPath) => {
    const [, filename = '', newFilename = ''] = getCommandAttributes(command);
    await decompressFile({ currentPath, filename, newFilename });
};
