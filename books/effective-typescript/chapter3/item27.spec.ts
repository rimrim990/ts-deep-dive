import _ from "lodash";


describe('함수형 기법과 라이브러리로 타입 흐름 유지하기', () => {
    it('타입을 유지하며 루프를 사용할 수 있다.', () => {
        interface BasketballPlayer {
            name: string;
            team: string;
            salary: number;
        }
        const allPlayers: BasketballPlayer[] = [
            {
                name: 'a',
                team: 'aa',
                salary: 1000
            },
            {
                name: 'b',
                team: 'bb',
                salary: 2000
            },
            {
                name: 'c',
                team: 'cc',
                salary: 500
            }
        ]

        // vanilla javascript - 명시적 타입 선언 필요
        const teamToPlayers: {[team: string]: BasketballPlayer[]} = {};
        for (const player of allPlayers) {
            const {team} = player;
            teamToPlayers[team] = teamToPlayers[team] || []
            teamToPlayers[team].push(player)
        }

        for (const players of Object.values(teamToPlayers)) {
            players.sort((a, b) => b.salary - a.salary);
        }

        const bestPaid = Object.values(teamToPlayers).map(players => players[0])
        bestPaid.sort((playerA, playerB) => playerB.salary - playerA.salary);
        console.log(bestPaid)

        // lodash
        const bestPaid_by_lodash = _(allPlayers)
            .groupBy(player => player.team)
            .mapValues(players => _.maxBy(players, p => p.salary))
            .values()
            .sortBy(p => -p.salary)
            .value()

        expect(bestPaid).toEqual(expect.arrayContaining(bestPaid_by_lodash))
    })
})