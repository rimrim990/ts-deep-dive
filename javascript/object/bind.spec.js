describe('Function binding', () => {
    it('If a method is passed somewhere separately from the object, "this" is lost', () => {
        const user = {
            firstName: "John",
            sayHi() {
                return `Hello, ${this.firstName}`
            }
        }
        const f = user.sayHi
        expect(f()).toEqual(`Hello, undefined`)
    })

    it('Use built-in "bind" method to fix "this".', () => {
      const user = {
          firstName: "John"
      }
      function getHi() {
          return `Hi, ${this.firstName}`
      }

      const getUserHi = getHi.bind(user);

      expect(getHi()).toEqual(`Hi, undefined`)
      expect(getUserHi()).toEqual(`Hi, John`)
    })

    it('We can bind not only "this", but also arguments.', () => {
        function partial(func, ...argsBound) {
            return function(...args) {
                return func.call(this, ...argsBound, ...args)
            }
        }

        const user = {
            name: "John",
            say(time, phrase) {
                return `[${time}] ${this.name}: ${phrase}!`
            }
        }

        user.sayNow = partial(user.say, "2024-11-06")

        expect(user.sayNow("Hello")).toEqual("[2024-11-06] John: Hello!")
    })
})