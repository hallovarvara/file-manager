import { write } from '../write.js';
import { HOME_DIRECTORY } from '../../constants/index.js';

export const getHomeDirectory = () => {
    write(`Your computer's home directory is "${HOME_DIRECTORY}"`);
};
