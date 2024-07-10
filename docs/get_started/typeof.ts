/**
 * Typeof Type Operator
 * - refer to the type of variable or property.
 */
{
    const s = "hello";
    const n: typeof s = "world";

    type Predicate = (x: unknown) => boolean;
    type K = ReturnType<Predicate>;

    function f() {
        return {x: 10, y: 3}
    }

    // values and types aren't same thing. To refer to the type of value, use 'typeof'
    // type P = ReturnType<f>
    type P = ReturnType<typeof f>
}