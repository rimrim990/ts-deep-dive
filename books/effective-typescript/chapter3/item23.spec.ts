describe('한꺼번에 객체 생성하기', () => {
    it('타입에 안전한 방식으로 조건부 속성을 추가한다.', () => {
        const hasMiddle = true;
        const firstLast = {first: 'Harry', last: 'Truman'};
        const president = {...firstLast, ...(hasMiddle) ? {middle: 'S'} : {}}

        expect(president.middle).toEqual('S')
    })

    it('헬퍼 함수로 선택적 필드를 추가한다.', () => {
        function addOptional<T extends object, U extends object>(
            a: T, b: U | null
        ): T & Partial<U> {
            return {...a, ...b}
        }

        const getDate = (hasDate: boolean) => hasDate ? {start: -2589, end: -2566} : null
        const pharaoh = addOptional({name: 'pharaoh'}, getDate(true))

        expect(pharaoh.start).toEqual(-2589)
        expect(pharaoh.end).toEqual(-2566)
    })
})