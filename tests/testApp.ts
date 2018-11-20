import { describe, it } from 'mocha'
import { assert } from 'chai'
// old school imports because of lack of typing
const render = require('mithril-node-render')
const mq = require('mithril-query')
require('mithril/test-utils/browserMock')(global)

import { initialState, deriveState, setters } from '../src/app'
import { page } from '../src/components'
import { Requests } from '../src/interfaces';

const fakeRequests: Requests = {
    fakeGetN: ()=>new Promise(
        (resolve, reject)=>setTimeout(()=>resolve({n: 100})))
}

describe('derive state', ()=>{
    it('doubles the counter', ()=>{
        const actual = deriveState(initialState)
        const expected = {
            counter: 1,
            counterTimesTwo: 2
        }
        assert.deepEqual(actual, expected)
    })
    it('allows testing actions with fake requests', async ()=>{
        const action = await setters.counter.setFromGet().async(fakeRequests)
        const actual = action.action(initialState)
        const expected = {
            counter: 100
        }
        assert.deepEqual(actual, expected)
    })
    it('renders server side', async ()=>{
        const derivedState = deriveState(initialState)
        const vNode = page(setters, derivedState)
        const html = await render(vNode)
        assert.equal(
            html,
            '<div class="page">' +
                '<h1>Hello World!</h1>' +
                '<button>Increment me! 1 (doubled: 2)</button>' +
                '<br>' +
                '<button>Get a whole new counter!</button>' +
            '</div>'
        )
    })
    it('allows querying the virtual DOM', ()=>{
        const derivedState = deriveState(initialState)
        const vNode = page(setters, derivedState)
        var output = mq({view: ()=>vNode})
        output.should.have('div > h1')
        output.should.have('h1:contains(World)')
        output.should.contain('Hello World')
    })
})