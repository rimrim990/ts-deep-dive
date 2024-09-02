describe('타입과 인터페이스 차이점 알기', () => {
    it('인터페이스는 복잡한 타입을 확장하지 못한다.', () => {
        // 유니온 타입, 인터페이스 (X)
        type AorB = { index: 'a' | 'b' };
        type NamedVariable = AorB & { name: string };

        const variable: NamedVariable = {
            index: 'a',
            name: 'var'
        };

        expect(variable.name).not.toBeUndefined()
    })

    it('type 키워드로 튜플과 배열 타입 간결하게 표현 가능하다.', () => {
        type Pair = [number, number];
        type NamedNums = [string, ...number[]];

        const nums: NamedNums = ['0', 1, 2, 3]

        expect(typeof nums[0]).toEqual("string")
    })
})