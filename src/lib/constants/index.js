import { homedir, arch } from 'os';

export const IS_MAC_OS = arch() === 'arm64';
export const STOP_COMMAND = '.exit';
export const HOME_DIRECTORY = homedir();
export const UNKNOWN_USERNAME = 'unforgettable Unknown';
