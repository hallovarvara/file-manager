import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { copyFile } from '../../lib/utils/files/copy-file.js';

export const copy = async (command, currentPath) => {
    const [, filename = '', newDirectoryName = ''] =
        getCommandAttributes(command);

    await copyFile({ currentPath, filename, newDirectoryName });
};
