import { injectReducer } from 'store/reducers'

export default(store) => ({
    path: 'questiondetails/:qid',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
        const container = require('./containers/QuestionDetailsContainer').default
        const module = require('./containers/QuestionDetailsModule');
        const reducer = module.default
        const key =  module.NAME
        injectReducer(store, { key, reducer })
        cb(null, container)
        }, 'questionDetails')
    }
});