import { userInfo } from 'os';
import { write } from '../write.js';

export const getSystemUsername = () => {
    write(`Your system username is "${userInfo().username}"`);
};
