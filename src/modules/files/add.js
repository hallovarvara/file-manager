import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { createFile } from '../../lib/utils/files/create-file.js';

export const add = async (command, currentPath) => {
    const [, filename = ''] = getCommandAttributes(command);
    await createFile({ directory: currentPath, filename });
};
