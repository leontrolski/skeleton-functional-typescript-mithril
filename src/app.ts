import * as m from 'mithril'

import { page } from './components'
import { State, DerivedState, Setters, Action, Requests } from './interfaces'
import { setter, bindSetters } from './shared'

//   _______________
// _| Initial State |______________________________________________

export const initialState: State = {
    counter: 1,
}

//   ______________
// _| Derive State |_______________________________________________

export function deriveState(s: State): DerivedState {
    return {
        counter: s.counter,
        counterTimesTwo: s.counter * 2,
    }
}

//   ___________
// _| Set State |___________________________________________________

export const setters: Setters = {
    counter: {
        inc: ()=>setter.produce((s)=>{
            s.counter += 1
        }),
        set: (n)=>setter.produce((s)=>{
            s.counter = n
        }),
        setFromGet: ()=>setter.async(async (r)=>{
            const {n} = await r.fakeGetN()
            return setters.counter.set(n)
        }),
    }
}

//   ___________________
// _| Network Functions |____________________________________________

const requests: Requests = {
    fakeGetN: ()=>new Promise(
        (resolve, reject)=>setTimeout(()=>resolve({n: 10})))
}

//   ____________
// _| Initialise |___________________________________________________

export function init(){
    let state = initialState
    function set(f: Action){
        state = f.action(state)
    }
    const boundSetters = bindSetters(
        setters,
        requests,
        set,
        ()=>m.redraw()
    )
    m.mount(
        document.getElementById('root'),
        {view: ()=>page(boundSetters, deriveState(state))}
    )
}
