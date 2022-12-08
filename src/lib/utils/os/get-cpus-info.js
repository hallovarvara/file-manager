import { cpus } from 'os';
import { write } from '../write.js';
import { IS_MAC_OS } from '../../constants/index.js';

export const getCpusInfo = () => {
    const CPUInfo = cpus();
    const coefficient = IS_MAC_OS ? 10 : 1000;
    const generalInfoString = `Your computer has ${CPUInfo.length} CPUS:`;

    const fullInfo = CPUInfo.reduce((resultString, { model, speed }, index) => {
        return (
            resultString +
            `\n${index + 1}) Model "${model}", it's clock rate is ${
                speed / coefficient
            } GHZ`
        );
    }, generalInfoString);

    write(fullInfo);
};
