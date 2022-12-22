import { userInfo } from 'os';
import { write } from '../write.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const getSystemUsername = () => {
    write(
        `Your system username is "${userInfo().username}"`,
        CONSOLE_COLOR.BLUE,
    );
};
