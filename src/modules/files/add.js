import { createFile } from '../../lib/utils/files/create-file.js';
import { getCurrentPath } from '../../lib/utils/handle-current-path.js';
import { COMMAND_ADD } from '../../lib/constants/commands.js';

export const add = async (userInput) => {
    const filename = userInput.replace(COMMAND_ADD, '').trim();
    await createFile({ directory: getCurrentPath(), filename });
};
