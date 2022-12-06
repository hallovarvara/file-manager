import { write} from '../lib/utils/write.js';
import { getPartingPhrase} from '../lib/utils/get-parting-phrase.js';
import { getUsernameFromArgs} from '../lib/utils/get-username-from-args.js';

export const sayGoodbye = () => {
    const userArgs = process.argv.slice(2);

    if (userArgs.length === 0) {
        return;
    }

    write(getPartingPhrase(getUsernameFromArgs(userArgs)));
};
