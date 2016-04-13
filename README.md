# param-store

param store for react

[![Travis build status](http://img.shields.io/travis/poetic/param-store.svg?style=flat)](https://travis-ci.org/poetic/param-store)
[![Dependency Status](https://david-dm.org/poetic/param-store.svg)](https://david-dm.org/poetic/param-store)
[![devDependency Status](https://david-dm.org/poetic/param-store/dev-status.svg)](https://david-dm.org/poetic/param-store#info=devDependencies)

## API
```
import ParamStore from 'param-store'
import {connect} from 'param-store'

ParamStore.set({path: 'login'})
ParamStore.get() // get whole params object
ParamStore.get('path', 'tab') // return  {path: 'path', tab: 'tab'}

const listener = ParamStore.listen('path', 'tab', function(report){
  const {changedParams, currentParams, previousParams} = report
})
ParamStore.unlisten(listener)

connect(Login, 'path', 'tab’) // path and tab will be passed as props
```

## DEVELOPMENT

- test
  ```
  npm run browser
  ```
