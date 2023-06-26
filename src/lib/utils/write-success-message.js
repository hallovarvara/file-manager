import { CONSOLE_COLOR } from '../constants/colors.js';
import { write } from './write.js';
import { showCurrentPath } from './show-current-path.js';

export const writeSuccessMessage = (message) => {
    if (message) {
        write(message, CONSOLE_COLOR.GREEN);
        showCurrentPath();
    }
};
