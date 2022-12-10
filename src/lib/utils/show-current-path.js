import { write } from './write.js';
import { currentPath } from './handle-current-path.js';

export const showCurrentPath = () => {
    write(`You are currently in ${currentPath}`);
};
