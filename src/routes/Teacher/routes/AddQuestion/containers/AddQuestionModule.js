import request from "superagent";
import { NEW_SERVER_URL } from "store/static";
import { push } from "react-router-redux";
import update from "immutability-helper";
import {_getQuestionsLS, _setQuestionsLS, getQuestionsfromLS} from '../../../containers/TeacherModule'
import {generateRandomId} from 'services/generateRandomId'

// ------------------------------------
// Constants
// ------------------------------------
export const NAME = "addQuestion";
export const UPDATE_TEXT_FIELD = "UPDATE_TEXT_FIELD" + " " + NAME;
export const UPDATE_QUESTION_TYPE = "UPDATE_QUESTION_TYPE" + " " + NAME;
export const UPDATE_MCQ_ANSWER = "UPDATE_MCQ_ANSWER" + " " + NAME;
export const UPDATE_ANSWERS = "UPDATE_ANSWERS" + " " + NAME;
export const CLEAR_STATE = "CLEAR_STATE" + " " + NAME;
export const INITIALIZE_STATE_FOR_EDIT = "INITIALIZE_STATE_FOR_EDIT" + " " + NAME;

export const updateTextField = data => {
  return { type: UPDATE_TEXT_FIELD, payload: data };
};

export const clearState = data => {
  return { type: CLEAR_STATE, payload: data };
};

export const initializeStateForEdit = data => {
  return { type: INITIALIZE_STATE_FOR_EDIT, payload: data };
};

export const updateQuestionType = data => {
  return { type: UPDATE_QUESTION_TYPE, payload: data };
};

export const updateMCQAnswers = data => {
  return { type: UPDATE_MCQ_ANSWER, payload: data };
};

export const updateAnswers = data => {
  return { type: UPDATE_ANSWERS, payload: data };
};

export const cancelQuestion = () => {
  return (dispatch, getState) => {
    dispatch(clearState());
    dispatch(getQuestionsfromLS());
    dispatch(push(`/teacher`));
  };
};

export const createQuestion = () => {
  return (dispatch, getState) => {
    let questions = _getQuestionsLS();
    let question = _.cloneDeep(getState().addQuestion.questionObject);
    question.id = generateRandomId();
    question.type = getState().addQuestion.questionType;
    questions.push(question);
    _setQuestionsLS(questions);
    dispatch(clearState());
    dispatch(getQuestionsfromLS());
    dispatch(push(`/teacher`));
  };
};

export const editQuestion = () => {
  return (dispatch, getState) => {
    let questions = _getQuestionsLS();
    let question = _.cloneDeep(getState().addQuestion.questionObject);
    const id = question.id;
    const index = _.findIndex(questions, {id: id});
    questions.splice(index, 1);

    question.type = getState().addQuestion.questionType;
    questions.push(question);
    _setQuestionsLS(questions);
    dispatch(clearState());
    dispatch(getQuestionsfromLS());
    dispatch(push(`/teacher`));
  };
};

export const getQuestionInfo = (questionId) => {
  return (dispatch, getState) => {
    let questions = _getQuestionsLS();
    let question = _.find(questions, {id: questionId});
    const {questionTitle, questionDescription, answerOptions, correctAnswer, id, idealAnswer, instructions, type} = question;

    let initialStateObj = {
      questionObject: {
        questionTitle,
        questionDescription,
        answerOptions,
        correctAnswer,
        id,
        idealAnswer,
        instructions,
      },
      questionType: type
    }
    dispatch(initializeStateForEdit(initialStateObj));
  };
};


const REDUCER_HANDLERS = {
  
  [CLEAR_STATE]: (state, action) => {
    return update(state, { $set: initialState });
  },

  [INITIALIZE_STATE_FOR_EDIT]: (state, action) => {
    const questionObject = action.payload.questionObject;
    const questionType = action.payload.questionType;
    return update(state, {questionObject: {$set: questionObject}, questionType: {$set: questionType}});
  },

  [UPDATE_TEXT_FIELD]: (state, action) => {
    let params = action.payload;
    Object.keys(params).map((key, index) => {
      state = update(state, {
        questionObject: { [key]: { $set: params[key] } }
      });
    });
    return state;
  },
  [UPDATE_QUESTION_TYPE]: (state, action) => {
    return update(state, { questionType: { $set: action.payload } });
  },
  [UPDATE_MCQ_ANSWER]: (state, action) => {
    let params = action.payload;
    Object.keys(params).map((key, index) => {
      state = update(state, {
        questionObject: { answerOptions: { [key]: { $set: params[key] } } }
      });
    });
    return state;
  },
  [UPDATE_ANSWERS]: (state, action) => {
    let params = action.payload;
    let value = params.value;
    let opt = params.opt;
    let index = params.index;
    if (value) {
      state = update(state, {
        questionObject: { correctAnswer: { $push: [opt] } }
      });
    } else {
      state = update(state, {
        questionObject: { correctAnswer: { $splice: [[index, 1]] } }
      });
    }
    return state;
  }
};

const initialState = {
  questionObject: {
    questionTitle: "",
    questionDescription: "",
    answerOptions: {
      option1: "",
      option2: "",
      option3: "",
      option4: ""
    },
    correctAnswer: [],
    idealAnswer: "",
    instructions: ""
  },
  questionType: "mcq"
};

export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
