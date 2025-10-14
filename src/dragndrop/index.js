const { Observable, zip, map, exhaustMap, tap, of, takeUntil, fromEvent, timer } = rxjs;

// import { fromEvent, Observable } from "rxjs"

const box = document.querySelector('.box')
const timer$ = timer(2000);

const dragStart = (el) => {
    return fromEvent(el, 'mousedown')
        .pipe(map(ev => (
            { clientX: ev.clientX, clientY: ev.clientY }
        )))
}

const dragProcess = () => {
    return fromEvent(document, 'mousemove')
}

const dragEnd = () => {
    return fromEvent(document, 'mouseup')
}

const $dragElement = (el) => {
    return dragStart(el).pipe(
        exhaustMap((dragStartEvt) => {
            const startX = el.offsetLeft;
            const startY = el.offsetTop;
            const startMouseX = dragStartEvt.clientX;
            const startMouseY = dragStartEvt.clientY;

            return dragProcess().pipe(
                map((moveEvt) => {
                    const deltaX = moveEvt.clientX - startMouseX;
                    const deltaY = moveEvt.clientY - startMouseY;
                    return {
                        x: startX + deltaX,
                        y: startY + deltaY
                    };
                }),
                takeUntil(dragEnd()) // работает сколько угодно раз
            )
        }),
    )
}

// const $dragElement = (el) => {
//     return dragStart(el).pipe(
//         exhaustMap((dragStartEvt) => {
//             return dragProcess()
//         }),
//         takeUntil(dragEnd()) // работает один раз
//     )
// }

$dragElement(box).subscribe({
    next(pos) {
        box.style.left = `${pos.x}px`
        box.style.top = `${pos.y}px`
    }
})
