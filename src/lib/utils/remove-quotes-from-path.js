import { isString } from './is-string.js';
import { QUOTES } from '../constants/quotes.js';

export const removeQuotesFromPath = (path) => {
    if (!isString(path) || path === '') {
        return '';
    }

    const trimmedPath = path.trim();

    const hasQuotes = QUOTES.some(
        ({ left, right }) => path.startsWith(left) && path.endsWith(right),
    );

    const normalisedPath = hasQuotes ? trimmedPath.slice(1, -1) : trimmedPath;

    return normalisedPath.trim();
};
