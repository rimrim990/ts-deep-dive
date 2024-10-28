describe('Promise', () => {
    it('A promise executor is executed immediately.', async () => {
        const start = new Date()

        const promise = await new Promise((resolve, reject) => {
            // this promise will be resolved as soon as it is executed
            resolve(new Date())
        })

        const end = new Date()

        expect(promise.getTime() - start.getTime()).toBeLessThanOrEqual(500)
        expect(promise.getTime() - end.getTime()).toBeGreaterThanOrEqual(0)
    })

    it('If `catch` successfully handle the error, then next closest `then` handler will be executed.', async () => {
        const result = await new Promise(resolve => resolve(5))
            .then(() => new Error('Error!'))
            .catch(err => alert(err))
            .then(() => 5)

        expect(result).toEqual(5)
    })

    it('An asynchronous error is not handled', () => {
        new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('error!!')), 100)
            }).catch(err => console.log(err))


        setTimeout(() => { console.log('after 1000ms')}, 1000)
    })

    it('Promise.all takes an iterable and returns a new promise.', async () => {
        const start = new Date()

        await Promise.all([
            new Promise(resolve => setTimeout(() => resolve(1), 3000)),
            new Promise(resolve => setTimeout(() => resolve(1), 2000)),
            new Promise(resolve => setTimeout(() => resolve(1), 1000))
        ])

        const end = new Date()

        expect(end.getTime() - start.getTime()).toBeLessThanOrEqual(6000)
    })
})