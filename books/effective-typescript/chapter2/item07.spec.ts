describe('Think of Types as Sets of Values', () => {
    interface Person {
        name: string;
    }

    it('type is a set of possible values', () => {
        // no values are assignable to a variable with never type
        let x: never;

        // literal types can contain single value
        type A = 'A';

        // union types can contain unions of sets of values
        type AB = 'A' | 'B';
        type AB12 = 'A' | 'B' |  12;
    })

    it('In the context of sets of values, "assignable" means either "member of" or "subset of".', () => {
        // value 'A' is a member of the set { 'A', 'B', 'C' }
        const abc: 'A' | 'B' | 'C' = 'A'
    })

    it('"&" operator computes the intersection of two types.', () => {{
        interface LifeSpan {
            birth: Date;
            death?: Date;
        }
        type PersonSpan = Person & LifeSpan;

        // union of properties - type operations apply to the sets of values, not to the properties in the interface.
        const ps: PersonSpan = {
            name: 'Alan Turing',
            birth: new Date('1912/06/23'),
            death: new Date('/1954/06/06')
        }

        expect(ps.name).not.toBeUndefined()
        expect(ps.birth).not.toBeUndefined()
        expect(ps.death).not.toBeUndefined()

        type K = keyof (Person | LifeSpan) // Type is never
    }})

    it('type extending is same as "subset of"', () => {
        // subtype of "Person"
        interface PersonSpan extends Person {
            birth: Date;
            death?: Date;
        }

        const ps: PersonSpan = {
            name: "subset",
            birth: new Date()
        }

        expect(ps.name).not.toBeUndefined()
        expect(typeof ps.name).toEqual("string")

        // subset of ~ assignable
        function getKey<K extends string>(val: any, key: K) {}
        getKey({}, 'x') // string literal
        getKey({}, Math.random() < 0.5 ? 'a' : 'b') // string union
        getKey({}, document.title) // string
    })

    it('union types may not fit into a hierarchy but cat be thought of in terms of sets of values.', () => {
        type sd = string | Date
        type sn = string | number
        const snv: sn = 12
    })
})