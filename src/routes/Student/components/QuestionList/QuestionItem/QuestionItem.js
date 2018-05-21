// renders a question item assigned to the student.
// it is a pure component, so it is rendered only when the props change, even if the parent QuestionList rerenders due to some props.

import React, { PureComponent } from 'react'
import classes from './QuestionItem.scss'
import CheckboxOn from 'components/SvgImages/CheckboxOn'
import CheckboxOff from 'components/SvgImages/CheckboxOff'
import UIButton from 'components/UIElements/UIButton'

export default class QuestionItem extends PureComponent {


  render() {
    let {question, index, navigateToQuestionDetails, studentId} = this.props;
    return (
      <div className={classes.wrapper} onClick={() => {navigateToQuestionDetails(studentId, question.id)}}>
        <div className={classes.container}>
         
          <div className={classes.questionListHeader}>
            
            <div className={classes.content}>
              <div className={classes.srNoandNo}>
                <div className={classes.srNo}>Sr.No</div>
                <div className={classes.number}>{index+1}</div>
              </div>
              
              <div className={classes.titleSubtitle}>
                <div className={classes.title}>{question.questionTitle}</div>
                <div className={classes.subtitle}>{question.questionDescription}</div>
              </div>
              
              <div className={classes.questextAndType}>
                <div className={classes.typeText}>QUESTION TYPE</div>
                <div className={classes.type}>{question.type}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
