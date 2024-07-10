/**
 * Indexed Access Types.
 *
 */
{
    // refer to type of specific property
    type Person = { age: number; name: string; alive: boolean }
    type Age = Person["age"];

    type I1 = Person["age" | "name"]
    type I2 = Person[keyof Person]

    // using number type to get the type of array's elements.
    const MyArray = [
        {name: "Alice", age: 15},
        {name: "Bob", age: 23},
        {name: "Eve", age: 38}
    ]

    type Me = typeof MyArray[number];
    type MyAge = typeof MyArray[number]["age"]

    // you can only use types when indexing.
    const key = "age";

    // 'key' refers to a value, but is being used as a type here.
    // type Age = Person[key];
}
