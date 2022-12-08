import { homedir, arch } from 'os';

export const SYSTEM_ARCHITECTURE = arch();
export const IS_MAC_OS = SYSTEM_ARCHITECTURE === 'arm64';
export const STOP_COMMAND = '.exit';
export const HOME_DIRECTORY = homedir();
export const UNKNOWN_USERNAME = 'unforgettable Unknown';
