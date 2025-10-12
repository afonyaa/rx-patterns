const { Observable, zip, map } = rxjs;

const mouseDown$ = new Observable((subscriber) => {
    const onMouseDown = (event) => subscriber.next(event)
    document.addEventListener('mousedown', onMouseDown)

    return () => {
        document.removeEventListener('mousedown', onMouseDown)
    }
})


const onMouseUp$ = new Observable((subscriber) => {
    const onMouseUp = (event) => subscriber.next(event)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
        document.removeEventListener('mouseup', onMouseUp)
    }
})


const swipe$ = zip(mouseDown$, onMouseUp$).pipe(map((e) => (e[0].clientX - e[1].clientX))).subscribe({
    next: (val) => console.log('here', val)
})



const swipeCustom$ = (onMouseDown$, onMouseUp$) => new Observable((subscriber) => {
    let start
    const mouseUpSub = onMouseDown$.subscribe({
        next: (data) => {
            start = data.clientX
        }
    })
    const mouseDownSub = onMouseUp$.subscribe({
        next: (data) => {
            const end = data.clientX
            subscriber.next({ start, end })
            start = 0
        }
    })

    return () => {
        mouseDownSub.unsubscribe()
        mouseUpSub.unsubscribe()
    }
})



// swipeCustom$(mouseDown$, onMouseUp$).subscribe({
//     next: (swipeDiff) => console.log(swipeDiff)
// })