import { readdir } from 'fs';
import { throwError } from '../lib/utils/throw-error.js';
import { sortRecordsAlphabetically } from '../lib/utils/sort-records-alphabetically.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { getCurrentPath } from '../lib/utils/handle-current-path.js';

class Record {
    constructor(name, type) {
        this.Name = name;
        this.Type = type;
    }
}

export const getDirectoryContentList = () => {
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
                throwError({
                    error: { message: `Folder "${getCurrentPath()}" is empty` },
                    showCurrentPath: true,
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

                showCurrentPath();
            }
        },
    );
};
