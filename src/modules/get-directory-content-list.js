import { readdir, lstatSync } from 'fs';
import { resolve } from 'path';
import { throwError } from '../lib/utils/throw-error.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { sortRecordsAlphabetically } from '../lib/utils/sort-records-alphabetically.js';

class Record {
    constructor(name, type) {
        this.Name = name;
        this.Type = type;
    }
}

export const getDirectoryContentList = async (path) => {
    await readdir(path, (readdirErr, entities) => {
        if (readdirErr) {
            throwError({ isOperationFailed: true, error: readdirErr });
            return;
        }

        if (entities?.length === 0) {
            throwError({ error: { message: `Folder "${path}" is empty` } });
        } else {
            const files = [];
            const directories = [];

            entities.forEach((name) => {
                const isFile = lstatSync(resolve(path, name)).isFile();
                const record = new Record(name, isFile ? 'file' : 'directory');
                (isFile ? files : directories).push(record);
            });

            console.table([
                ...sortRecordsAlphabetically(directories, 'Name'),
                ...sortRecordsAlphabetically(files, 'Name'),
            ]);
        }

        showCurrentPath(path);
    });
};
