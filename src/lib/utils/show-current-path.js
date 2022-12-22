import { write } from './write.js';
import { currentPath } from './handle-current-path.js';
import { CONSOLE_COLOR } from '../constants/colors.js';

export const showCurrentPath = () => {
    write(`You are currently in ${currentPath}`, CONSOLE_COLOR.GREY);
};
