describe('타입 좁히기', () => {
    it('조건문에서 타입을 좁힐 수 있다.', () => {
        const el = document.getElementById('foo');
        if (el) {
            // HTMLElement
            el.innerHTML = `<blink>Party Time</blink>`
        } else {
            // null
            expect(el).toBeNull()
        }
    })

    it('instanceof 를 사용해 타입을 좁힐 수 있다.', () => {
        function contains(text: string, search: string | RegExp) {
            if (search instanceof RegExp) {
                // RegExp
                return !!search.exec(text)
            }

            // string
            return text.includes(search);
        }

        expect(contains('hello', 'hell')).toBeTruthy();
        expect(contains('hello', /hell/)).toBeTruthy();
    })

    it('속성 체크로 타입을 좁힐 수 있다.', () => {
        interface A {
            a: number
        }

        interface B {
            b: number
        }

        function pickAB(ab: A | B) {
            if ('a' in ab) return ab.a // A
            return ab.b; // B
        }

        expect(pickAB({a: 10})).toEqual(10)
    })

    it('태그된 유니온으로 타입을 좁힐 수 있다.', () => {
        interface UploadEvent {
            type: 'upload',
            filename: string;
            contents: string
        }

        interface DownloadEvent {
            type: 'download',
            filename: string;
        }

        type AppEvent = UploadEvent | DownloadEvent

        function handleEvent(e: AppEvent) {
            switch (e.type) {
                case 'download':
                    e // UploadEvent
                    break;

                case 'upload':
                    e // DownloadEvent
                    break;
            }
        }
    })

    it ('사용자 정의 타입 가드로 타입을 좁힐 수 있다.', () => {
        function isInputElement(el: HTMLElement): el is HTMLInputElement {
            return 'value' in el;
        }

        function getElementContent(el: HTMLElement) {
            if (isInputElement(el)) {
                el; // HTMPInputElement
                return el.value;
            }
            el; // HTMLElement
            return el.textContent;
        }
    })
})