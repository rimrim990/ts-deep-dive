/**
 * Mapped Types
 * - define a type based on another type.
 */
{
    // iterate keys to create a type
    type OptionsFlags<Type> = {
        [Property in keyof Type]: boolean;
    }

    type Features = {
        darkMode: () => void;
        newUserProfile: () => void;
    }

    // { darkMode: boolean; newUserProfile: boolean }
    type FeatureOptions = OptionsFlags<Features>
}

/**
 * Mapping Modifiers
 * - remove or add 'readonly' and '?' by prefixing with '-' or '+'
 */
{
    type CreateMutable<Type> = {
        -readonly [Property in keyof Type]: Type[Property];
    }

    type LockedAccount = {
        readonly id: string;
        readonly name: string;
    }

    type UnlockedAccount = CreateMutable<LockedAccount>
}

/**
 * Key Remapping vis 'as'
 * - you can re-map keys in mapped types with an 'as' clause in a mapped type
 * - 'as' syntax is used within mapped types to specify additional transformations or conditions. (ex. [Key in Type as NewKey])
 */
{
    // (Symbol | string | number) & string
    // = (Symbol & string) | (string & string) | (number & string), union is distributive in TS.
    type Getters<Type> = {
        [Property in keyof Type as `get${Capitalize<Property & string>}`]: () => Type[Property]
    }

    interface Person {
        name: string;
        age: number;
        location: string;
    }

    // { getName: () => string; getAge: () => number; getLocation: () => string }
    type LazyPerson = Getters<Person>;

    // you can filter out keys by producing 'never' via a conditional type.
    // Exclude<Property, "kind"> utility type excludes 'kind' from the union of property names.
    type RemoveKindField<Type> = {
        [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
    }

    interface Circle {
        kind: "Circle";
        radius: number;
    }

    // { radius: number; }
    type KindlessCircle = RemoveKindField<Circle>

    // iterates over each type 'E' in the union type 'Events'
    type EventConfig<Events extends { kind: string}> = {
        [E in Events as E["kind"]]: (event: E) => void;
    }

    type SquareEvent = { kind: "square", x: number; y: number };
    type CircleEvent = { kind: "circle", radius: number }

    // { square: (event: SquareEvent) => void; circle: (event: CircleEvent) => void }
    type Config = EventConfig<SquareEvent | CircleEvent>
}

/**
 * Mapped types with conditional type.
 */
{
    type ExtractPII<Type> = {
        [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
    }

    type DBFields = {
        id: { format: "incrementing" }
        name: { type: string, pii: true };
    }
    // { id: false; name: true }
    type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>
}