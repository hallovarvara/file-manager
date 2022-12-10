import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { decompressFile } from '../../lib/utils/files/decompress-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const decompress = async (command) => {
    const [, filename = '', newFilename = ''] = getCommandAttributes(command);
    await decompressFile({ currentPath, filename, newFilename });
};
