// defines various props, actions, methods, thunks to be used by teacher component.
// most important methods/thunks are: 
    // deleteQuestionReduxAndLS: helps to delete a question from redux and LS -> can be used to call api for backend.
    // deleteQuestionToStudentMappings deletes the student: question mapping on deletion of a question and save to LS.
    // populateSelectedStudents: on selecting questions and clicking on assign opens the student list with pre-filled values
    //                           of the students already assigned the questions.
    // getQuestionsfromLS: get questions from LS -> can use API to get questions from backend.
    // saveStudentsToLS: save a pre-filled list of students to the LS, called on the App start. can be replaced by api to fetch students.
    // getStudentsfromLS: get students from LS.
    // saveStudentQuestionMap (backend task): whenever a new question and students to assign the question are selected, it creates a map {qid:x, sid: y} in the LS.
    //                                        this mapping helps fetch the questions assigned to student, in the student page.
    // _get*, _.set* : local methods to get and set LS.
    // additionally contains various pure actions needed to save data during various operations.


import request from "superagent";
import { NEW_SERVER_URL } from "store/static";
import { push } from "react-router-redux";
import update from "immutability-helper";
import { removeFromArrayByAttr } from "services/removeFromArrayByAttr";
// ------------------------------------
// Constants
// ------------------------------------
export const NAME = "teacher";

export const UPDATE_SELECTED_QUESTIONS =
  "UPDATE_SELECTED_QUESTIONS" + " " + NAME;
export const TOGGLE_ALL_STUDENTS_SELECTION =
  "TOGGLE_ALL_STUDENTS_SELECTION" + " " + NAME;
export const TOGGLE_STATUS = "TOGGLE_STATUS" + " " + NAME;
export const SAVE_QUESTIONS_FROM_LS = "SAVE_QUESTIONS_FROM_LS" + " " + NAME;
export const SAVE_STUDENTS_FROM_LS = "SAVE_STUDENTS_FROM_LS" + " " + NAME;
export const CLEAR_SELECTED_STUDENTS = "CLEAR_SELECTED_STUDENTS" + " " + NAME;
export const CLEAR_SELECTED_QUESTIONS = "CLEAR_SELECTED_QUESTIONS" + " " + NAME;
export const DELETE_QUESTION = "DELETE_QUESTION" + " " + NAME;
export const TOGGLE_ALL_QUESTION_SELECTION =
  "TOGGLE_ALL_QUESTION_SELECTION" + " " + NAME;
//PURE ACTIONS

export const updateSelectedQuestions = data => {
  return { type: UPDATE_SELECTED_QUESTIONS, payload: data };
};

export const toggleAllStudentSelections = data => {
  return { type: TOGGLE_ALL_STUDENTS_SELECTION, payload: data };
};

export const toggleAllQuestionSelections = data => {
  return { type: TOGGLE_ALL_QUESTION_SELECTION, payload: data };
};

export const toggleStatus = data => {
  return { type: TOGGLE_STATUS, payload: data };
};

export const saveQuestionsFromLS = data => {
  return { type: SAVE_QUESTIONS_FROM_LS, payload: data };
};

export const saveStudentsFromLS = data => {
  return { type: SAVE_STUDENTS_FROM_LS, payload: data };
};

export const deleteQuestion = data => {
  return { type: DELETE_QUESTION, payload: data };
};

export const clearSelectedStudents = () => {
  return { type: CLEAR_SELECTED_STUDENTS };
};

export const clearSelectedQuestions = () => {
  return { type: CLEAR_SELECTED_QUESTIONS };
};

export const gotoCreateQuestion = () => {
  return (dispatch, getState) => {
    dispatch(push("/teacher/create"));
  };
};

export const navigateToChoose = () => {
  return (dispatch, getState) => {
    dispatch(push(`/choose`));
  }
};

export const navigateToEditQuestion = (id) => {
  return (dispatch, getState) => {
    dispatch(push(`/teacher/${id}/edit`));
  }
};

export const deleteQuestionReduxAndLS = id => {
  return (dispatch, getState) => {
    let questions = getState().teacher.questions;
    const index = _.findIndex(questions, { id });
    dispatch(deleteQuestion(index));
    questions = getState().teacher.questions;
    dispatch(deleteQuestionToStudentMappings(id));
    _setQuestionsLS(questions);
  };
};

export const deleteQuestionToStudentMappings = id => {
  return (dispatch, getState) => {
    let mappings = _getQuestionsToStudentMappingsLS();
    const newMappings = removeFromArrayByAttr(mappings, "qId", id);
    _setQuestionsToStudentMappingsLS(newMappings);
  };
};

export const saveQuestionsToLS = () => {
  return (dispatch, getState) => {
    let questions = [
      {
        id: "1",
        title: "Sample Question 1",
        discription: "Sample Description",
        type: "Passage"
      },
      {
        id: "2",
        title: "Sample Question 2",
        discription: "Sample Description",
        type: "Passage"
      },
      {
        id: "3",
        title: "Sample Question 3",
        discription: "Sample Description",
        type: "Passage"
      }
    ];
    _setQuestionsLS(questions);
    // _setQuestionsLS(getState().teacher.questions)
  };
};

export const populateSelectedStudents = () => {
  return (dispatch, getState) => {
    const currentMapping = _getQuestionsToStudentMappingsLS();
    const selectedQuestions = getState().teacher.selectedQuestions;
    const selectedStudents = getState().teacher.selectedStudents;

    _.map(selectedQuestions, selectedQuestion => {
      let selectedStudents = _.map(currentMapping, mappingItem => {
        if (
          mappingItem.qId == selectedQuestion &&
          !_.includes(selectedStudents, mappingItem.sId)
        ) {
          const data = {
            value: true,
            opt: mappingItem.sId
          };
          dispatch(toggleStatus(data));
        }
      });
    });
  };
};

export const getQuestionsfromLS = () => {
  return (dispatch, getState) => {
    let questions = _getQuestionsLS();
    dispatch(saveQuestionsFromLS(questions));
  };
};

export const saveStudentsToLS = () => {
  return (dispatch, getState) => {
    _setStudentListLS();
  };
};

export const getStudentsfromLS = () => {
  return (dispatch, getState) => {
    let students = _getStudentListLS();
    dispatch(saveStudentsFromLS(students));
  };
};

export const saveStudentQuestionMap = () => {
  return (dispatch, getState) => {
    const selectedStudents = getState().teacher.selectedStudents;
    const currentMapping = _getQuestionsToStudentMappingsLS();
    const selectedQuestions = getState().teacher.selectedQuestions;
    let newMapping = _.cloneDeep(currentMapping);

    _.map(selectedQuestions, selectedQuestion => {
      let assignedStudents = _.filter(newMapping, { qId: selectedQuestion });

      _.map(assignedStudents, assignedStudent => {
        if (_.includes(selectedStudents, assignedStudent.sId))
          console.log("added entry");
        else {
          let index = _.findIndex(newMapping, {
            qId: selectedQuestion,
            sId: assignedStudent.sId
          });
          newMapping.splice(index, 1);
        }
      });

      _.map(selectedStudents, selectedStudent => {
        if (
          _.findIndex(newMapping, {
            sId: selectedStudent,
            qId: selectedQuestion
          }) >= 0
        )
          console.log("already added");
        else newMapping.push({ sId: selectedStudent, qId: selectedQuestion });
        // newMapping = Object.assign({}, newMapping, {sId: selectedStudent, qId: selectedQuestion})
      });
    });
    _setQuestionsToStudentMappingsLS(newMapping);
    dispatch(clearSelectedStudents());
    dispatch(clearSelectedQuestions());
  };
};

export const _getStudentListLS = () => {
  return localStorage.studentList ? JSON.parse(localStorage.studentList) : null;
};

export const _setStudentListLS = () => {
  const studentList = [
    { label: "Student 1", value: "1" },
    { label: "Student 2", value: "2" },
    { label: "Student 3", value: "3" },
    { label: "Student 4", value: "4" },
    { label: "Student 5", value: "5" }
  ];
  localStorage.studentList = JSON.stringify(studentList);
};

export const _getQuestionsLS = () => {
  return localStorage.questions ? JSON.parse(localStorage.questions) : [];
};

export const _setQuestionsLS = questions => {
  localStorage.questions = JSON.stringify(questions);
};

export const _getQuestionsToStudentMappingsLS = () => {
  return localStorage.mappings ? JSON.parse(localStorage.mappings) : [];
};

export const _setQuestionsToStudentMappingsLS = mappings => {
  localStorage.mappings = JSON.stringify(mappings);
};

const REDUCER_HANDLERS = {
  [SAVE_QUESTIONS_FROM_LS]: (state, action) => {
    return Object.assign({}, state, { questions: action.payload });
  },

  [SAVE_STUDENTS_FROM_LS]: (state, action) => {
    const studentList = action.payload;
    return update(state, { studentList: { $set: studentList } });
  },

  [CLEAR_SELECTED_STUDENTS]: (state, action) => {
    return update(state, { selectedStudents: { $set: [] } });
  },

  [CLEAR_SELECTED_QUESTIONS]: (state, action) => {
    return update(state, { selectedQuestions: { $set: [] } });
  },

  [DELETE_QUESTION]: (state, action) => {
    const index = action.payload;
    return update(state, { questions: { $splice: [[index, 1]] } });
  },

  [TOGGLE_ALL_STUDENTS_SELECTION]: (state, action) => {
    if (action.payload) {
      const allStudentIds = state.studentList.map(value => value.value);
      return update(state, { selectedStudents: { $set: allStudentIds } });
    } else return update(state, { selectedStudents: { $set: [] } });
  },

  [TOGGLE_ALL_QUESTION_SELECTION]: (state, action) => {
    if (action.payload) {
      const allQuestionIds = state.questions.map(question => question.id);
      return update(state, { selectedQuestions: { $set: allQuestionIds } });
    } else return update(state, { selectedQuestions: { $set: [] } });
  },

  [UPDATE_SELECTED_QUESTIONS]: (state, action) => {
    let payload = action.payload;
    if (payload.operation == "remove") {
      const index = payload.index;
      return update(state, { selectedQuestions: { $splice: [[index, 1]] } });
    } else if (
      payload.operation == "add" &&
      !_.includes(state.selectedQuestions, payload.value)
    ) {
      const value = payload.value;
      return update(state, { selectedQuestions: { $push: [value] } });
    }
  },
  [TOGGLE_STATUS]: (state, action) => {
    let params = action.payload;
    let value = params.value;
    let opt = params.opt;
    let index = params.index;
    if (value) {
      state = update(state, { selectedStudents: { $push: [opt] } });
    } else {
      state = update(state, { selectedStudents: { $splice: [[index, 1]] } });
    }
    return state;
  }
};

const initialState = {
  selectedQuestions: [],
  selectedStudents: [],
  studentList: [],
  questions: [],
  // allQuestionsSelected: []
};

export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
