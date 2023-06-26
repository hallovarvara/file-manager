import { EOL } from 'os';
import { readdir } from 'fs';
import { throwError } from '../lib/utils/throw-error.js';
import { sortRecordsAlphabetically } from '../lib/utils/sort-records-alphabetically.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { getCurrentPath } from '../lib/utils/handle-current-path.js';
import { write } from '../lib/utils/write.js';
import { COMMAND_LS } from '../lib/constants/commands.js';
import { CONSOLE_COLOR } from '../lib/constants/colors.js';

class Record {
    constructor(name, type) {
        this.Name = name;
        this.Type = type;
    }
}

const writeArgumentsRedundancyMessage = (args) => {
    if (args.length > 0) {
        write(
            `${EOL}Psst... There is no need to specify arguments after "${COMMAND_LS}" command`,
            CONSOLE_COLOR.GREY,
        );
    }
};

export const getDirectoryContentList = (args) => {
    readdir(
        getCurrentPath(),
        { withFileTypes: true },
        async (error, entities) => {
            if (error) {
                throwError({
                    isOperationFailed: true,
                    showCurrentPath: true,
                    error,
                });

                return;
            }

            if (entities?.length === 0) {
                writeArgumentsRedundancyMessage(args);

                throwError({
                    error: { message: `Folder "${getCurrentPath()}" is empty` },
                    showCurrentPath: true,
                    isOneLessIndentBefore: args.length > 0,
                });
            } else {
                const files = [];
                const directories = [];

                entities.forEach((entity) => {
                    const isFile = entity.isFile();

                    const record = new Record(
                        entity.name,
                        isFile ? 'file' : 'directory',
                    );

                    (isFile ? files : directories).push(record);
                });

                console.table([
                    ...sortRecordsAlphabetically(directories, 'Name'),
                    ...sortRecordsAlphabetically(files, 'Name'),
                ]);

                writeArgumentsRedundancyMessage(args);

                showCurrentPath();
            }
        },
    );
};
