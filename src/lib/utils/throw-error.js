import { EOL } from 'os';
import { write } from './write.js';
import { showCurrentPath } from './show-current-path.js';
import { HELP_COMMAND_MESSAGE } from '../constants/index.js';
import { CONSOLE_COLOR } from '../constants/colors.js';

export const throwError = ({
    isOperationFailed,
    isInputInvalid,
    error,
    showCurrentPath: shouldShowCurrentPath,
    isOneLessIndentBefore,
} = undefined) => {
    let errorMessage = error?.message ? '' : 'Unknown error';

    if (isOperationFailed) {
        errorMessage = 'Operation failed';
    }

    if (isInputInvalid) {
        errorMessage = `${isOneLessIndentBefore ? '' : EOL}Invalid input`;
    }

    if (error?.message) {
        errorMessage += `${isOneLessIndentBefore ? '' : EOL}${error.message}`;
    }

    if (isInputInvalid) {
        errorMessage += `${
            isOneLessIndentBefore ? '' : EOL
        }${EOL}${HELP_COMMAND_MESSAGE}`;
    }

    write(errorMessage, CONSOLE_COLOR.RED);

    if (shouldShowCurrentPath) {
        showCurrentPath();
    }
};
