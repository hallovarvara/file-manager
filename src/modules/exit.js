import { sayGoodbye } from './say-goodbye.js';

export const exit = () => {
    sayGoodbye();
    process.exit();
};
