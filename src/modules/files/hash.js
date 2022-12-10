import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { calculateFileHash } from '../../lib/utils/files/calculate-file-hash.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const hash = async (command) => {
    const [, filename = ''] = getCommandAttributes(command);
    await calculateFileHash({ currentPath, filename });
};
