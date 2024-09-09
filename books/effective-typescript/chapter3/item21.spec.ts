describe('타입 넓히기', () => {
    it('변수 초기화시 타입이 명시되지 않으면, 타입 체커는 상수 값으로부터 타입을 넓혀 추론한다.', () => {
        interface Vector3 {
            x: number;
            y: number;
            z: number;
        }

        function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z') {
            return vector[axis];
        }

        let x = 'x';
        let vec = {x: 10, y: 20, z: 30};

        // Argument type string is not assignable to parameter type "x" | "y" | "z"
        // getComponent(vec, x)

        expect(getComponent(vec, x as 'x')).toEqual(10)
    })
})