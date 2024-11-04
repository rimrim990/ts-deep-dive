describe('The old "var"', () => {
    it('"var" has no block scope. They are visible through blocks.', () => {
        // 'var' variables are either function-scoped or global-scoped
        if (true) {
            var value = true
        }

        for (var i =0; i < 10; i++) {
            var loop = 1;
        }

        // function-scoped 'var'
        function sayHi() {
            if (true) {
                var phrase = 'Hello, this is var.';
            }
        }

        // 'var' ignores code blocks
        expect(value).toBeTruthy()
        expect(i).toBe(10);
        expect(loop).toBe(1);
        expect(() => phrase).toThrowError(ReferenceError)
    })

    it('"var" variables can be redeclared multiple times.', () => {
        var user = "Pete";
        var user = "John";

        expect(user).toBe("John")
    })

    it('"var" variables are defined from the beginning of the function (or script starts from globals).', () => {
        // var declarations are processed when the function starts. (hoisting)
        function sayHi() {
            phrase = "Hello";
            var phrase;
            return phrase;
        }

        expect(sayHi()).toEqual("Hello")
    })

    it('Declarations are hoisted, but assignments are not.', () => {
        expect(phrase).toBeUndefined()

        // 1. variable declaration.
        // 2. variable assignment.
        var phrase = "Hello";
        expect(phrase).toEqual("Hello")
    })

    it('IIFE: emulate block-scoped variables using var.', () => {
        // nowadays, there's no reason to write this type of code.
        const result = (function() {
            var message = "Hello";
            return message;
        })();

        expect(() => message).toThrowError(ReferenceError)
        expect(result).toEqual("Hello");
    })

    // In browser, global functions and variables declared with "var" become the property of the global object.
})