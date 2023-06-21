import { writeFile } from 'fs';
import { write } from '../write.js';
import { throwError } from '../throw-error.js';
import { removeQuotesFromPath } from '../remove-quotes-from-path.js';
import { showCurrentPath } from '../show-current-path.js';
import { resolvePath } from '../resolve-path.js';
import { checkFileExist } from './check-file-exist.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const createFile = async ({ directory, filename: filenameRaw }) => {
    const filename = removeQuotesFromPath(filenameRaw);
    const filePath = resolvePath(directory, filename);

    checkFileExist(
        filePath,
        () => {
            throwError({
                isOperationFailed: true,
                error: {
                    message: `File "${filename}" already exists`,
                },
                showCurrentPath: true,
            });
        },
        () => {
            writeFile(filePath, '', { encoding: 'utf-8' }, (error) => {
                if (error) {
                    throwError({
                        isOperationFailed: true,
                        showCurrentPath: true,
                        error,
                    });

                    return;
                }

                write(
                    `File "${filename}" was successfully created in "${directory}" directory`,
                    CONSOLE_COLOR.GREEN,
                );

                showCurrentPath();
            });
        },
    );
};
