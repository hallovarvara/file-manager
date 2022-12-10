import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { createFile } from '../../lib/utils/files/create-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const add = async (command) => {
    const [, filename = ''] = getCommandAttributes(command);
    await createFile({ directory: currentPath, filename });
};
