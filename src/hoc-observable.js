import { interval, map, mergeAll, of, mergeMap, concatMap, take, switchMap, exhaustMap } from "rxjs";

// const stream$ = interval(1000).pipe(mergeMap(val => (val)))

// stream$.subscribe(console.log)


// сделать пример с инпутом



// merge map прокисрует в дочерний поток все что ему возвращается
const stream$ = interval(2000).pipe(mergeMap(val => interval(1000)))
// stream$.subscribe(console.log)

// можно указать сколько максимум подписок мы забираем, второй аргумент в mergeMap, 
// то что эмитится, но не влезает попадет в очередь, и эмитится позже ??? нет! оно наинчает подписку позже
// в очередь попадают потоки, а не их значения

// mergeMap with concurrent = 1
// const streamConcat$ = interval(2000).pipe(concatMap(val => interval(1000)))
// streamConcat$.subscribe(console.log)


const streamTest$ = interval(1000).pipe(concatMap(parentVal =>
    interval(1000).pipe(map(childVal => ([parentVal, childVal])), take(6)))
)

// посмотреть mergeMap применимость

// streamTest$.subscribe(console.log)

// 0 1 0 1 0 1 - для поиска в беке по значению инпута например
const streamTest2$ = interval(4000).pipe(switchMap(val => interval(1000).pipe(take(2))))
// streamTest2$.subscribe(console.log)


const streamTest3$ = interval(1000).pipe(exhaustMap(parentVal =>
    interval(1000).pipe(map(childVal => ([parentVal, childVal])), take(6)))
)

streamTest3$.subscribe(console.log)