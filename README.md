# param-store

param store for react

[![Travis build status](http://img.shields.io/travis/poetic/param-store.svg?style=flat)](https://travis-ci.org/poetic/param-store)
[![Code Climate](https://codeclimate.com/github/poetic/param-store/badges/gpa.svg)](https://codeclimate.com/github/poetic/param-store)
[![Test Coverage](https://codeclimate.com/github/poetic/param-store/badges/coverage.svg)](https://codeclimate.com/github/poetic/param-store)
[![Dependency Status](https://david-dm.org/poetic/param-store.svg)](https://david-dm.org/poetic/param-store)
[![devDependency Status](https://david-dm.org/poetic/param-store/dev-status.svg)](https://david-dm.org/poetic/param-store#info=devDependencies)

## API
```
import ParamStore from 'param-store'
import {connect} from 'param-store'

ParamStore.set({pathname: 'login'})
ParamStore.get() // get whole params object
ParamStore.get('pathname', 'tab') // return  {pathname: 'pathname', tab: 'tab'}

const listener = ParamStore.listen('pathname', 'tab', function(report){
  const {changedParams, currentParams, previousParams} = report
})
ParamStore.unlisten(listener)

connect(Login, 'pathname', 'tab’) // pathname and tab will be passed as props
```
