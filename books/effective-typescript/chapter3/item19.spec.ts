describe('추론 가능한 타입을 사용해 장황한 코드 방지하기', () => {
    it('함수 내에서 생성된 지역 변수는 타입 추론이 가능하므로, 타입 구문을 넣지 않아도 된다.', () => {
        // 기본 값이 있는 경우 함수 파라미터 타입도 추론됨
        function parseNumber(str: string, base = 10) {
            const num = Number(str)
            return num
        }

        expect(parseNumber("12")).toEqual(12)
    })

    it('객체 리터럴에 타입을 정의하여 사용되는 곳이 아닌 선언한 곳에서 에러를 캐치한다.', () => {
        interface Product {
            name: string;
            id: string;
            price: number;
        }

        const product = {
            name: 'error',
            id: 123,
            price: 123
        }

        function order(p: Product) { return true; }

        // 객체를 사용하는 곳에서 에러 발생
        // Argument type {price: number, name: string, id: number} is not assignable to parameter type Product
        expect(order((product) as any)).toBeTruthy()
    })
})