import { moveFile } from '../../lib/utils/files/move-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const move = async (args) => {
    const [filename = '', newDirectoryName = ''] = args;

    await moveFile({
        currentPath: getCurrentPath(),
        filename,
        newDirectoryName,
    });
};
