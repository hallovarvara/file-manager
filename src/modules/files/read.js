import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { readFile } from '../../lib/utils/files/read-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const read = async (command) => {
    const [, filename = ''] = getCommandAttributes(command);
    await readFile({ directory: currentPath, filename });
};
