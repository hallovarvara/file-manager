import { copyFile } from '../../lib/utils/files/copy-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const copy = async (args) => {
    const [filename = '', newDirectoryName = ''] = args;

    await copyFile({
        currentPath: getCurrentPath(),
        filename,
        newDirectoryName,
    });
};
