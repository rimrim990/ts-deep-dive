describe('Prototype', () => {
    describe('Prototypal inheritance', () => {
        let animal;

        const rabbit = {
            jumps: true,
        }
        const cat = {
            name: "cat"
        }

        beforeEach(() => {
            animal = {
                eats: true,
                isSleeping: false,
                walk() {
                    return this.name;
                },
                sleep() {
                    this.isSleeping = true;
                },
                getAge() {
                    return 5;
                }
            };
        });


        it('All objects have a hidden property named [[Prototype]].', () => {
            const obj = {
                name: 'any object'
            }

            // either null or references
            expect(Object.getPrototypeOf(obj)).not.toBeNull()
        })

        it('If any property is missing in the current object, Javascript searches for it in the prototype of the object and its prototype chain.', () => {
            Object.setPrototypeOf(rabbit, animal);

            // 'rabbit' inherits methods and properties from 'animal'.
            expect(rabbit.eats).toBeTruthy()
            expect(rabbit.getAge()).toEqual(5);
            expect(Object.getPrototypeOf(rabbit)).toEqual(animal);
        })

        it('"this" is not affected by prototypes at all.', () => {
            const dog = {}
            Object.setPrototypeOf(cat, animal);
            Object.setPrototypeOf(dog, animal);
            cat.sleep();

            // "this" is always the object before the dot.
            expect(cat.walk()).toEqual("cat")
            expect(cat.isSleeping).toBeTruthy()
            expect(dog.walk()).toBeUndefined()
        })

        it('"for...in" loop iterates over inherited properties too.', () => {
            Object.setPrototypeOf(rabbit, animal)

            const keys = Object.keys(rabbit);
            const props = []
            for (const prop in animal) props.push(prop)

            expect(keys).toEqual(expect.arrayContaining(['jumps']))
            expect(props).toContain("eats")
        })

        it('You can filter out inherited properties using "hasOwnProperty".', () => {
            Object.setPrototypeOf(rabbit, animal)

            const props = []
            for (const prop in rabbit) {
                if (rabbit.hasOwnProperty(prop))
                    props.push(prop)
            }

            expect(props).toEqual(expect.arrayContaining(['jumps']))
        })
    })

    describe('Function.prototype', () => {
        const animal = {
            eats: true,
        };

        it('If constructor Function\'s prototype property is an object, it will be the new object\'s [[Prototype]].', () => {
            function Rabbit(name) {
                this.name = name;
            }
            // regular property.
            Rabbit.prototype = animal;

            // when a 'new Rabbit' is created, its [[Prototype]] will be assigned to 'animal'. (inheritance)
            const rabbit = new Rabbit('White Rabbit');

            expect(rabbit.__proto__).toEqual(animal);
            expect(rabbit.eats).toBeTruthy();
        })

        it('Default F.prototype is an object with the only property constructor that points back to the function itself.', () => {
            /**
             * default prototype
             * Rabbit.prototype = { constructor: Rabbit };
             */
            function Rabbit() {}
            const rabbit = new Rabbit();

            expect(rabbit.__proto__.constructor).toEqual(Rabbit);
            expect((new rabbit.constructor()).constructor).toEqual(Rabbit);
            expect((new rabbit.constructor()).__proto__).toEqual(Rabbit.prototype);

            // // https://javascript.info/function-prototype
            console.log((new rabbit.constructor()).__proto__)
            // expect((new rabbit.constructor()).__proto__).toBeInstanceOf(Object);
        })

        it ('Javascript itself does not ensure the right constructor value.', () => {
            function Rabbit() {}
            Rabbit.prototype = {
                jumps: true
            }

            const rabbit = new Rabbit();

            expect(rabbit.constructor).not.toEqual(Rabbit);
            expect(rabbit.jumps).toBeTruthy();
        })
    })

    describe('Native prototypes', () => {
        it('Creating an object using object literal is the same as creating one using the Object constructor.', () => {
            const literal = {}
            // built-in object constructor function
            const constructor = new Object()

            expect(literal.toString).toEqual(constructor.toString)
            expect(literal.__proto__).toEqual(Object.prototype)
            // there's no more [[Prototype]] in the chain above Object.prototype.
            expect(Object.prototype.__proto__).toBeNull()
        })

        /**
         * The methods are stored in the prototype. ex. Array.prototype, Object.prototype etc.
         * The object itself stores only the data. ex. array items, object properties.
         */
        it('Many built-in objects keep their methods in prototypes.', () => {
            const array = [1,2,3]
            const date = new Date();
            const func = new Function()

            expect(array.push).toEqual(Array.prototype.push)
            expect(date.getTime).toEqual(Date.prototype.getTime)
            expect(func.call).toEqual(Function.prototype.call)
        })

        it('Native prototypes can be modified, but it\'s generally a bad idea.', () => {
            String.prototype.show = function() {
                return this.toString();
            }

            expect("BOOM".show()).toEqual("BOOM")
        })

        /**
         * Polyfilling
         * making substitues for a method that exists in the JavaScript specification,
         * but is not yet supported by a particular JavaScript engine.
         */
    })
})
