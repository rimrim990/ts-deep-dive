describe('잉여 속성 체크의 한계 인지하기', () => {
    it('객체 리터럴에 한해서만 잉여 속성 체크가 동작한다.', () => {
        interface Room {
            numDoors: number;
            ceilingHeightFt: number;
        }

        // 객체 리터럴
        const r: Room = {
            numDoors: 1,
            ceilingHeightFt: 10,
            // elphant: 'present'
        }

        expect(r.numDoors).toEqual(1)
        expect(r.ceilingHeightFt).toEqual(10)
    })
})