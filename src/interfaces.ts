export type Action = {
    action: (s: State)=>State
}
export type AsyncAction = {
    async: (r: Requests)=>Promise<Action>
}

export type State = {
    counter: number
}

export type DerivedState = {
    counter: number
    counterTimesTwo: number
}

export type CounterSetters = {
    inc: ()=>Action
    set: (n: number)=>Action
    setFromGet: ()=>AsyncAction
}
export type Setters = {
    counter: CounterSetters
}

export type Requests = {
    fakeGetN: ()=>Promise<{n: number}>
}
