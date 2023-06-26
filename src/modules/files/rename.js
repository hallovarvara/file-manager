import { renameFile } from '../../lib/utils/files/rename-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const rename = async (args) => {
    const [filename = '', newFilename = ''] = args;
    await renameFile({ directory: getCurrentPath(), filename, newFilename });
};
