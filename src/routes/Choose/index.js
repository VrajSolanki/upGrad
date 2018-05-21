// index.js for a route performs the following tasks
//      creates a chunk,and defines it name, which is injected only when the route is hit in the browser.
//      injects the reducer for the route.
//      defines the root container, which renders the component to be rendered when the route is hit.
//      defines the child routes if any.

import { injectReducer } from 'store/reducers'

export default(store) => ({
  path: 'choose',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Choose = require('./containers/ChooseContainer').default
      const reducer = require('./containers/ChooseModule').default
      injectReducer(store, { key: 'choose', reducer })
    cb(null, Choose)
    }, 'choose')
  },
  childRoutes: []
});