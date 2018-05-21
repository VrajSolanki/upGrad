import React  from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip';
import classes from './LinkWithTooltip.scss';
import 'rc-tooltip/assets/bootstrap.css';

class LinkWithTooltip extends React.Component {
    constructor(props){
      super(props)
      this.state={
        showTooltip:false
      }
    }
    onMouseLeave=()=>{
      this.setState({
        showTooltip:false
      })
    }
    onMouseEnter=()=>{
      this.setState({
        showTooltip:true
      })
    }

    render() {
      let tooltip = this.state.showTooltip ? <div id={this.props.id}>{this.props.tooltip}</div> : <div></div>
      return (
          <Tooltip 
            placement={this.props.placement} 
            trigger={['hover']}
            overlay={tooltip}
            onMouseLeave={this.onMouseLeave} 
            onMouseEnter={this.onMouseEnter}
            mouseEnterDelay={0.2}
            mouseLeaveDelay={0.2}
            visible={this.state.showTooltip}
          >
            <a style={this.props.linkStyles} href={this.props.href}>{this.props.children}</a>
          </Tooltip>
        
      );
    }
}

LinkWithTooltip.PropTypes = {
  tooltip:PropTypes.String,
  href:PropTypes.String,
  children:PropTypes.Element,
  id:PropTypes.String,
  placement:PropTypes.String
}

LinkWithTooltip.defaultProps = {
  tooltip:'Tooltip',
  href:'#',
  placement:'top'
}

export default LinkWithTooltip