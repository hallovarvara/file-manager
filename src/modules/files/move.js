import { moveFile } from '../../lib/utils/files/move-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const move = async (args) => {
    const [filename = '', newDirectoryName = ''] = args;
    await moveFile({ currentPath, filename, newDirectoryName });
};
