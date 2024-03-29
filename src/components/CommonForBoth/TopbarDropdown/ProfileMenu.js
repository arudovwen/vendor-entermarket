import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")
  const [image, setimage] = useState("")
  const [location, setlocation] = useState("")
  const [email, setemail] = useState("")
  const adminuser = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      setusername(obj.name)
      setemail(obj.email)
      setlocation(obj.location)
      setimage(obj.image)
    }
    if (localStorage.getItem("authAdmin")) {
      const obj = JSON.parse(localStorage.getItem("authAdmin"))

      setusername(obj.name)
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          {image ? (
            <img
              className="rounded-circle header-profile-user"
              src={image}
              alt="Header Avatar"
            />
          ) : (
            ""
          )}
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {adminuser ? (
            <>
              <DropdownItem tag="a" href="/profile">
                {" "}
                <i className="bx bx-user font-size-16 align-middle me-1" />
                {props.t("Profile")}{" "}
              </DropdownItem>

              {/* <DropdownItem tag="a" href="auth-lock-screen">
                <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                {props.t("Lock screen")}
              </DropdownItem> */}
            </>
          ) : (
            ""
          )}
          <div className="dropdown-divider" />
          {adminuser ? (
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{props.t("Logout")}</span>
            </Link>
          ) : (
            <Link to="/admin/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              <span>{props.t("Logout")}</span>
            </Link>
          )}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
