import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {checkUserAuth} from 'routes/Login/containers/LoginModule'
import Loading from 'components/Loading'
let componentMap = {}
export default function(ComposedComponent,componentName,requiredRole,unsuccessfulAction=null){
  let compIdString = componentName + requiredRole;
  if(componentMap[compIdString]){return componentMap[compIdString]}

  class Authenticate extends React.Component {
    checkAuthentication = (props) => {
      const that = this
      if(!this.isAuthenticated()){
        console.log('Not Authenticated .. Checking for stored JWT');
        props.checkUserAuth(requiredRole).then( (status) => {
          if(status === 'UnAuth') {
            console.log('Redirect to Login');
            this.context.router.push('/');
          }
        })
      }
      else{
        console.log('Authenticated');
      }
    }
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    isAuthenticated = () =>{
      return this.props.isAuthenticated && (this.props.roles.includes(requiredRole))
    }
    render () {
      const Comp = this.isAuthenticated()?<ComposedComponent {...this.props}/>:<Loading/>
      return (Comp)
    }
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.login.userLoggedIn,
      userType: state.login.lastLoginUserType,
      roles: state.login.roles
    }
  }

  componentMap[compIdString] = connect(mapStateToProps,{checkUserAuth})(Authenticate)
  return componentMap[compIdString]
}
