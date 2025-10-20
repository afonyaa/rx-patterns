const { takeUntil, fromEvent, debounceTime, pipe, switchMap, timer, map, tap, filter } = rxjs;

const searchInputEl = document.getElementById('searchInput')
const searchResultEl = document.getElementById('searchResult')

const getApiResult$ = (str) => {
    return timer(2000).pipe(map(_ => `result: ${str}`))
}

function liveSearch$(input) {
    let prevValue = ''
    let shouldSkipApi = false
    return fromEvent(input, 'input')
        .pipe(
            debounceTime(400),
            tap((ev) => {
                shouldSkipApi = false
                if (prevValue === ev.target.value) {
                    shouldSkipApi = true
                }
                prevValue = ev.target.value
            }),
            filter(() => !shouldSkipApi),
            switchMap((ev) => getApiResult$(ev.target.value))
        )

}

liveSearch$(searchInputEl).subscribe((ev) => {
    console.log(ev)
})







