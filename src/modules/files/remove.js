import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { removeFile } from '../../lib/utils/files/remove-file.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const remove = async (command) => {
    const [, filePath = ''] = getCommandAttributes(command);
    await removeFile({ currentPath, filePath });
};
