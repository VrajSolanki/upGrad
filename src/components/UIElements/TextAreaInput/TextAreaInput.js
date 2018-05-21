import PropTypes from 'prop-types';
import React from 'react';
import classes from './TextAreaInput.scss'
import Textarea from 'react-textarea-autosize';
import classNames from 'classnames';
import ViewInputField from 'components/UIElements/ViewInputField';

class TextAreaInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:"",
      keysDown:{}
    }
  }
  editTextField = (e) => {
    let param = {};
    param[e.target.name]=e.target.value;
    this.props.editTextField(param);
    if(this.state.error!=""){
      this.setState({error:""});
      //this.props.errorResolve();
    }
  };

  handleKeyDown = (event) => {
    let kd = this.state.keysDown;
    kd[event.keyCode] = true;
    this.setState({keysDown:kd})

    if(kd[16] && kd[13]){
      event.preventDefault();
      let param = {};
      let comment = `${event.target.value}\r`;
      param[event.target.name]= comment;
      this.props.editTextField(param);
    } else if (event.key == 'Enter') {
      event.preventDefault();
      let comment = event.target.value;
      if(!!comment || this.props.allowEmptyEnter){
        this.props.onEnterPress();
      }
    }
  }

  handleKeyUp = (e) => {
    let kd = this.state.keysDown;
    kd[e.keyCode] = false;
    this.setState({keysDown:kd})
  }

  handleBlur = (e) => {
    if(this.props.onBlur != undefined) {
      this.props.onBlur(e.target.value);
    }
  }

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

  render() {
    let inputText = classNames(
      {[classes.inputText]:true},
      {[classes.inputTextDisable]:this.props.disabled}
    )

    if(this.props.mode!='view'){
      let inputText = classNames(
        {[classes.inputText]:true},
        {[classes.inputTextDisable]:this.props.disabled},
        {[classes.errorBorder]:this.state.error!=""}
      )

      if(this.props.onEnterPress != undefined){
        return(
          <div className={classes.container}>
            <label className={classes.inputLabel}>{this.props.label}</label>
            <Textarea
              disabled={this.props.disabled}
              maxRows={this.props.maxRows}
              minRows={this.props.minRows}
              className={inputText}
              type="text"
              value={this.props.value}
              onChange={(e)=>this.editTextField(e)}
              onKeyDown={(e)=>this.handleKeyDown(e)}
              onKeyUp={(e)=>this.handleKeyUp(e)}
              onBlur={(e) => this.handleBlur(e)}
              style={this.props.textAreaStyles}
              name={this.props.name}
              inputRef={this.props.inputRef}
              placeholder={this.props.placeholder}/>
            {this.props.disabled || this.state.error==''? null : <span className={classes.error}>{this.state.error}</span>}
          </div>
        )
      } else {
        return(
          <div className={classes.container}>
            <label className={classes.inputLabel}>{this.props.label}</label>
            <Textarea
              disabled={this.props.disabled}
              maxRows={this.props.maxRows}
              minRows={this.props.minRows}
              className={inputText}
              style={this.props.textAreaStyles}
              type="text"
              value={this.props.value}
              onChange={(e)=>this.editTextField(e)}
              name={this.props.name}
              onBlur={(e) => this.handleBlur(e)}
              inputRef={this.props.inputRef}
              placeholder={this.props.placeholder}/>
            {this.props.disabled || this.state.error==''? null : <span className={classes.error} style={this.props.errorStyle}>{this.state.error}</span>}
          </div>
        )
      }
      
    } else {
      let label = this.props.label;
      let value = this.props.value;
      if(value==''){
        value = `No ${this.props.label} Text`;
      }
      return(
        <ViewInputField label={label} value={value} textAreaStyles={this.props.textAreaStyles}/>
      ) 
    } 
  }

}

TextAreaInput.defaultProps = {
  mode:'edit',
  textAreaStyles:{},
  errorStyle:{},
  disabled:false,
  minRows:3,
  allowEmptyEnter:false
};

TextAreaInput.propTypes = {
  disabled: PropTypes.bool,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  value:PropTypes.string,
  editTextField:PropTypes.func,
  name: PropTypes.string,
  placeholder:PropTypes.string,
  label:PropTypes.string,
  error:PropTypes.string,
  mode:PropTypes.string,
  textAreaStyles:PropTypes.object,
  errorStyle:PropTypes.object,
  onEnterPress:PropTypes.func,
  onBlur:PropTypes.func,
  allowEmptyEnter:PropTypes.bool,
  inputRef:PropTypes.func
  };

export default TextAreaInput;
