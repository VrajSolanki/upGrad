import { injectReducer } from "store/reducers";

export default store => ({
  path: "create",
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const AddQuestion = require("./containers/AddQuestionContainer")
          .default;
        const reducer = require("./containers/AddQuestionModule").default;
        injectReducer(store, { key: "addQuestion", reducer });
        cb(null, AddQuestion);
      },
      "addQuestion"
    );
  }
});
