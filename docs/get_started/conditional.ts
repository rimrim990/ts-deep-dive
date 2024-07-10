/**
 * Conditional Types.
 */
{
    interface Animal {
        live(): void
    }

    interface Dog extends Animal {
        woof(): void
    }

    type Ex1 = Dog extends Animal ? number : string;
    type Ex2 = RegExp extends Animal ? number : string;

    // using conditional types with generics
    interface IdLabel {
        id: number
    }

    interface NameLabel {
        name: string
    }

    type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel

    function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
        throw "NotImplemented";
    }

    const a = createLabel("typescript");
    const b = createLabel(2.3);
}

/**
 * ConditionalType Constraints.
 * - using type constraints can give more specific type.
 */
{
    type MessageOf<T> = T extends { message: unknown } ? T["message"] : never

    interface Email {
        message: string;
    }

    interface Dog {
        bark(): void
    }

    type EmailMessageContents = MessageOf<Email>
    type DogMessageContents = MessageOf<Dog>

    type Flatten<T> = T extends any[] ? T[number] : T;
    type Str = Flatten<string[]>
    type Num = Flatten<number>
}

/**
 * Interring Within Conditional Types.
 */
{
    // We can write some useful helper type aliases using the 'inter' keyword.
    // 'inter' declarations are only permitted in the 'extends' clauses of a conditional type.
    type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
    type ParamAndReturn<Type> = Type extends (...args: infer P) => infer R ? [P, R] : never;
    type GetFirstArgType<Type> = Type extends (arg: infer U, ...args: any) => any ? U : never;

    // infer return type of 'Type' and assign it to the type variable 'Return'.
    type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
    type Num = GetReturnType<() => number>

    // when inferring from a type with multiple call signatures, inferences are made from the last signature.
    function stringOrNum(x: string): number;
    function stringOrNum(x: number): string;
    function stringOrNum(x: string | number): number | string {
        return 'length' in x ? x.length : 'length';
    }

    type T1 = ReturnType<typeof stringOrNum>
}

/**
 * Distributed Conditional Types.
 * - when conditional types act on a generic type, they become distributive when given a union type.
 */
{
    type ToArray<Type> = Type extends any ? Type[] : never;
    
    // conditional type will be applied to each member of union. - string[] | number[]
    type StrArrOrNumArr = ToArray<string | number>

    // to avoid distribution, you can surround each side of the 'extends' keyword with square brackets. - (string | number)[]
    type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
    type ArrOfStrOrNum = ToArrayNonDist<string | number>
}