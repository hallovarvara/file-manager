import { calculateFileHash } from '../../lib/utils/files/calculate-file-hash.js';
import { currentPath } from '../../lib/utils/handle-current-path.js';

export const hash = async (args) => {
    const [filename = ''] = args;
    await calculateFileHash({ currentPath, filename });
};
