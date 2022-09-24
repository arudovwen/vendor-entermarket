import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logo from "../../assets/images/logo.png"
import logoLightPng from "../../assets/images/logo.png"
import logoLightSvg from "../../assets/images/logo.png"
import logoDark from "../../assets/images/logo-dark.png"

const Sidebar = props => {
  const admintoken =   localStorage.getItem("admin-token")

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box bg-white py-2">
          <Link
            to={admintoken ? "/admin" : "/dashboard"}
            className="logo logo-dark"
          >
            <span className="logo-sm">
              <img src={logo} alt="" width="120" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" width="120" />
            </span>
          </Link>

          <Link
            to={admintoken ? "/admin" : "/dashboard"}
            className="logo logo-light"
          >
            <span className="logo-sm">
              <img src={logoLightSvg} alt="" width="120" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" width="120" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
