import { calculateFileHash } from '../../lib/utils/files/calculate-file-hash.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const hash = async (args) => {
    const [filename = ''] = args;
    await calculateFileHash({ currentPath: getCurrentPath(), filename });
};
