import { isString } from './is-string.js';

const quotes = [
    { left: `'` },
    { left: '"' },
    { left: '„', right: '“' },
    { left: '«', right: '»' },
    { left: '`' },
];

export const removeQuotesFromPath = (path) => {
    if (!isString(path) || path === '') {
        return '';
    }

    const trimmedPath = path.trim();

    const hasQuotes = quotes.some(
        ({ left, right }) =>
            path.startsWith(left) && path.endsWith(right || left),
    );

    const normalisedPath = hasQuotes ? trimmedPath.slice(1, -1) : trimmedPath;

    return normalisedPath.trim();
};
