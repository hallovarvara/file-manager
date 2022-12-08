import { throwError } from '../throw-error.js';

export const throwErrorNoFile = (props) => {
    const { path, error, currentPath } = props || {};

    throwError({
        isOperationFailed: true,
        error: !!error
            ? error
            : {
                  message: path
                      ? `No file "${path}" found`
                      : 'Specify correct path',
              },
        currentPath,
    });
};
