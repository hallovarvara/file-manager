export const getCurrentPath = () => process.cwd();

export const setCurrentPath = (newPath) => {
    process.chdir(newPath);
};
