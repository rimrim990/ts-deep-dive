/**
 * Generic Types
 */
{
    function identity<Type>(arg: Type): Type {
        return arg;
    }

    const gen1: <Input>(arg: Input) => Input = identity;

    // call signature of an object literal type.
    const gen2: { <Input>(arg: Input): Input } = identity;

    interface GenericIdentityFn<Type> {
        (arg: Type): Type;
    }
}

/**
 * Generic Classes
 */
{
    class GenericNumber<NumType> {
        // Static members cannot reference class type parameters
        // static cannotUseGeneric: NumType;

        zeroValue: NumType;
        add: (x: NumType, y: NumType) => NumType;
    }

    // generic classes are only generic over their 'instance side' rather than their 'static side'.
    const myGenNumber = new GenericNumber<number>();
    myGenNumber.zeroValue = 0;
    myGenNumber.add = function (x, y) {
        return x + y;
    }

    // static members can not use the class's type parameter.
}

/**
 * Generic Constraints
 */
{
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
        arg.length;
        return arg;
    }

    // a type parameter constrained by another type parameter.
    function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
        return obj[key];
    }

    const x = {a: 1, b: 2, c: 3}
    getProperty(x, 'a')
}

/**
 * Using Class Types in Generic
 */
{
    // refer class types using their constructor functions.
    function create<Type>(c: { new(): Type }): Type {
        return new c();
    }

    // use the prototype property to infer and constraint relations between the constructor function and the instance side of class types.
    class BeeKeeper {
        hasMask: boolean = true;
    }

    class ZooKeeper {
        nametag: string = "Mikle";
    }

    class Animal {
        numLegs: number = 4;
    }

    class Bee extends Animal {
        numLegs = 6;
        keeper: BeeKeeper = new BeeKeeper()
    }

    class Lion extends Animal {
        keeper: ZooKeeper = new ZooKeeper();
    }

    function createInstance<A extends Animal>(c: new () => A): A {
        return new c();
    }

    createInstance(Lion).keeper.nametag;
    createInstance(Bee).keeper.hasMask;
}

/**
 * Generic Parameter Defaults
 */
{
    // a type parameter is deemed optional if it has a default.
    type create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]> = (
        element: T,
        children: U,
    ) => T[];

    const createFn: create<HTMLParagraphElement> = (elem) => {
        return [elem] as HTMLParagraphElement[]
    }
}