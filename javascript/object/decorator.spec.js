describe('Decorators and forwarding, call/apply', () => {
    it('Caching slow functions using a decorator', async () => {
        async function slow(x) {
            // a heavy CPU-intensive job here
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return x ** 2;
        }

        /**
         * Decorator
         * - a special function that takes another function and alters its behavior
         * - can separate caching from the main function
         */
        function cachingDecorator(func) {
            const cache = new Map()

            // caching wrapper
            return function(x) {
                // already cached key 'x'
                if (cache.has(x)) {
                    return cache.get(x)
                }

                const result = func(x)
                cache.set(x, result);
                return result;
            }
        }

        slow = cachingDecorator(slow);

        const start = (new Date()).getTime()
        const result = await slow(2)
        const end = (new Date()).getTime()
        expect(end-start).toBeGreaterThanOrEqual(1000)
        expect(result).toEqual(4)

        const cachedStart = (new Date()).getTime()
        const cachedResult = await slow(2)
        const cachedEnd = (new Date()).getTime()
        expect(cachedEnd-cachedStart).toBeLessThanOrEqual(1000)
        expect(cachedResult).toEqual(4)
    })

    /**
     * Call Forwarding.
     * - passing all arguments along with the context to another function.
     */
    it('"Function.call" allows to call a function with a explicitly set "this".', () => {
        const obj = {
            value: 2,
            logic() {
                return this.value ** 2
            }
        }
        const other = {
            value: 9
        }

        const method = obj.logic;

        expect(method()).toBeNaN()
        expect(method.call(obj)).toEqual(4)
        expect(method.call(other)).toEqual(81)
    })
})