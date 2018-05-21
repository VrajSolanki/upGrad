// on click on a create a new question in the Teacher route, this component is rendered which helps the teacher
//  select from a list of options the question type to create a quesion.

// based on the type of selection the body is updated and exposes components acc to the type to take user inputs.
// it currently renders question types: passage, mcq or submission. 


import React, { Component } from "react";
import classes from "./AddQuestion.scss";
import InputTextField from "./InputTextField";
import UIButton from "components/UIElements/UIButton";
export default class AddQuestion extends Component {

  componentWillMount = () => {
    if(this.props.mode == 'edit'){
      this.props.getQuestionInfo(this.props.questionId);
    }
  }
  
  componentWillUnmount = () => {
    // this.props.clearState();
  }

  selectQuestionType = e => {
    this.props.updateQuestionType(e.target.value);
  };

  selectCorrectAnswer = e => {
    let sendObj;
    if (e.target.checked) {
      sendObj = {
        value: e.target.checked,
        opt: e.target.value
      };
    } else {
      const index = this.props.questionObject.correctAnswer.indexOf(
        e.target.value
      );
      sendObj = {
        value: e.target.checked,
        opt: e.target.value,
        index
      };
    }
    this.props.updateAnswers(sendObj);
  };

  createQuestion = () => {
    if(this.props.mode == 'edit') this.props.editQuestion();
    else this.props.createQuestion();
  };

  render() {
    const {
      questionTitle,
      questionDescription,
      answerOptions,
      idealAnswer,
      instructions
    } = this.props.questionObject;
    
    return (
      <div className={classes.container}>
        <div className={classes.centerContainer}>
          <div className={classes.title}>Question Builder</div>

          <div className={classes.questionType}>
            <label className={classes.typeTitle}>
              What type of question you want to create ?
            </label>

            <div className={classes.questionTypeOptions}>
              <div
                className={classes.questionSelect}
                onChange={e => {
                  this.selectQuestionType(e);
                }}
              >
                <div className={classes.radioOptionsQues}>
                  <input type="radio" value="mcq" name="quesType" checked={this.props.questionType == 'mcq'}/>
                  <span>Multiple choice question</span>
                </div>
                <div className={classes.radioOptionsQues}>
                  <input type="radio" value="sub" name="quesType" checked={this.props.questionType == 'sub'} />
                  <span>Submission type question</span>
                </div>
                <div className={classes.radioOptionsQues}>
                  <input type="radio" value="passage" name="quesType" checked={this.props.questionType == 'passage'}/>
                  <span>Passage(text) type question</span>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.questionDetails}>
            <div className={classes.inputField}>
              <InputTextField
                updateTextField={this.props.updateTextField}
                label="Question Title :"
                name="questionTitle"
                placeholder="Type your question here..."
                value={questionTitle}
              />
            </div>
          </div>

          <div className={classes.questionDetails}>
            <div className={classes.inputField}>
              <InputTextField
                updateTextField={this.props.updateTextField}
                label="Question Description :"
                name="questionDescription"
                placeholder="Type your question description here..."
                value={questionDescription}
              />
            </div>
          </div>

          {this.props.questionType == "mcq" ? (
            <div className={classes.answerOptions}>
              <label className={classes.answerLabel}>Answer Options :</label>
              <div className={classes.answerSelect}>
                <div className={classes.radioOptions}>
                  <input
                    type="checkbox"
                    value={"option1"}
                    name="user"
                    onChange={e => {
                      this.selectCorrectAnswer(e);
                    }}
                  />
                  <div className={classes.optionInputField}>
                    <InputTextField
                      updateTextField={this.props.updateMCQAnswers}
                      name="option1"
                      placeholder="Option 1"
                      value={answerOptions["option1"]}
                    />
                  </div>
                </div>
                <div className={classes.radioOptions}>
                  <input type="checkbox" value={"option2"} name="user" onChange={e => {this.selectCorrectAnswer(e)}}/>
                  <div className={classes.optionInputField}>
                    <InputTextField
                      updateTextField={this.props.updateMCQAnswers}
                      name="option2"
                      placeholder="Option 2"
                      value={answerOptions["option2"]}
                    />
                  </div>
                </div>
                <div className={classes.radioOptions}>
                  <input
                    type="checkbox"
                    value={"option3"}
                    name="user"
                    onChange={e => {
                      this.selectCorrectAnswer(e);
                    }}
                  />
                  <div className={classes.optionInputField}>
                    <InputTextField
                      updateTextField={this.props.updateMCQAnswers}
                      name="option3"
                      placeholder="Option 3"
                      value={answerOptions["option3"]}
                    />
                  </div>
                </div>
                <div className={classes.radioOptions}>
                  <input
                    type="checkbox"
                    value={"option4"}
                    name="user"
                    onChange={e => {
                      this.selectCorrectAnswer(e);
                    }}
                  />
                  <div className={classes.optionInputField}>
                    <InputTextField
                      updateTextField={this.props.updateMCQAnswers}
                      name="option4"
                      placeholder="Option 4"
                      value={answerOptions["option4"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.props.questionType == "passage" ? (
            <div className={classes.answerOptions}>
              <div className={classes.inputField}>
                <InputTextField
                  updateTextField={this.props.updateTextField}
                  label="Ideal Answer :"
                  name="idealAnswer"
                  placeholder="Type your answer here..."
                  value={idealAnswer}
                />
              </div>
            </div>
          ) : null}

          <div className={classes.instructions}>
            <div className={classes.inputField}>
              <InputTextField
                updateTextField={this.props.updateTextField}
                label="Instructions :"
                name="instructions"
                placeholder="Type your answer here..."
                value={instructions}
              />
            </div>
          </div>
        </div>
        <div className={classes.footerComponent}>
          <span>
            {" "}
            Click Author to create a new question and it will be added to question list
          </span>
          <div className={classes.footerButtons}>
            <UIButton type="hollow" className={classes.cancelButton} onClick={this.props.cancelQuestion}>Cancel</UIButton>
            <UIButton color={`blue`} className={classes.createButton} onClick={this.createQuestion}>Author</UIButton>
          </div>
        </div>
      </div>
    );
  }
}
