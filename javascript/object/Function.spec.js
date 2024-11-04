describe('The "new Function" syntax', () => {
    it('You can create a function using the Function constructor.', () => {
        let sum = new Function('a', 'b', 'return a + b')
        expect(sum(1, 2)).toEqual(3)
    })

    it('Functions created using the Function constructor have their lexical environment set to the global one.', () => {
        function getCounter() {
            let count = 0;
            return new Function('return count++')
        }
        function getCounter2() {
            let count = 0;
            return () => count++;
        }

        const counter = getCounter()
        const counter2 = getCounter2()

        expect(() => counter()).toThrowError(ReferenceError)
        expect(counter2()).toEqual(0)
    })
})