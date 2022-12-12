import { HOME_DIRECTORY } from '../constants/index.js';

export let currentPath = HOME_DIRECTORY;

export const getCurrentPath = () => currentPath;

export const setCurrentPath = (newPath) => {
    currentPath = newPath;
};
