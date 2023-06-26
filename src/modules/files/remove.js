import { removeFile } from '../../lib/utils/files/remove-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const remove = async (args) => {
    const [filePath = ''] = args;
    await removeFile({ currentPath: getCurrentPath(), filePath });
};
