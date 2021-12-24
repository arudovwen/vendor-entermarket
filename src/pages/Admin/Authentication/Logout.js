import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"


//redux
import { useSelector, useDispatch } from "react-redux"
import { adminlogoutUser } from '../../../store/auth/login/actions';

const Logout = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(adminlogoutUser(props.history))
  }, [dispatch])

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Logout)
