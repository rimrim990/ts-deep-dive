describe('타입 공간과 값 공간의 심벌 구분하기', () => {
    it('심벌은 이름이 같더라도 속하는 공간에 따라 다른 것을 나타낼 수 있다.', () => {
        // 타입
        interface Cylinder {
            radius: number
            height: number;
        }

        // 이름이 같은 값
        const Cylinder = (radius: number, height: number) => ({radius, height})
    });

    it('class와 enum은 타입과 값 두 가지 모두 가능하다.', () => {
        class Cylinder {
            radius=1;
            height=1;
        }

        function calculateVolume(shape: unknown) {
            // 값으로서의 클래스 - 생성자 사용
            if (shape instanceof Cylinder) {
                return shape.radius
            }
        }

        expect(calculateVolume(new Cylinder())).toEqual(1)
        // 클래스는 자바스크립트에서 함수로 구현됨
        expect(typeof Cylinder).toEqual("function")
    })

    it('typeof 타입에서 쓰일 때와 값에서 쓰일 때의 기능이 다르다.', () => {
        const person = {
            age: 12,
            name: 'typescript'
        }
        // 타입에 쓰일 때는 값을 읽어 타입스크립트 타입 반환
        type P = typeof person;

        // 값에 쓰일 때는 자바스크립트 런타임 typeof 연산자로 동작 (string, number, symbol, boolean, undefined, object, function)
        expect(typeof person).toEqual("object")
    })
})