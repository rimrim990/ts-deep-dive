describe('WeakMap Test', () => {
    /**
     * WeakMap
     * - a collection of key/value paris whose keys must be objects or non-registered symbols.
     * - in 'WeakMap', if their key objects are not references from somewhere other than a 'WeakMap', it allows GC of any values.
     * - a 'WeakMap' doesn't allow observing the liveness of its keys, which is why it doesn't allow enumeration.
     */
    it('WeakMap 생성', () => {
        const wm = new WeakMap();
        const o1 = {};
        const o2 = function(){};

        wm.set(o1, 37)
        wm.set(o2, "azerty")

        expect(wm.get(o1)).toEqual(37)
        expect(wm.has(o2)).toEqual(true)
    })

    /**
     * Emulating private members.
     * - developers can use a 'WeakMap' to associated private data to an object.
     * +) WeakMap does not hold strong references to the object used as the key, so the metadata shares the same lifetime as the object itself, avoiding memory leaks.
     * +) There's no way for user code to retrieve the metadata through reflective methods. ex. 'Object.getOwnPropertySymbols'
     * +) The same WeakMap can be reused for all instance created from constructor, making it more memory-efficient.
     */
    it('WeakMap private 멤버', () => {
        let Thing;

        {
            const privateScope = new WeakMap();
            let counter = 0;

            Thing = function () {
                this['someProperty'] = "foo";

                privateScope.set(this, {
                    hidden: ++counter
                })
            }

            Thing.prototype.showPublic = function() {
                return this['someProperty'];
            }

            Thing.prototype.showPrivate = function () {
                return privateScope.get(this).hidden;
            }
        }

        const thing = new Thing();

        expect(thing.showPublic()).toEqual("foo")
        expect(thing.showPrivate()).toEqual(1)
    })
})