import { injectReducer } from 'store/reducers'
import StudentDetails from './routes/StudentDetails'

export default(store) => ({
  path: 'student',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Student = require('./containers/StudentContainer').default
      const reducer = require('./containers/StudentModule').default
      injectReducer(store, { key: 'student', reducer })

      const teacher = require('../Teacher/containers/TeacherContainer').default
      const teacherReducer = require('../Teacher/containers/TeacherModule').default
      injectReducer(store, { key: 'teacher', reducer:teacherReducer })

    cb(null, Student)
    }, 'student')
  },
  childRoutes: [
    StudentDetails(store)
  ]
});