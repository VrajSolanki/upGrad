import { injectReducer } from "store/reducers";

export default store => ({
  path: ":questionId/edit",
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const EditQuestion = require("./containers/EditQuestionContainer")
          .default;
        const addQuestionReducer = require("../AddQuestion/containers/AddQuestionModule").default;
        injectReducer(store, { key: "addQuestion", reducer: addQuestionReducer });

        cb(null, EditQuestion);
      },
      "editQuestion"
    );
  }
});
