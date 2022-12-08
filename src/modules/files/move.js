import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { moveFile } from '../../lib/utils/files/move-file.js';

export const move = async (command, currentPath) => {
    const [, filename = '', newDirectoryName = ''] =
        getCommandAttributes(command);

    await moveFile({ currentPath, filename, newDirectoryName });
};
