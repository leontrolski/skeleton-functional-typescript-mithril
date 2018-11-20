import * as m from 'mithril'
import { Setters, DerivedState, CounterSetters } from './interfaces'

export const incButton = (counterSetters: CounterSetters, d: DerivedState)=>m(
    'button',
    {onclick: counterSetters.inc},
    `Increment me! ${d.counter} (doubled: ${d.counterTimesTwo})`,
)
export const getButton = (counterSetters: CounterSetters, d: DerivedState)=>m(
    'button',
    {onclick: ()=>counterSetters.setFromGet()},
    `Get a whole new counter!`,
)
export const page = (setters: Setters, d: DerivedState)=>m('.page',
    m('h1', 'Hello World!'),
    incButton(setters.counter, d),
    m('br'),
    getButton(setters.counter, d),
)