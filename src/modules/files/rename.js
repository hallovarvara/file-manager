import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { renameFile } from '../../lib/utils/files/rename-file.js';

export const rename = async (command, currentPath) => {
    const [, filename = '', newFilename = ''] = getCommandAttributes(command);
    await renameFile({ directory: currentPath, filename, newFilename });
};
