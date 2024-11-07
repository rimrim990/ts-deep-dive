describe('Property flags and descriptors', () => {
    it('Object has three special attributes.', () => {
        // writable: can be changed
        // enumerable: listed in loops
        // configurable: can be deleted or modified
        const obj = {
            name: 'Hello'
        }

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'name')

        // all attributes are true by default
        expect(descriptor).toEqual(expect.objectContaining({
            value: 'Hello',
            writable: true,
            enumerable: true,
            configurable: true
        }))
    })

    it('Object property attribute can be modified.', () => {
        const user = {};

        Object.defineProperty(user, "name", {
            value: "Hello"
        })

        const descriptor = Object.getOwnPropertyDescriptor(user, 'name')
        // It a flag is not supplied, it is assumed "false".
        expect(descriptor).toEqual(expect.objectContaining({
            value: 'Hello',
            writable: false,
            enumerable: false,
            configurable: false
        }))
    })

    it('If the writable property is set to false, the value of that property value cannot be modified.', () => {
        const user = {
            name: 'Hello'
        };

        Object.defineProperty(user, 'name', {
            writable: false
        })

        // errors appear only in strict mode
        user.name = 'Good'
        expect(user.name).toEqual('Hello')
    })

    it('Non-enumerable value is not show up in for..in loop.', () => {
        const user = {
            name: 'Hello',
            age: 25,
        }

        Object.defineProperty(user, 'name', {
            enumerable: false
        })

        expect(Object.keys(user)).toEqual(["age"])
    })

    it('Non-configurable value cannot be deleted and its attributes cannot be modified.', () => {
        Math.PI = 123
        delete Math.PI
        const descriptor = Object.getOwnPropertyDescriptor(Math, 'PI')

        expect(Math.PI).not.toBeUndefined()
        expect(Math.PI).not.toEqual(123)

        // Once we make the property non-configurable, we cannot change it back.
        expect(descriptor).toEqual(expect.objectContaining({
            'writable': false,
            'enumerable': false,
            'configurable': false
        }))
        expect(() => Object.defineProperty(Math, 'PI', {
            writable: true
        })).toThrowError(TypeError("Cannot redefine property: PI"))
    })

    it('Object.getOwnPropertyDescriptors returns all property descriptors including symbolic and non-enumerable ones.', () => {
        const user = Object.defineProperties({}, {
            'name': {enumerable: true, value: 'Hello'},
            'age': {value: 25}
        })

        const simpleClone = Object.keys(user);
        const deppClone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));

        expect(simpleClone.age).toBeUndefined()
        expect(deppClone.name).toBe('Hello')
    })

    it('There are methods that limit access to the whole object.', () => {
        // set 'configurable: false' for all existing properties.
        const seal = {
            name: 'hello',
            age: 25
        }
        // set 'configurable: false, writable: false' for all existing properties.
        const freeze = {
            name: 'hello',
            age: 25
        }

        Object.seal(seal)
        Object.freeze(freeze)

        const sealedDescriptor = Object.getOwnPropertyDescriptors(seal);
        const frozenDescriptor = Object.getOwnPropertyDescriptors(freeze)

        expect(sealedDescriptor.age).toEqual(expect.objectContaining({configurable: false}))
        expect(sealedDescriptor.name).toEqual(expect.objectContaining({configurable: false}))
        expect(frozenDescriptor.name).toEqual(expect.objectContaining({configurable: false, writable: false}))
        expect(frozenDescriptor.name).toEqual(expect.objectContaining({configurable: false, writable: false}))
    })
})