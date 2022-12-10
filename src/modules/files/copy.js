import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { copyFile } from '../../lib/utils/files/copy-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const copy = async (command) => {
    const [, filename = '', newDirectoryName = ''] =
        getCommandAttributes(command);

    await copyFile({ currentPath, filename, newDirectoryName });
};
