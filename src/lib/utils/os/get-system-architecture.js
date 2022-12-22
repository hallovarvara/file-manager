import { write } from '../write.js';
import { SYSTEM_ARCHITECTURE } from '../../constants/index.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const getSystemArchitecture = () => {
    write(
        `Your system architecture is "${SYSTEM_ARCHITECTURE}"`,
        CONSOLE_COLOR.BLUE,
    );
};
