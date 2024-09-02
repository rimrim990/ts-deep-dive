describe('타입 연산과 제네릭 사용으로 반복 줄이기', () => {
    it('매핑된 타입으로 중복된 타입 정의를 줄일 수 있다.', () => {
        interface State {
            userId: string;
            pageTitle: string;
            recentFiles: string[];
            pageContents: string;
        }
        // 매핑된 타입
        type TopNavState = {
            [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
        }

        const state: TopNavState = {
            userId: '123',
            pageTitle: 'title',
            recentFiles: ['file01']
        }

        expect(state.userId).toEqual('123')
    })

    it('keyof는 속성 타입의 유니온을 반환한다.', () => {
        type Options = {
            width: number;
            height: number;
        }
        type OptionsKeys = keyof Options;

        const key: OptionsKeys = 'width';

        expect(key).toEqual('width')
    })

    it('extends를 사용해 제네릭 매개변수가 특정 타입을 확장하도록 제한한다.', () => {
        interface Name {
            first: string;
            last: string;
        }
        type DancingDuo<T extends Name> = [T, T];

        const couple: DancingDuo<Name> = [
            {first: 'Fred', last: 'Astaire'},
            {first: 'Ginger', last: 'Rogers'}
        ]

        expect(couple.length).toEqual(2)
    })

    it('표준 라이브러리에서 제공하는 제네릭 타입을 활용하라.', () => {
        function func(a: number, b: number) {
            return a * b;
        }
        type Return = ReturnType<typeof func>

        const num: Return = 12

        expect(typeof num).toEqual("number")
    })
})