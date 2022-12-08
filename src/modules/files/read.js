import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { readFile } from '../../lib/utils/files/read-file.js';

export const read = async (command, currentPath) => {
    const [, filename = ''] = getCommandAttributes(command);
    await readFile({ directory: currentPath, filename });
};
