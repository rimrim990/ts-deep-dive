/**
 * The 'keyof' type operator
 * - takes an object type and produces a string or numeric literal union of its keys.
 */
{
    type Point = { x: number, y: number };
    type P = keyof Point;

    // if you use 'keyof' with 'string' or 'number' index signatures, it will return those types instead.
    type Arrayish = { [n: number]: unknown };
    type A = keyof Arrayish;
    const a: A = 1;

    type Mapish = { [k: string]: boolean };
    type M = keyof Mapish;
    const m: M = 'str';
}