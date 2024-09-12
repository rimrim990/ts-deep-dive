describe('타입 추론에 문맥이 어떻게 사용되는지 이해하기', () => {
    it('타입스크립트는 타입을 추론할 때 값과 문맥을 함께 고려한다.', ( ) => {
        type Language = 'JavaScript' | 'TypeScript' | 'Python';
        function setLanguage(language: Language) {
            return language
        }

        let language = 'Python'
        expect(setLanguage(language as Language)).toEqual('Python');
        expect(setLanguage('JavaScript')).toEqual('JavaScript')
    })

    it('as const로 내부 값이 변하지 않음을 선언할 수 있다.', () => {
        function panTo(where: [number, number]) {
            return where[0] + where[1];
        }

        // readonly [10, 20] - 타입을 너무 과하게 정확히 추론
        const loc = [10, 20] as const
        expect(panTo(loc as [number, number])).toEqual(30);
    })
})