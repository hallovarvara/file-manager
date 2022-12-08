import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { removeFile } from '../../lib/utils/files/remove-file.js';

export const remove = async (command, currentPath) => {
    const [, filePath = ''] = getCommandAttributes(command);
    await removeFile({ currentPath, filePath });
};
