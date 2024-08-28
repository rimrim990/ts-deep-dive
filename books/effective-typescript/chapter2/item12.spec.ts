describe('함수 표현식에 타입 적용하기', () => {
    it('함수 표현식 (expression)을 사용하여 매개변수와 반환값을 타입으로 선언할 수 있다.', () => {
        type DiceRollFn = (sides: number) => number;

        // function statement
        function rollDice1(sides: number): number { return 5; }
        // function expression
        const rollDice2: DiceRollFn = (sides) => 5

        expect(rollDice1(1)).toEqual(5)
        expect(rollDice2(1)).toEqual(5)
    })
})