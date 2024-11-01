describe('Variable scope, closure', () => {
    it('Even after nested functions are returned, then can still access the outer variables.', () => {
        function getCounter() {
            let count = 0;
            return function counter() {
                return count++;
            }
        }

        const counter = getCounter()

        expect(counter()).toEqual(0)
        expect(counter()).toEqual(1)
        expect(counter()).toEqual(2)
    })

    it('Function Declaration is instantly fully initialized', () => {
        expect(func()).toEqual('initialized')

        function func() {
            return 'initialized'
        }
    })

    it('Inner Lexical Environment has a reference to the outer one.', () =>{
        // 1. global lexical environment
        const outerMost = 'one'

        function outerFunc() {
            // 2. new lexical environment created
            const outer = 'two'

            return function inner() {
                // 3. inner lexical environment created
                return outerMost + outer;
            }
        }

        expect(outerFunc()()).toEqual('onetwo')
    })

    it('Closure is a function that remembers its outer variables and can access them', () =>{
        // in js, functions automatically remember where they were created using a hidden [[Environment]] property
        function outer() {
            let privateValue = 0;
            function getValue() {
                return privateValue;
            }
            function updateValue(val) {
                privateValue = val;
            }
            return [getValue, updateValue]
        }

        const [getter, setter] = outer()
        setter(3)

        expect(getter()).toEqual(3)
    })
})