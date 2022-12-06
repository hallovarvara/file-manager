import { STOP_COMMAND } from '../lib/constants/index.js';

class Record {
    constructor(command, description) {
        this.command = command;
        this.description = description;
    }
}

export const help = () => {
    const helpData = {};

    helpData.start = new Record(
        'npm start -- --username=your_username',
        'Start the application',
    );

    helpData.exit = new Record(
        `${STOP_COMMAND} or Ctrl/Cmd+C`,
        'Exit the application',
    );

    helpData.up = new Record('up', 'Go upper from current directory');

    helpData.cd = new Record(
        'cd path_to_directory',
        'Go to dedicated folder from current directory',
    );

    helpData.ls = new Record(
        'ls',
        'List all files and folder in current directory',
    );

    helpData.cat = new Record('cat file_name', 'Show content of the file');

    helpData.add = new Record(
        'add file_name',
        'Create a new file in the current directory',
    );

    helpData.rm = new Record(
        'rm file_name',
        'Delete the file from the current directory',
    );

    helpData.rn = new Record('rn file_name new_name', 'Rename the file');

    helpData.cp = new Record('cp file_path new_destination', 'Copy the file');

    helpData.mv = new Record(
        'mv file_path new_file_path',
        'Move the file to another directory',
    );

    helpData.os_EOL = new Record(
        'os --EOL',
        'Show OS info: default end of line',
    );

    helpData.os_cpus = new Record(
        'os --cpus',
        'Show OS info: host machine CPUs',
    );

    helpData.os_homedir = new Record(
        'os --homedir',
        'Show OS info: home directory',
    );

    helpData.os_username = new Record(
        'os --username',
        'Show OS info: username',
    );

    helpData.os_architecture = new Record(
        'os --architecture',
        'Show OS info: CPU architecture',
    );

    helpData.hash = new Record('hash file_path', 'Calculate hash for the file');

    helpData.compress = new Record('compress file_path', 'Compress the file');

    helpData.decompress = new Record(
        'decompress file_path',
        'Decompress the file',
    );

    helpData.help = new Record('help or .help', 'Show this commands table');

    console.table(helpData);
};
