describe('Arrow functions revisited', () => {
    it('If "this" is accessed in arrow function, it is taken from the outside.', () => {
        const group = {
            title: "Our Group",
            students: ["John", "Pete", "Alice"],
            showList() {
                // "this" is undefined by default
                return this.students.map(
                    student => `${this.title}:${student}`
                )
            },
            showListFunc() {
                return this.students.map(function(student) {
                    return `${this.title}:${student}`
                })
            }
        }

        expect(group.showList()).toEqual(expect.arrayContaining(['Our Group:John', 'Our Group:Pete', 'Our Group:Alice']))
        expect(group.showListFunc()).toEqual(expect.arrayContaining(['undefined:John', 'undefined:Pete', 'undefined:Alice']))
    })

    it('Arrow functions also have no "arguments" variable.', () => {
        function defer_arrow(arr, f) {
            return function() {
                // arguments contain the values of the arguments passed to that function.
                // it is a local object available within all non-arrow functions.
                return arr.map(val => f.apply(this, [val, ...arguments]))
            }
        }
        function defer_func(arr, f) {
            return function(...args) {
                const ctx = this;
                return arr.map(function(val) {
                    return f.apply(ctx, [val, ...args])
                })
            }
        }

        const arr = ['one', 'two', 'three']
        const admin = {
            id: 'admin'
        }
        const func = function(name, tag) {
            return `${name}:${this.id}:${tag}`
        }

        admin.defer_arrow = defer_arrow(arr, func);
        admin.defer_func = defer_func(arr, func);

        expect(admin.defer_arrow('arrow'))
            .toEqual(expect.arrayContaining(['one:admin:arrow', 'two:admin:arrow', 'three:admin:arrow']))
        expect(admin.defer_func('func'))
            .toEqual(expect.arrayContaining(['one:admin:func', 'two:admin:func', 'three:admin:func']))
    })
})