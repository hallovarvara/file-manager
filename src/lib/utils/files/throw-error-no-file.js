import { throwError } from '../throw-error.js';

export const throwErrorNoFile = (props) => {
    const { path, error, currentPath, isDirectory } = props || {};

    throwError({
        isOperationFailed: true,
        error: !!error
            ? error
            : {
                  message: path
                      ? `No ${
                            isDirectory ? 'directory' : 'file'
                        } "${path}" found`
                      : 'Specify correct path',
              },
        currentPath,
    });
};
