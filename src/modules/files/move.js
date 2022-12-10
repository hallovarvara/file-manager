import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { moveFile } from '../../lib/utils/files/move-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const move = async (command) => {
    const [, filename = '', newDirectoryName = ''] =
        getCommandAttributes(command);

    await moveFile({ currentPath, filename, newDirectoryName });
};
