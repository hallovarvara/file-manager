import { write } from './write.js';
import { showCurrentPath } from './show-current-path.js';

export const throwError = ({
    isOperationFailed,
    isInputInvalid,
    error,
    currentPath,
} = undefined) => {
    let errorMessage = 'Unknown error';

    if (isOperationFailed) {
        errorMessage = 'Operation failed';
    }

    if (isInputInvalid) {
        errorMessage = 'Invalid input';
    }

    if (error?.message) {
        errorMessage += `\n${error.message}`;
    }

    write(errorMessage);

    if (currentPath) {
        showCurrentPath(currentPath);
    }
};
