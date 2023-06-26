const USERNAME_ARG_PREFIX = '--username=';

export const getUsernameFromArgs = (argsArray) => {
    for (let i = 0; i < argsArray.length; i++) {
        if (argsArray[i].startsWith(USERNAME_ARG_PREFIX)) {
            const username = argsArray[i]
                .slice(USERNAME_ARG_PREFIX.length)
                .trim();

            if (username.length > 0) {
                return username;
            }
        }
    }

    return '';
};
