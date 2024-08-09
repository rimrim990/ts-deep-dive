/**
 * Symbols
 * - In ECMAScript 2015, 'symbol' is a primitive data type, just like 'number' and 'string'.
 */
{
    let sym1 = Symbol()
    let sym2 = Symbol("key")

    // symbols are immutable, and unique.
    let sym3 = Symbol("key")

    console.log(sym2 === sym3) // false, symbols are unique.

    // symbols can be used as keys for object properties.
    let obj = {
        [sym1]: "symbol1",
        [sym2]: "symbol2"
    }

    class SymbolClass {
        [sym3]() {
            return "Symbol"
        }
    }

    let s = new SymbolClass()
    console.log(s[sym3]()) // "symbol"
}

/**
 * unique symbol
 * - subtype of 'symbol'
 * - this type is only allowed on 'cost' declarations and 'readonly static' properties
 */
{
    const sym: unique symbol = Symbol()

    class C {
        static readonly StaticSymbol: unique symbol = Symbol.for("StaticSymbol")
    }

    // no two 'unique symbol' types are assignable or comparable to each other.
}