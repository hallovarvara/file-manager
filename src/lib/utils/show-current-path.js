import { write } from './write.js';
import { getCurrentPath } from './handle-current-path.js';
import { CONSOLE_COLOR } from '../constants/colors.js';

export const showCurrentPath = () => {
    write(`You are currently in ${getCurrentPath()}`, CONSOLE_COLOR.GREY);
};
