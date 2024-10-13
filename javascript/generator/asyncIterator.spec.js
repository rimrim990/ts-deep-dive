/**
 * asynchronous iterator and generator
 * - can process asynchronous data
 */
describe('async iterator and generator', () => {
    it('async iterator', async () => {
        const range = {
            from: 1,
            to: 5,

            [Symbol.asyncIterator]() {
                return {
                    current: this.from,
                    last: this.to,

                    // next function should return Promise
                    async next() {
                        await new Promise(resolve => setTimeout(resolve, 100))

                        if (this.current <= this.last) {
                            return {done: false, value: this.current++}
                        } else {
                            return {done: true}
                        }
                    }
                }
            }
        };

        await (async () => {
            const result = []
            // for await calls 'Symbol.asyncIterator' property
            for await (const value of range) {
                result.push(value)
            }

            expect(result).toEqual([1, 2, 3, 4, 5])
        })()
    })

    it('async generator', async () => {
        async function* generateSequence(start, end) {
            for (let i = start; i <= end; i++) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            yield i;
        }

        await (async () => {
            const result = []
            for await (const value of generateSequence(1, 5)) {
                result.push(value)
            }

            expect(result).toEqual([1, 2, 3, 4, 5])
        })
    })
})