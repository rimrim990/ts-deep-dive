/**
 * Decorators
 * - support annotation or modifying classes and class members.
 * - can be attached to a class declaration, method, accessor, property or parameter.
 */
{
    function color(value: string) {
        // decorator factory
        return function(target) {
            // decorator
        }
    }
}

/**
 * Decorator Composition
 */
{
    function first(): PropertyDecorator {
        console.log('first(): factory evaluated') // (1)
        return function() {
            console.log('first(): called') // (3)
        }
    }

    function second(): PropertyDecorator {
        console.log('second(): factory evaluated') // (2)
        return function() {
            console.log('second(): called') // (4)
        }
    }

    class ExampleClass {
        @first()
        @second()
        method() {}
    }
}

/**
 * Class Decorators
 * - will be called as a function at runtime, with the constructor of the decorated class
 */
{
    // decorator does not change the TypeScript type
    function sealed(constructor: Function) {
        Object.seal(constructor)
        Object.seal(constructor.prototype)
    }

    // prevent any further functionality from being added to or removed from the class during runtime
    @sealed
    class BugReport {
        type = "report"
        title: string;

        constructor(t: string) {
            this.title = t;
        }
    }
}

/**
 * Method Decorators
 */
{
    // modifies the enumerable property of the property descriptor
    function enumerable(value: boolean): MethodDecorator {
        return function(target, propertyKey, descriptor) {
            descriptor.enumerable = value;
        }
    }

    class Greeter {
        greeting: string;

        constructor(message: string) {
            this.greeting = message;
        }

        @enumerable(false)
        greet() {
            return `Hello, ${this.greeting}`
        }
    }
}

/**
 * Metadata
 * - adds additional information at runtime.
 */
{
    class Point {
        constructor(public x: number, public y: number) {
        }
    }

    class Line {
        private _start: Point;
        private _end: Point;

        @validate
        @Reflect.metadata("design:type", Point)
        set start(value: Point) {
            this._start = value;
        }

        get start() {
            return this._start;
        }

        @validate
        @Reflect.metadata("design:type", Point)
        set end(value: Point) {
            this._end = value;
        }

        get end() {
            return this.end;
        }
    }

    const validate: MethodDecorator = <T>(target, propertyKey, descriptor) => {
     let set = descriptor.set!;

     descriptor.set = function(value) {
         const type = Reflect.getMetadata("design:type", target, propertyKey)

         if (!(value instanceof type)) {
             throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}`)
         }

         set.call(this, value)
     }
    }

    const line = new Line()
    line.start = new Point(0, 0)
}