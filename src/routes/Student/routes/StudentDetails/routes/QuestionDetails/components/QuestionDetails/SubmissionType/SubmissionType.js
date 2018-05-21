// renders the submission screen for a Submission type question, and just displays the instructions

import React from 'react'
import classes from './SubmissionType.scss'

const SubmissionType = (props) => {

    function updateTextField(params){
        console.log(params);
    }

    const {instructions} = props;
    return (
        <div>
            <div className={classes.titleAndValue}>
                <div className={classes.instructions}>Instructions</div>
                <div className={classes.value}>{instructions ? instructions : "No Instructions"}</div>
            </div>
        </div>
        

    )
    
}
export default SubmissionType