import { getCommandAttributes } from '../lib/utils/get-command-attributes.js';
import { getEolInfo } from '../lib/utils/os/get-eol-info.js';
import { getCpusInfo } from '../lib/utils/os/get-cpus-info.js';
import { getHomeDirectory } from '../lib/utils/os/get-home-directory.js';
import { getSystemUsername } from '../lib/utils/os/get-system-username.js';
import { getSystemArchitecture } from '../lib/utils/os/get-system-architecture.js';
import { throwError } from '../lib/utils/throw-error.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';

export const executeOsFunctionByArgument = (command, currentPath) => {
    const [, arg] = getCommandAttributes(command);

    switch (arg) {
        case '--EOL':
            getEolInfo();
            break;
        case '--cpus':
            getCpusInfo();
            break;
        case '--homedir':
            getHomeDirectory();
            break;
        case '--username':
            getSystemUsername();
            break;
        case '--architecture':
            getSystemArchitecture();
            break;
        default:
            throwError({ isInputInvalid: true });
    }

    showCurrentPath(currentPath);
};
