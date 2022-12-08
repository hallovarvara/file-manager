import { write } from '../write.js';
import { SYSTEM_ARCHITECTURE } from '../../constants/index.js';

export const getSystemArchitecture = () => {
    write(`Your system architecture is "${SYSTEM_ARCHITECTURE}"`);
};
