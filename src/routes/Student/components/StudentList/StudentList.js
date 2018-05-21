// Renders the student list and uses the student Item component.

import PropTypes from 'prop-types';
import React from 'react';
import classes from './StudentList.scss'
import StudentListItem from './StudentListItem'

class StudentList extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }


  headerElements = () => {
    return(
      <div className={classes.listHeader}>
          <div className={classes.emptyCell} />
          <div className={classes.imageCell} />
          <div className={classes.nameCell}>{`STUDENTS`}</div>
      </div>
    )
  };

  render(){
  let rowComponent = null;
  let students = this.props.studentList; 
  const {studentId, showDialogueBox} = this.state;
  rowComponent = students.map((obj,key)=><StudentListItem navigateToDetails = {this.props.navigateToDetails} listItem={obj} key={obj.value} index={key} />)
 
    return(
        <div className={classes.container}>
         
              <div className={classes.containerList}>
                  {this.headerElements()}
                  {rowComponent}
                  {
                    students.length==0?
                   <div className={classes.noTeacherContainer}>
                      {`There is no student in the list.`}
                   </div>:null
                  }
              </div>
        </div>
    )
  }
}

export default StudentList;
