describe('객체 래퍼 타입 피하기', () => {
    it('string 메서드 호출 시 String 객체가 생성된다.', () => {
        const originalCharAt = String.prototype.charAt;
        String.prototype.charAt = function (pos) {
            console.log(this, typeof this, pos);
            return originalCharAt.call(this, pos);
        }
        const x = "hello";
        (x as any).language = 'English'

        expect("primitive".charAt(2))
        expect((x as any).language).toBeUndefined()
    })
})