describe('Property getters and setters', () => {
    it('Getters and setters are accessor properties.', () => {
        const obj = {
            firstName: 'roseanne',
            lastName: 'park',
            get fullName() {
                return `${this.firstName} ${this.lastName}`
            },
            set fullName(fullName) {
                const [firstName, lastName] = fullName.split(" ")
                this.firstName = firstName;
                this.lastName = lastName;
            }
        }

        // virtual property "fullName"
        expect(obj.fullName).toEqual('roseanne park')
        obj.fullName = 'Alice Cooper'
        expect(obj.firstName).toEqual('Alice')
        expect(obj.lastName).toEqual('Cooper')
    })

    it('You can use a setter property for validation check.', () => {
        const user = {
            get age() {
                return this._age;
            },
            set age(value) {
                if (value < 0) {
                    throw new Error('age must be greater than or equal to 0.')
                }
                this._age = value
            },
            _age: 20
        }

        expect(() => {
            user.age = -2
        }).toThrowError('age must be greater than or equal to 0')
    })

    it('You can use a getter property for compatability.', () => {
        function User(name, birthday) {
            this.name = name;
            this.birthday = birthday;

            // defined for legacy age property
            Object.defineProperty(this, "age", {
                get() {
                    const currentYear = new Date().getFullYear();
                    return currentYear - this.birthday.getFullYear()
                }
            })
        }

        const user = new User('Roseanne', new Date(1999, 7, 18))

        expect(user.age).toEqual(25)
    })
})