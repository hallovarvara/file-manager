import { renameFile } from '../../lib/utils/files/rename-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const rename = async (args) => {
    const [filename = '', newFilename = ''] = args;
    await renameFile({ directory: currentPath, filename, newFilename });
};
