// Renders the student list item.
// uses the Profile Avatar component which renders the profile image of the user if provided, else renders the name initials.
// on click on the student item, navigates to the next route which is the student details which shows the list of questions assigned to the student.

import PropTypes from 'prop-types';
import React from 'react';
import classes from './StudentListItem.scss'
import ProfileAvtar from 'components/UIElements/ProfileAvtar';
import classNames from 'classnames';

class StudentListItem extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        showDropdown: false,
    }
}

  render() {
    const {showDropdown} = this.state;
    const {navigateToDetails, index, listItem} = this.props;
    const {label, value } = listItem;
    const name = `${label}`;

    return(
      <div className={classes.row} onClick={() => navigateToDetails(value)}>
           <div className ={classes.emptyCell}/>
           <div className ={classes.profileCell}>
             <ProfileAvtar index={index} profileImage={null} size ={classes.profileImage.width} name={name}/>
          </div>
          <div className={classes.nameCell}>
             {name}
           </div>
      </div>
    )
  }
}

export default StudentListItem;
