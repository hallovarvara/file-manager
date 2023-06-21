import { cpus, EOL } from 'os';
import { write } from '../write.js';
import { IS_MAC_OS } from '../../constants/index.js';
import { CONSOLE_COLOR } from '../../constants/colors.js';

export const getCpusInfo = () => {
    const CPUInfo = cpus();
    const coefficient = IS_MAC_OS ? 10 : 1000;

    write(
        `${EOL}Your computer has ${CPUInfo.length} CPUS:`,
        CONSOLE_COLOR.BLUE,
    );

    const fullInfo = CPUInfo.reduce(
        (result, { model, speed }, index) => [
            ...result,
            { Model: model, 'Clock Rate': `${speed / coefficient}GHz` },
        ],
        [],
    );

    console.table(fullInfo);
};
