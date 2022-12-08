import { EOL } from 'os';
import { write } from '../write.js';

export const getEolInfo = () => {
    write(`Default system End-Of-Line: ${JSON.stringify(EOL)}`);
};
