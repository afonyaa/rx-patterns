const { Observable, zip, map, exhaustMap, fromEvent, tap, of, takeUntil } = rxjs;

const box = document.querySelector('.box')


function dragStartElement$(element) {
    return new Observable(sub => {
        const mouseDownHandler = (evt) => {
            sub.next({
                offsetX: evt.offsetX,
                offsetY: evt.offsetY,
            })
        }
        element.addEventListener('mousedown', mouseDownHandler)

        return () => {
            element.removeEventListener('mousedown', mouseDownHandler)
        }
    })
}

function dragProcessElement$(offsets) {
    return new Observable(sub => {
        const mouseUp$ = fromEvent(document, 'mouseup')
        const mouseMoveHandler = (evt) => {
            sub.next( // переписать на fromEvent
                {
                    x: evt.clientX - offsets.offsetX,
                    y: evt.clientY - offsets.offsetY
                }
            )
        }
        const mouseUpHandler = () => {
            sub.complete()
        }
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    })
}

function dragElement$(element) {
    return new Observable(sub => {
        const mouseUp$ = fromEvent(document, 'mouseup')
        const mouseDown$ = fromEvent(element, 'mousedown')
        const mouseMove$ = fromEvent(document, 'mousemove')

        mouseDown$.pipe(
            tap(evt => evt.preventDefault()),
            map(evt => ({
                offsetX: evt.offsetX,
                offsetY: evt.offsetY,
            })),
            exhaustMap((offsets) => mouseMove$
                .pipe(
                    tap(moveEvt => moveEvt.preventDefault()),
                    map(moveEvt => ({
                        x: moveEvt.clientX - offsets.offsetX,
                        y: moveEvt.clientY - offsets.offsetY
                    })),
                )),
            takeUntil(mouseUp$)
        ).subscribe(({
            x,
            y
        }) => {
            sub.next({
                x,
                y
            })
        })


    })
}

dragElement$(box).subscribe(res => {
    box.style.left = `${res.x}px`
    box.style.top = `${res.y}px`
})