import { getCommandAttributes } from '../../lib/utils/get-command-attributes.js';
import { calculateFileHash } from '../../lib/utils/files/calculate-file-hash.js';

export const hash = async (command, currentPath) => {
    const [, filename = ''] = getCommandAttributes(command);
    await calculateFileHash({ currentPath, filename });
};
