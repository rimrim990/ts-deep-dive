/**
 * Enums
 */

/**
 * Numeric Enums
 */
{
    enum Direction {
        Up = 1,
        Down, // auto-incremented
        Left,
        Right,
    }

    enum UserResponse {
        No = 0, // default initial value is 0
        Yes = 1,
    }

    function respond(recipient: string, message: UserResponse): void {
        console.log(`message ${message} to ${recipient}`)
    }
    respond("Princess Caroline", UserResponse.Yes)
}

/**
 * String Enums
 * - each member has to be constant-initialized with a string literal, or with another string enum member.
 */
{
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }
}

/**
 * Union enums and enum member types
 */
{
    // using enum member as a type
    enum ShapeKind {
        Circle,
        Square
    }

    interface Circle {
        kind: ShapeKind.Circle
        radius: number
    }

    interface Square {
        kind: ShapeKind.Square,
        sideLength: number;
    }

    // enum types themselves effectively become a union of each enum member.
    enum E {
        Foo,
        Bar,
    }

    function f(x: E) {
        if (x !== E.Foo || x !== E.Bar) {
         // Condition is always true since types 'E.Foo' and 'E.bar' have no overlap.
        }
    }
}

/**
 * Enums at runtime / compile time
 */
{
    // at runtime, enums are treated as un object
    enum E {
        X,
        Y,
        Z
    }

    function f(obj: { X: number }) {
        return obj.X
    }

    // 'E' has a property named 'X' which is a number.
    f(E)

    // Even though Enums are object at runtime, the 'keyof' keyword works differently than you might expect for typical object.
    enum LogLevel {
        ERROR,
        WARN,
        INFO,
        DEBUG
    }

    // 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
    type LogLevelStrings = keyof typeof LogLevel

    // Reverse mappings - from enum values to enum names
    enum Enum {
        A
    }

    let a = Enum.A
    let nameOfA = Enum[a] // "A"

    // compiled TypeScript
    // an enum is compiled into an object that stores both forward and reverse mappings.
    var Enum;
    (function (Enum) {
       Enum[Enum["A"] = 0] = "A";
    })(Enum || (Enum = {}))
}

/**
 * 'const' enums
 * - use to avoid paying the cost of extra generated code and additional indirection when accessing enum values.
 */
{
    // 'const' enums are completely removed during compilation
    const enum Enum {
        A = 1,
        B = A * 2
    }
}

/**
 * Objects vs Enums
 */
{
    // In modern TypeScript, you may not need an enum when an object with 'as const' could suffice.
    const enum EDirection {
        Up,
        Down,
        Left,
        Right
    }

    // 0, 1, 2, 3
    let directions = [EDirection.Up, EDirection.Down, EDirection.Left, EDirection.Right]

    const ODirection = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3
    } as const;

    type Direction = typeof ODirection[keyof typeof ODirection]
    function walk(dir: Direction) {}

    walk(EDirection.Up)
}

