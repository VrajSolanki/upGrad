import React from 'react'
import classNames from 'classnames'
import blacklist from 'blacklist'
import style from './Button.scss'

const BUTTON_SIZES = ['lg', 'md','sm', 'xs'];

const BUTTON_TYPES = [
  'primary-light',
  'primary-dark',
  'secondary-light',
  'secondary-dark',
  'circle',
];

// function isTrivialHref(href) {
//   return !href || href.trim() === '#';
// }

module.exports = React.createClass({
  displayName: 'Button',
  propTypes: {
    className: React.PropTypes.string,
    component: React.PropTypes.element,
    href: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    size: React.PropTypes.oneOf(BUTTON_SIZES),
    onClick: React.PropTypes.func,
    type: React.PropTypes.oneOf(BUTTON_TYPES),
    submit:React.PropTypes.bool
  },
  getDefaultProps () {
    return {
      type: 'primary-light',
      size: 'md',
      isActive: true
    };
  },
  handleClick(event) {

    let { isActive, href, onClick } = this.props;
    if(isActive == undefined){
      isActive = true;
    }
    // //
    // console.log(isTrivialHref(href));
    // if (!isActive || isTrivialHref(href)) {
    //   event.preventDefault();
    // }

    if (!isActive) {
      event.stopPropagation();
      return;
    }

    if(onClick) {
      onClick(event);
    }
  },
  render () {
    // classes
    let buttonTypeClass = "";
    if(this.props.type == "circle"){
      buttonTypeClass = "Button--circle-" + this.props.size;
    } else {
      buttonTypeClass = 'Button--' + this.props.type;

    }
    //console.log("styles");
    //console.log(style);
    var componentClass = classNames(
      style.Button,
      style[buttonTypeClass],
      (this.props.type != 'circle' ? style['Button--' + this.props.size] : null),
      (this.props.isActive ? null : style['Button--' + this.props.type + '-disabled']),
      (this.props.href ? style['a--' + this.props.size] : null),
      this.props.className
    );
    //console.log("class");

     //console.log(componentClass);

    // props
    var props = blacklist(this.props, 'isActive', 'type', 'size', 'component', 'className', 'submit','href','onClick');

    //console.log(props);
    props.className = componentClass;

    if (this.props.component) {
      return React.cloneElement(this.props.component, props);
    }

    var tag = 'button';
    props.type = this.props.submit ? 'submit' : 'button';

    if (props.href) {
      tag = 'a';
      delete props.type;
    }
    // console.log(tag,props,this.props.children);
    //  return React.createElement(tag, props, this.props.children);
    const CustomTag = `${tag}`;

    return (<CustomTag {...props} onClick={this.handleClick}>{this.props.children}</CustomTag >);
  },
});
