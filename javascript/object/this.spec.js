describe('Object methods, "this"', () => {
    it('The value of "this" is the object that used to call the method.', () => {
        const user1 = {
            name: "user1",
            sayHi: function() {
                // "this" is the "current object"
                return this.name;
            }
        }
        const user2 = {
            name: "user2",
            sayHi() {
                return this.name;
            }
        }

        const user3 = { name: "user3" }
        user3.sayHi = user2.sayHi

        expect(user1.sayHi()).toEqual("user1")
        expect(user2.sayHi()).toEqual("user2")
        expect(user3.sayHi()).toEqual("user3")
    })

    it('"this" can be used in any function unlike most other languages.', () => {
        const admin = { name: "admin" }
        function sayHi() {
            return this.name;
        }

        // the value of "this" is evaluated during the runtime, depending on the context.
        admin.func = sayHi;

        expect(sayHi()).toBeUndefined()
        expect(admin['func']()).toEqual("admin")
    })

    it('Arrow functions have no "this"', () => {
        const user = {
            firstName: "Rosie",
            // the outer normal function
            sayHi() {
                // this is not exist
                const arrow = () => this.firstName;
                return arrow()
            }
        }

        // arrow function takes "this" from the outer normal function.
        expect(user.sayHi()).toEqual("Rosie")
    })
})