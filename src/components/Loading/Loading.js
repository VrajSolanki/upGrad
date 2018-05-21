import React, { PropTypes } from 'react'
import classes from './Loading.scss'
import loadingsvg from './loading.svg'
const Loading = (props) => {
  return (
    <div className={classes.container}>
      <img className={classes.loadingImg} src={loadingsvg}/>
    </div>
  )
}

export default Loading
