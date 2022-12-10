import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { compressFile } from '../../lib/utils/files/compress-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const compress = async (command) => {
    const [, filename = '', newFilename = ''] = getCommandAttributes(command);
    await compressFile({ currentPath, filename, newFilename });
};
