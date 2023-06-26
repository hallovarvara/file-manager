import { EOL } from 'os';
import { write } from '../write.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const getEolInfo = () => {
    write(
        `Default system End-Of-Line: ${JSON.stringify(EOL)}`,
        CONSOLE_COLOR.BLUE,
    );
};
