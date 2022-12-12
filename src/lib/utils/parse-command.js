import { QUOTES } from '../constants/quotes.js';

export const parseCommand = (command) => {
    if (!command) {
        return [];
    }

    const commandParts = [];
    const quotesStack = [];
    let currentIndex = 0;

    command?.split('').forEach((letter, index) => {
        if (index === command.length - 1) {
            const lastIndex = quotesStack.length > 0 ? -1 : undefined;

            const part = command.slice(currentIndex, lastIndex).trim();

            if (part !== '') {
                commandParts.push(part);
            }

            return;
        }

        if (letter === ' ' && quotesStack.length === 0) {
            const part = command.slice(currentIndex, index).trim();

            if (part !== '') {
                commandParts.push(part);
                currentIndex = index + 1;
            }

            return;
        }

        if (QUOTES.some((set) => set.left === letter || set.right === letter)) {
            const quotesSet = QUOTES.reduce(
                (result, set) =>
                    set.left === letter || set.right === letter ? set : result,
                {},
            );

            if (
                quotesStack[quotesStack.length - 1] === quotesSet.left &&
                letter === quotesSet.right
            ) {
                quotesStack.pop();
                commandParts.push(command.slice(currentIndex, index));
                currentIndex = index + 1;
                return;
            }

            if (quotesSet.left === letter) {
                quotesStack.push(letter);
                currentIndex = index + 1;
            }
        }
    });

    return commandParts.map((part) => part.trim());
};
