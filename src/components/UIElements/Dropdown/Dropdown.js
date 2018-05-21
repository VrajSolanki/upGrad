import React from 'react'
import style from './Dropdown.scss'
import classNames from 'classnames'

const FIELD_SIZES = ['lg', 'md','sm', 'xs'];

var Dropdown = module.exports = React.createClass({
  getInitialState: function() {
    let selectedItem = {};
    if(typeof this.props.selected !== "undefined"){
      selectedItem = this.props.selected;
    } else if(typeof this.props.selectedMsg !== "undefined"){
      selectedItem = {
        label:this.props.selectedMsg,
        value:""
      }
    } else {
      selectedItem = {
        label:"Select an Option",
        value:""
      }
    }

    return {
      listVisible: false,
      selectedItem:selectedItem
    };
  },

  propTypes: {
    size: React.PropTypes.oneOf(FIELD_SIZES),
    className: React.PropTypes.string,

    selected: React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string,
      disabled: React.PropTypes.bool,
    }),
    selectedMsg:React.PropTypes.string,
    isActive: React.PropTypes.bool,
    requiredMessage: React.PropTypes.string,
    label:React.PropTypes.string,
    onClick: React.PropTypes.func,
    id:React.PropTypes.string,
    options: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string,
      })
    ).isRequired
  },
  getDefaultProps() {
    return {
      size: 'md',
      isActive:true
    };
  },

  select: function(event) {
    let { onClick} = this.props;

    let selectedOption = {
      label:event.target.innerHTML,
      value:event.target.id
    }

    if (onClick) {
      onClick(selectedOption,event);
    }


    this.setState({ selectedItem: selectedOption });

  },

  show: function() {
    let { isActive } = this.props;
    if(isActive == undefined){
      isActive = true;
    }


    if (!isActive) {
      event.stopPropagation();
    } else {
      this.setState({ listVisible: true });
      document.addEventListener("click", this.hide);
      // console.log(this.state);
    }

  },

  hide: function() {
    this.setState({ listVisible: false });
    document.removeEventListener("click", this.hide);
  },

  render: function() {
    let containerClass = classNames(
      style["dropdown-container" + (this.state.listVisible ? "--show" : "")],
      style["dropdown-container-" + (this.props.size)],
    );

    let displayClass = classNames(
      style["dropdown-display" + (this.state.listVisible ? "--clicked": "")],
      style["dropdown-display-" + (this.props.size)],
      (this.props.isActive ? null : style['dropdown-display-disabled']),
      this.props.className
    );

    let labelSizeClass = 'label--' + this.props.size;

    let componentLabelClass = classNames(
      style[labelSizeClass],
      (this.props.isActive ? null : style['label-inactive']),
    );

    return <div className={containerClass}>
      {typeof this.props.label !== "undefined" &&
        <label className={componentLabelClass} htmlFor={this.props.id} >{this.props.label}</label>
      }

      <div className={displayClass} onClick={this.show}>
        <span>{this.state.selectedItem.label}</span>
          <svg className={style.svgClass} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M2.8,4.9c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7l5.5,5.5c0.2,0.2,0.5,0.2,0.7,0c0,0,0,0,0,0l5.5-5.5c0.2-0.2,0.2-0.5,0-0.7
            s-0.5-0.2-0.7,0L8,10L2.8,4.9z"/>
          </svg>
      </div>
      <div className={style["dropdown-list"]}>
        <div>
          {this.renderListItems()}
        </div>
      </div>
      {typeof this.props.requiredMessage !== "undefined" &&
      <p>
         {this.props.requiredMessage}
      </p>
      }
    </div>;
  },

  renderListItems: function() {
    var items = [];
    for (var i = 0; i < this.props.options.length; i++) {
      var item = this.props.options[i];
      items.push(
        <div key={'options' + i} onClick={this.select}>
         <span id={item.value}>{item.label}</span>
        </div>
      );
    }
    return items;
  }
});
