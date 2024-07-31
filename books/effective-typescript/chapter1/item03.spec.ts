describe('Understand that code generation is independent of types', () => {
    it('You cannot check TypeScript types at runtime.', () => {
        // TypeScript types are erasable
        interface Square {
            width: number;
        }
        interface Rectangle extends Square {
            height: number;
        }
        type Shape = Square | Rectangle;

        const shape: Shape = {
            width: 12,
            height: 21
        }

        // runtime property checks
        if ('height' in shape) expect(shape.height).toBe(21)
    })

    it('Type operations cannot affect runtime values.', () => {
        const numOrStr: number | string = '12'

        // type assertion
        expect(numOrStr as number).not.toEqual(12)
        // check runtime type
        expect(typeof(numOrStr) === "string" ? Number(numOrStr) : numOrStr).toEqual(12)
    })

    it('You cannot overload a function based on TypeScript types.', () => {
        function add(a: number, b: number): number;
        function add(a: string, b: string): string;
        function add(a, b) { return a + b; }

        const three = add(1,2)
        const twelve = add('1', '2')

        expect(three).toEqual(3)
        expect(twelve).toEqual('12')
    })
})