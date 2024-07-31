describe('Get Comfortable with Structural Typing', () => {
    it('JavaScript is inherently duck types.', () => {
        interface Vector2D {
            x: number;
            y: number;
        }

        function calculateLength(v: Vector2D) {
            return Math.sqrt(v.x ** 2 + v.y ** 2);
        }

        interface NamedVector {
            name: string;
            x: number;
            y: number;
        }

        const v: NamedVector = { x: 3, y: 4, name: 'Zee' }
        // NamedVector structure is compatible with Vector2D. (structural typing)
        expect(calculateLength(v)).toEqual(5)
    })

    it('Classes are also compared structurally.', () => {
        class C {
            foo: string;
            constructor(foo: string) {
                this.foo = foo;
            }
        }

        const d: C = { foo: 'object literal' }

        expect(typeof d.foo).toEqual('string')
        expect(d.constructor).not.toBeUndefined()
    })

    it('Structural typing is beneficial when you are writing tests.', () => {
        interface Author {
            first: string;
            last: string;
        }
        interface PostgresDB {
            runQuery:  (sql: string) => any[];
        }

        function getAuthors(database: PostgresDB): Author[] {
            const authorRows = database.runQuery("SELECT FIRST, LAST FROM AUTHORS")
            return authorRows.map(row => ({first: row[0], last: row[1]}))
        }

        const authors = getAuthors({
            runQuery: () => [['Toni', 'Morrison']]
        })
        expect(authors).toHaveLength(1)
        expect(authors[0].first).toEqual('Toni')
        expect(authors[0].last).toEqual('Morrison')
    })
})