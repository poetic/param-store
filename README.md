# Param Store

## API
```
import ParamStore from 'param-store'
import {connect} from 'param-store'

ParamStore.set({pathname: 'login'})
ParamStore.get() // get whole params object
ParamStore.get('pathname', 'tab') // return  {pathname: 'pathname', tab: 'tab'}
ParamStore.listen('pathname', 'tab', function(<params>){})

connect('pathname', 'tab’)(Login) // pathname and tab will be passed as props
```
