/**
 * CLass Members
 */
{
    // declare public writable property on a class.
    class Point {
        x: number;
        y: number;
    }

    const pt = new Point();
    pt.x = 0;
    pt.y = 0;

    // readonly property.
    class Greeter {
        readonly name: string = "world";

        constructor(otherName?: string) {
            if (otherName !== undefined) {
                this.name = otherName;
            }
        }
    }

    const g = new Greeter()
    // g.name = 'not ok'
}

/**
 * Constructor
 */
{
    class ValidationError extends Error {
        printCustomMessage() {
            return `Validation failed:-( (details: ${this.message})`
        }
    }

    // default constructor
    throw new ValidationError("Not a valid phone number")

    // Constructor overloads with default values.
    class Point {
        x: number = 0;
        y: number = 0;

        constructor(x: number, y: number);
        constructor(xy: string);
        constructor(x: string | number, y: number = 0) {
            // code logic here.
        }
    }

    // derived class have to call super() in the constructor body before using any 'this.' members.
    class Base {
        k = 4;
    }

    class Derived extends Base {
        constructor() {
            // 'this' is not allowed before superclass constructor invocation
            // console.log(this.k)
            super();
            console.log(this.k)
        }
    }
}

/**
 * Methods
 */
{
    let x: number = 0;

    class C1 {
        x: string = "hello";

        m() {
            //  This is trying to modify 'x' from line 1, not the class property;
            // x = "world";
        }
    }

    // accessors
    class C2 {
        _length = 0;
        get length() {
            return this._length
        }
        set length(value) {
            this._length = value;
        }
    }

    // declare index signatures in the class.
    class MyClass {
        [s: string]: boolean | ((s: string) => boolean)

        check(s: string) {
            return this[s] as boolean;
        }
    }

    const mc = new MyClass()
}

/**
 * Class Heritage
 */
{
    // un 'implements' clause is a check that the class can be treated as the interface type.
    // It doesn't change the type of the class or its method at all.
    interface Checkable {
        check(name: string): boolean;
    }

    class NameChecker implements Checkable {
        // Parameter 's' implicitly has an 'any' type.
        check(s) {
            return s.toLowerCase() === "ok";
        }
    }

    // implementing an interface with an optional property doesn't create that property.
    interface A {
        x: number;
        y?: number;
    }

    class C implements A {
        x = 0;
    }
    const c = new C();
    // property 'y' does not exist on type 'C'.
    // c.y = 10;

    // a derived class has all the properties and methods of its base class.

    // type-only field declarations.
    interface Animal {
        dateOrBirth: any;
    }

    interface Dog extends Animal {
        breed: any;
    }

    class AnimalHouse {
        resident: Animal;
        constructor(animal: Animal) {
            this.resident = animal;
        }
    }

    class DogHouse extends AnimalHouse {
        // does not emit JavaScript code, only ensures the types are correct.
        declare resident: Dog;
        constructor(dog: Dog) {
            super(dog);
        }
    }
}

/**
 * Member Visibility
 */
{
    // public

    // protected - only visible to subclasses of the class they're declared in.
    class Greeter {
        protected m = 10;

        public greet() {
            console.log("Hello, " + this.getName());
        }
        protected getName() {
            return "hi";
        }
    }

    class SpecialGreeter extends Greeter {
        // change a super class property's visibility to public
        m = 15;

        public howdy() {
            console.log("Howdy, " + this.getName())
        }
    }

    // private - only allow access to the members even from subclasses.
    // TypeScript allow cross-instance 'private' access.
    class A {
        private x = 10;
        public sameAs(other: A) {
            // No error
            return other.x === this.x;
        }
    }

    // 'private' and 'protected' are only enforced during type checking. ('soft private')
    const a = new A()
    a['x'] = 12; // OK

    // JavaScript's private fields remain private after compilation and do not provide the escape hatches.
    // When compiling to ES2021 or less, TypeScript will use WeakMaps in place of '#'
    class Dog {
        #barkAmount = 0;
    }

    // to offer hard runtime private, you should use mechanisms such as closures, WeakMaps, or private fields.
    // these added privacy checks during runtime could affect performance.
}

/**
 * Static Members
 * - they can be accessed through the class constructor object itself.
 */
{
    class MyClass {
        static x = 0;
        static printX() {
            console.log(MyClass.x)
        }
    }
    MyClass.printX()

    // static blocks in classes
    class Foo {
        static #count = 0;

        static {
            Foo.#count += 1
        }
    }

    // the static members of a generic class can never refer to the class's type.
    class Box<Type> {
        // static defaultValue: Type;
    }

    // arrow functions will use more memory, because each class instance will have its own copy of each function defined this way.
    class MyClass {
        name = "MyClass";
        getName = () => {
            return this.name;
        }
    }

    const c = new MyClass()
    const g = c.getName
    console.log(g()) // "My Class"

    // 'this' parameters are erased during compilation.
    class MyClass {
        name = "MyClass"

        // Only one function per class definition gets allocated, rather than one per class instance.
        getName(this: MyClass) {
            return this.name;
        }
    }

    const c2 = new MyClass()
    c2.getName()

    const g2 = c2.getName
    // The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'
    g2()
}

/**
 * 'this' Types
 * - In classes, a special type called 'this' refers dynamically to the type of the current class.
 */
{
    class Box {
        contents: string = "";

        // return type is 'this' rather than Box
        set(value: string) {
            this.contents = value;
            return this;
        }
    }

    class ClearableBox extends Box {
        clear() {
            this.contents = "";
        }
    }

    const a = new ClearableBox();
    const b = a.set("hello") // return type is 'ClearableBox'

    // 'this' as a parameter
    // this is different from writing 'other: Box'
    class Gift {
        content: string = "";
        sameAs(other: this) {
            return other.content === this.content;
        }
    }

    // 'this'-based type guards.

}