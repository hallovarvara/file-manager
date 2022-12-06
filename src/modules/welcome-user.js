import { getWelcomePhrase } from '../lib/utils/get-welcome-phrase.js';
import { getUsernameFromArgs } from '../lib/utils/get-username-from-args.js';
import { write } from '../lib/utils/write.js';

export const welcomeUser = () => {
    const userArgs = process.argv.slice(2);

    if (userArgs.length === 0) {
        write(
            'Incorrect or lost "--username" argument, please use start script with ""-- --username=your_username"',
        );
    }

    write(getWelcomePhrase(getUsernameFromArgs(userArgs)));
};