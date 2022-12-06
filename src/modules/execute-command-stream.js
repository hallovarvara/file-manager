import { Transform } from 'stream';

export const executeCommandStream = new Transform({
    async transform(chunk, encoding, callback) {
        callback();
    },
});
