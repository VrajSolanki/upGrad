// exposes the actions, thunk to the component.
// exposes the redux variables as props.
// can also expose ownProps which contains the ids defined in the routes.

import { connect } from 'react-redux';
import Choose from '../components/Choose';
import {navigateToRole, setUserType, navigateToChoose} from './ChooseModule';

const mapActionCreators = {
  navigateToRole, setUserType,navigateToChoose
};

const mapStateToProps = (state) => {

  return({
    
  })
};

export default connect(mapStateToProps, mapActionCreators)(Choose)
