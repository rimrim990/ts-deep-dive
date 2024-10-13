/**
 * Iterable
 * - can iterate collections using `for...of`
 * - ex. array, string
 */
describe('Iterable', () => {
    it('Symbol.iterator', () => {
        let range = {
            from: 1,
            to: 5,

            [Symbol.iterator]() {
                this.current = this.from;
                return this
            },

            next() {
                if (this.current <= this.to) {
                    return { done: false, value: this.current++};
                } else {
                    return { done: true }
                }
            }
        }

       const result = []
        for (const num of range) {
            result.push(num)
        }

        expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]))
    })

    it('Strings are iterables', () => {
        const string = "Strings"
        const result = []

        for (let char of "Strings") {
            result.push(char)
        }

        expect(result).toEqual(expect.arrayContaining([...string]))
    })

    it('using an iterable manually', () => {
        const str = "Hello"
        const iterator = str[Symbol.iterator]()
        const result = []

        while (true) {
            const next = iterator.next()
            if (next.done) break
            result.push(next.value)
        }

        expect(result).toEqual(expect.arrayContaining([...str]))
    })

    it('iterable versus array-like', () => {
        // array-like object has index and length properties.
        const arrayLike = {
            0: "Hello",
            1: "World",
            length: 2
        }

        // but it doesn't have Symbol.iterator method
        expect(() => [...arrayLike]).toThrowError("arrayLike is not iterable")
        // can convert array-likes and iterables to Arrays using Array.from
        expect(Array.from(arrayLike).pop()).toEqual("World")
    })
})