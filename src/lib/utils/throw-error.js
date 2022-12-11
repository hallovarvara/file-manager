import { write } from './write.js';
import { showCurrentPath } from './show-current-path.js';
import { HELP_COMMAND_MESSAGE } from '../constants/index.js';

export const throwError = ({
    isOperationFailed,
    isInputInvalid,
    error,
    showCurrentPath: shouldShowCurrentPath,
} = undefined) => {
    let errorMessage = error?.message ? '' : 'Unknown error';

    if (isOperationFailed) {
        errorMessage = 'Operation failed';
    }

    if (isInputInvalid) {
        errorMessage = `\nInvalid input`;
    }

    if (error?.message) {
        errorMessage += `\n${error.message}`;
    }

    if (isInputInvalid) {
        errorMessage += `\n\n${HELP_COMMAND_MESSAGE}`;
    }

    write(errorMessage);

    if (shouldShowCurrentPath) {
        showCurrentPath();
    }
};
