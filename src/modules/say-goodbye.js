import { write } from '../lib/utils/write.js';
import { getPartingPhrase } from '../lib/utils/get-parting-phrase.js';
import { getUsernameFromArgs } from '../lib/utils/get-username-from-args.js';
import { CONSOLE_COLOR } from '../lib/constants/colors.js';

export const sayGoodbye = () => {
    const userArgs = process.argv.slice(2);
    write(
        getPartingPhrase(getUsernameFromArgs(userArgs)),
        CONSOLE_COLOR.YELLOW,
    );
};
