// creates one question item with title, description based on the props assigned.
// allows the user to edit, delete existing question.

import React, { PureComponent } from 'react'
import classes from './QuestionItem.scss'
import CheckboxOn from 'components/SvgImages/CheckboxOn'
import CheckboxOff from 'components/SvgImages/CheckboxOff'
import UIButton from 'components/UIElements/UIButton'
import _ from 'lodash';
import DeleteSvg from 'components/SvgImages/DeleteSvg'
import EditSvg from 'components/SvgImages/EditSvg'
export default class QuestionItem extends PureComponent {

  toggleSelection = () => {
    let dataObj = {};
    
    if(this.props.isSelected){
      dataObj.operation = "remove";
      dataObj.value = this.props.question.id;
    }
    else{
      dataObj.operation = "add";
      dataObj.value = this.props.question.id;
    }
    this.props.updateSelectedQuestions(dataObj);
  }

  render() {
    let {question, index, selectedQuestions, updateSelectedQuestions, isSelected, deleteQuestion, navigateToEditQuestion, deleteQuestionReduxAndLS} = this.props;
    
    return (
      <div className={classes.wrapper}>
        <div className={classes.container}>
         
          <div className={classes.questionListHeader}>
            <div className={classes.checkbox} onClick={this.toggleSelection}>{isSelected ? <CheckboxOn /> : <CheckboxOff />}</div>
          
            <div className={classes.content}>
              <div className={classes.srNoandNo}>
                <div className={classes.srNo}>Sr.No</div>
                <div className={classes.number}>{index +1}</div>
              </div>
              
              <div className={classes.titleSubtitle}>
                <div className={classes.title}>{question.questionTitle}</div>
                <div className={classes.subtitle}>{question.questionDescription}</div>
              </div>
              
              <div className={classes.questextAndType}>
                <div className={classes.typeText}>QUESTION TYPE</div>
                <div className={classes.type}>{question.type}</div>
              </div>
              
              <div className={classes.actions}>
                <div className={classes.icon} onClick={() => {deleteQuestionReduxAndLS(question.id)}}><DeleteSvg /></div>
                <div className={classes.editIcon} onClick={() => {navigateToEditQuestion(question.id)}}><EditSvg /></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
