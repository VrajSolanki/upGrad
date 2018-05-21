// index.js for a route performs the following tasks
//      creates a chunk,and defines it name, which is injected only when the route is hit in the browser.
//      injects the reducer for the route.
//      defines the root container, which renders the component to be rendered when the route is hit.
//      defines the child routes if any.

import { injectReducer } from 'store/reducers'
import QuestionDetails from './routes/QuestionDetails'

export default(store) => ({
    path: ':id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
        const container = require('./containers/StudentDetailsContainer').default
        const module = require('./containers/StudentDetailsModule');
        const reducer = module.default
        const key =  module.NAME
        injectReducer(store, { key, reducer })
        cb(null, container)
        }, 'studentDetails')
    },
    childRoutes: [
        QuestionDetails(store)
      ]
});