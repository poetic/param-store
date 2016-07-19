import React from 'react'
import ParamStore, {emitToRedux} from '../src/index'

const expect = chai.expect

describe('emitToRedux', function () {
  beforeEach(function () {
    ParamStore.setAll()
  })

  afterEach(function () {
    ParamStore.setAll()
  })

  it('should dispatch action', function (done) {
    const store = {
      dispatch: (action) => {
        ParamStore.unlisten(listener)
        expect(action).to.have.all.keys(['type', 'value'])
        done()
      },
    }

    const listener = emitToRedux(store)

    ParamStore.setAll({paramA: 'paramA'})
  })
})
