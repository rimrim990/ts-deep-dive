describe('타입 단언보다는 타입 선언을 사용하기', () => {
    interface Person {
        name: string
    }

    it('타입 단언보다는 타인 선언을 사용한다.', () => {
        const alice: Person = {name: 'Alice'}
        // 타입을 강제로 지정, 잉여 속성 체크 동작 X
        const bob = {age: 12} as Person

        expect(bob.name).toBeUndefined()
    })

    it('화살표 함수를 사용할 때 타입 단언보다는 타입 선언을 사용하라.', () => {
        const people = ['alice', 'bob', 'jan'].map<Person>(name => ({name}));
        expect(people[0]).toEqual("alice")
    })

    it('서브타입이 아닌 타입을 단언문으로 변환할 수 없다.', () => {
        const body = document.body;
        // 모든 타입은 unknown 의 subtype 이므로 항상 동작
        const el = body as unknown as Person
    })
})