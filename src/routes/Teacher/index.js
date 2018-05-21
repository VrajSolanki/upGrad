// injects the add, edit question routes to the teacher details parent.
// both the add and edit components use same module and component to update and access data, and have their own containers to expose methods.
// based on the props from the container actions methods are used i.e edit or create.

import { injectReducer } from "store/reducers";
import CreateRoute from "./routes/AddQuestion";
import EditRoute from "./routes/EditQuestion"

export default store => ({
  path: "teacher",
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const Teacher = require("./containers/TeacherContainer").default;
        const reducer = require("./containers/TeacherModule").default;
        injectReducer(store, { key: "teacher", reducer });

        const student = require("../Student/containers/StudentContainer")
          .default;
        const studentReducer = require("../Student/containers/StudentModule")
          .default;
        injectReducer(store, { key: "student", reducer: studentReducer });

        cb(null, Teacher);
      },
      "teacher"
    );
  },
  childRoutes: [
    CreateRoute(store),
    EditRoute(store)
  ]
});
