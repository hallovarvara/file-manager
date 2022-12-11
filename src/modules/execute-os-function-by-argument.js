import { getEolInfo } from '../lib/utils/os/get-eol-info.js';
import { getCpusInfo } from '../lib/utils/os/get-cpus-info.js';
import { getHomeDirectory } from '../lib/utils/os/get-home-directory.js';
import { getSystemUsername } from '../lib/utils/os/get-system-username.js';
import { getSystemArchitecture } from '../lib/utils/os/get-system-architecture.js';
import { throwError } from '../lib/utils/throw-error.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { ERROR_INCORRECT_ARGUMENT } from '../lib/constants/errors.js';

export const executeOsFunctionByArgument = (args) => {
    switch (args[0]?.toLowerCase()) {
        case '--eol':
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
            throwError({
                isInputInvalid: true,
                error: { message: ERROR_INCORRECT_ARGUMENT },
            });
    }

    showCurrentPath();
};
