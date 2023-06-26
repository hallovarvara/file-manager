import { homedir, arch } from 'os';
import { COMMAND_HELP } from './commands.js';

export const SYSTEM_ARCHITECTURE = arch();
export const IS_MAC_OS = SYSTEM_ARCHITECTURE === 'arm64';
export const HELP_COMMAND_MESSAGE = `Type "${COMMAND_HELP}" or ".${COMMAND_HELP}" to get commands list`;
export const HOME_DIRECTORY = homedir();
export const UNKNOWN_USERNAME = 'unforgettable Unknown';
