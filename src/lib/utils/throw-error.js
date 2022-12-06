import { write } from './write.js';

export const throwError = ({
    isOperationFailed,
    isInputInvalid,
    error,
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
};
