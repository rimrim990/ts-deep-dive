/**
 * Generator
 * - can yield execution flow back to the caller
 * - generator's execution resumes where it was paused
 * - generator maintain an execution context
 */
describe('generator', () => {
    it('generator function returns a generator', () => {
        function* generateSequence() {
            yield 1;
            yield 2;
            return 3;
        }

        // function body is not executed yet.
        const generator = generateSequence()
        // when next called, generator will be executed until it meet closest yield statement.
        const result = generator.next()

        expect(result.value).toEqual(1)
        expect(result.done).toBeFalsy()
    })

    it('all generators are iterable', () => {
        function* generateSequence() {
            yield 1;
            yield 2;
            return 3;
        }

        const result = []
        for (const val of generateSequence()) {
            result.push(val)
        }

        // the last value where the done value is 'true' is ignored
        expect(result).toEqual(expect.arrayContaining([1, 2]))
        expect([0, ...generateSequence()]).toEqual(expect.arrayContaining([0, 1, 2]))
    })

    it('simplify code by using generators instead of iterators', () => {
        const range = {
            from: 1,
            to: 5,
            *[Symbol.iterator]() {
                for (let value = this.from; value <= this.to; value++) {
                    yield value;
                }
            }
        }

        expect([...range]).toEqual([1, 2, 3, 4, 5])
    })

    it('generator composition', () => {
        function* generateSequence(start, end) {
            for (let i = start; i <= end; i++) yield i;
        }

        function* generatePasswordCodes() {
            // delegate to another generator
            yield* generateSequence(48, 57);
            yield* generateSequence(65, 90);
            yield* generateSequence(97, 122);
        }

        let str = ''
        for (const res of generatePasswordCodes()) {
            str += String.fromCharCode(res)
        }

        expect(str.length).not.toBeFalsy()
    })

    it('passing values in and out of generator using yield', () => {
        function* gen() {
            let result = yield "2 + 2 = ?"
            return result
        }

        const generator = gen()
        const question = generator.next().value
        const result = generator.next(4)

        expect(question).toEqual("2 + 2 = ?")
        expect(result.done).toBeTruthy()
        expect(result.value).toEqual(4)
    })
})