/**
 * Partial<Type> / Required<Type>
 * - construct a type with all properties of <Type> set to optional.
 * - construct a type consisting of all properties of <Type> set to required.
 */
{
    interface Todo {
        title: string;
        description: string;
    }

    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
        return  {
            ...todo,
            ...fieldsToUpdate
        }
    }

    const today = {
        title: "organize desk",
        description: "clear clutter"
    }

    const tomorrow = updateTodo(today, {
        description: "throw out trash"
    })
}

/**
 * Readonly<Type>
 * - construct a type with all properties of <Type> set to readonly.
 */
{
    interface Todo {
        title: string
    }

    const todo = {
        title: "Delete inactive users"
    }

    const res: Readonly<Todo> = Object.freeze(todo)

    // Attempt to assign to const or readonly variable
    // res.title = "Hello";
}

/**
 * Record<Keys, Type>
 * - constructs an object type whose property keys are <Keys> and whose property values are <Type>.
 */
{
    type CatName = "miffy" | "boris" | "mordred";

    interface CatInfo {
        age: number;
        breed: string;
    }

    const cats: Record<CatName, CatInfo> = {
        miffy: { age: 10, breed: "Persian" },
        boris: {age: 5, breed: "Maine Coon"},
        mordred: {age: 16, breed: "British Shorthair"},
    }

    cats.boris;
}

/**
 * Pick<Type, Keys>
 * - constructs a type by picking the set of properties 'Keys' from 'Type'
 */
{
    interface Todo {
        title: string;
        description: string;
        completed: boolean;
    }

    type TodoPreview = Pick<Todo, "title" | "completed">

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false
    }
}

/**
 * Omit<Type, Keys>
 *     - constructs a type by picking all properties from 'Type' and then removing 'Keys'
 */
{
    interface Todo {
        title: string;
        description: string;
        completed: boolean
        createdAt: number;
    }

    type TodoPreview = Omit<Todo, "description">

    const todo: TodoPreview = {
        title: "Clean room",
        completed: false,
        createdAt: 161554425770
    }
}

/**
 * Exclude<UnionType, ExcludedMembers>
 *     - constructs a type by excluding from 'UnionType' all union members that are assignable to 'ExcludedMembers'
 * Extract<Type, Union>
 *     - constructs a type by extracting from 'Type' all union members that are assignable to 'Union'
 */
{
    // never
    type T0 = Exclude<"a" | "b" | "c", string>

    // "a"
    type T1 = Exclude<"a" | "b", "b">

    type Shape =
        | { kind: "circle"; radius: number }
        | { kind: "square"; x: number }
        | { kind: "triangle"; x: number; y: number}

    // square, triangle
    type T2 = Exclude<Shape, { kind: "circle"}>
}

/**
 * NonNullable<Type>
 *     - constructs a type by excluding 'null' and 'undefined' from 'Type'
 */
{
    // string | number
    type T0 = NonNullable<string | number | undefined>
    // string[]
    type T1 = NonNullable<string[] | null | undefined>
}

/**
 * Intrinsic String Manipulation Types
 * - Uppercase<StringType>
 * - Lowercase<StringType>
 * - Capitalize<StringType>
 * - Uncapitalize<StringType>
 */
