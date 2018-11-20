import { produce } from 'immer'

import { Action, AsyncAction, State, Setters, Requests } from './interfaces'

//   _________________
// _| Generic Helpers |_________________________________________________________

export const setter = {
    produce: function(f: (s: State)=>void): Action {
        return {action: produce<State>(f)}
    },
    async: function(f: (rs: Requests)=>Promise<Action>): AsyncAction {
        return {async: f}
    },
}

export function bindSetters(
    setters: Setters,
    requests: Requests,
    set: (f: Action)=>void,
    redraw: ()=>void,
): Setters {
    const boundSetters: {[k: string]: any} = {}

    for(let k in setters){
        let v = (setters as any)[k]

        // if nested object, recurse
        if(typeof(v) === 'object'){
            boundSetters[k] = bindSetters(v, requests, set, redraw)
            continue
        }

        boundSetters[k] = (...args: any[])=>{
            const action = v(...args)
            if(action.async) action.async(requests).then(set).then(redraw)
            if(action.action) set(action)
        }
    }

    return boundSetters as any as Setters
}



