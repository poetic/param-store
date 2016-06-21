# param-store
param-store manage the url. What's special about it is it treats url as
independent params which can be set and get.

[![Travis build status](http://img.shields.io/travis/poetic/param-store.svg?style=flat)](https://travis-ci.org/poetic/param-store)
[![npm](https://img.shields.io/npm/v/param-store.svg)](https://npmjs.org/package/param-store)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://david-dm.org/poetic/param-store.svg)](https://david-dm.org/poetic/param-store)
[![devDependency Status](https://david-dm.org/poetic/param-store/dev-status.svg)](https://david-dm.org/poetic/param-store#info=devDependencies)

## API

### ParamStore
```
import ParamStore from 'param-store'

// path is a special param in the sense that it is the path in the url
// instead of in the query part.
// Otherwise it is the same as other query params.

// SETTER
// `set` MERGE the new params with the previous params in the url
ParamStore.set({path: 'login'}) // change path
Paramstore.set({userId: 'f38adfn'}) // change userId
Paramstore.set({path: 'user', userId: 'f38adfn'}) // change path and userId
// `setAll` RESETS the whole url and ignore the previous url
Paramstore.setAll({path: 'login'}) // overwrite current params

// GETTER
ParamStore.get('path') // get 'path' from params
ParamStore.getAll() // get whole params object

// LISTENNER
const listener = ParamStore.listen('path', 'tab', function(report){
  const {changedParams, currentParams, previousParams} = report
})
ParamStore.unlisten(listener)

```

### connect
```
import {connect} from 'param-store'

connect(Login, 'path', 'tab’) // path and tab will be passed as props
```

### Link
```
// Link use `setAll` under the hood
import {Link} from 'param-store'

<Link type='button' params={{path: 'about'}}>this is an anchor tag</Link>
```

## DEVELOPMENT

- test
  ```
  npm run browser
  ```

- build:
  NOTE: before buiding, remove node_modules/history
