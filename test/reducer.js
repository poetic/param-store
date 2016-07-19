import React from 'react'
import ParamStore, {reducer, actionTypeConstants} from '../src/index'

const expect = chai.expect

describe('reducer', function () {
  it('should return the value', function () {
    const action = {
      type: actionTypeConstants.PUSH_PARAM_STORE,
      value: 'new'
    }

    expect(reducer('old', action)).to.eql('new')
  })
})
