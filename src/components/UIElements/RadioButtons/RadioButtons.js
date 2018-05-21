import PropTypes from 'prop-types';
import React from 'react';
import classes from './RadioButton.scss';
import classNames from 'classnames';
import RadioButton from 'components/UIElements/RadioButton';
import PdfRadioButton from 'components/UIElements/PdfRadioButton';
import ViewInputField from 'components/UIElements/ViewInputField';
import {removeAsterisk} from 'services/removeAsterisk';
class RadioButtons extends React.Component {

  constructor(props){
    super(props);
    this.state = {error:""}
  }

  toggleRadioButtons= (value) => {
    let param = {};
    param[this.props.name] = value;
    this.props.toggleRadioButtons(param);
  };

  isValid = () => {
    if(this.props.value==null || this.props.value.trim()==""){
      this.setState({error:this.props.error});
      return 1;
    }
    else if(this.props.customValidation){
      let customError = this.props.customValidation(this.props.value);
      if(customError!=""){
          this.setState({error:customError});
          return 1
      }
      else{
          return 0
      }
    }
    else{
      this.setState({error:""});
      return 0;
    }
  };

  getOption = () => {
    let options = this.props.options;
    return (
      options.map((option, index) => {
          return (
              <div key={index} className={classes.option} onClick={this.props.disabled?null:() => this.toggleRadioButtons(option.value)} style={option.style}>
                  {this.props.type=='pdf'?
                  <PdfRadioButton label={option.label} isChecked={this.props.value == option.value} isDisabled={this.props.disabled}/>:
                  <RadioButton label={option.label} isChecked={this.props.value == option.value} isDisabled={this.props.disabled}/>}
              </div>
          )
      },this)
    )
  };

  render() {
    if(this.props.mode!='view'){
      return(
        <div className={classes.container}>
          <label className={classes.inputLabel}>{this.props.label}</label>
          <div className={classes.optionContainer}>
            {this.getOption()}
          </div>
          {this.props.disabled || this.state.error=='' ? null : <span className={classes.error} style={this.props.errorStyle}>{this.state.error}</span>}
        </div>
      )
    }
    else{
      let label = removeAsterisk(this.props.label);
      let filterObj = _.find(this.props.options,{'value':this.props.value})
      let value =_.get(filterObj,'label',"");
      return(
        <ViewInputField label={label} value={value}/>
      )
    }
  }

}

export default RadioButtons;

RadioButtons.defaultProps = {
  disabled:false,
  mode:'edit',
  errorStyle:{},
  type:'normal'
};

RadioButtons.propTypes = {
  disabled: PropTypes.bool,
  value:PropTypes.string,
  type:PropTypes.string,
  toggleRadioButtons:PropTypes.func,
  name: PropTypes.string,
  label:PropTypes.string,
  error:PropTypes.string,
  mode:PropTypes.string,
  errorStyle:PropTypes.object,
  customValidation:PropTypes.func
};
