import { readFile } from '../../lib/utils/files/read-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';

export const read = async (args) => {
    const [filename = ''] = args;
    await readFile({ directory: getCurrentPath(), filename });
};
