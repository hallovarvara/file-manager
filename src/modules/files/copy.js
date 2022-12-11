import { copyFile } from '../../lib/utils/files/copy-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const copy = async (args) => {
    const [filename = '', newDirectoryName = ''] = args;
    await copyFile({ currentPath, filename, newDirectoryName });
};
