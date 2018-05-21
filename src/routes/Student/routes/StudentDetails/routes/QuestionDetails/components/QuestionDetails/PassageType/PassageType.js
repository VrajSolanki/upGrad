// renders the submission screen for a Passage type question.
// records students submission and saves in the redux. 
import React from 'react'
import classes from './PassageType.scss'
import TextAreaInput from 'components/UIElements/TextAreaInput'

const PassageType = (props) => {

    const {instructions, updatePassageAnswer, passageAnswer} = props;
    return (
        <div>
            <div className={classes.titleAndValue}>
                <div className={classes.instructions}>Instructions</div>
                <div className={classes.value}>{instructions ? instructions : "No Instructions"}</div>
            </div>

            <div className={classes.textAreaContainer}>
                <TextAreaInput
                    editTextField={updatePassageAnswer}
                    label={`Your answer`}
                    name="passageAnswer"
                    placeholder="Type your Answer here..."
                    value={passageAnswer}
                />
            </div>
        </div>
        

    )
    
}
export default PassageType