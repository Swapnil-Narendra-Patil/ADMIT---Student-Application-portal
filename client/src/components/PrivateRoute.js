import React from 'react'
import {connect} from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

//Allow only authenticated routes
const PrivateRoute = ({children, auth}) => {
  const authProp = auth;
  return authProp.isAuthenticated ? children : <Navigate to="/login"/>
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, null)(PrivateRoute)