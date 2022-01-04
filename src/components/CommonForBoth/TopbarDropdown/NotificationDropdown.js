import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import axios from 'axios';
import * as moment from "moment";

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../../assets/images/users/avatar-4.jpg"

//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [notifications, setnotifications] = useState([])
    const [unreadnotifications, setunreadnotifications] = useState(null)
  function getNotifications() {
    const token = localStorage.getItem("admin-token")

    axios
      .get(`${process.env.REACT_APP_URL}/admin/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setnotifications(res.data)
          var unread = res.data.filter(item=> !item.read_at).length
          setunreadnotifications(unread)
        }
      })
  }
    function markasread(id) {
      const token = localStorage.getItem("admin-token")

      axios
        .get(`${process.env.REACT_APP_URL}/admin/notifications/${id}/mark`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            getNotifications()
          }
        })
    }
    const handleValidDate = date => {
      const date1 = moment(new Date(date)).format("DD MMM Y")
      return date1
    }

  React.useEffect(() => {
    getNotifications()
    return () => {
      setnotifications([])
    }
  }, [])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon "
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
         {
           unreadnotifications?
            <span className="badge bg-danger rounded-pill">{unreadnotifications}</span>:''
         }
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
              {/* <div className="col-auto">
                <a href="#!" className="small">
                  {" "}
                  View All
                </a>
              </div> */}
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {notifications.map(item => (
              <div
                key={item.id}
                onClick={()=>markasread(item.id)}
                className="text-reset notification-item"
              >
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      <i className="bx bx-cart" />
                    </span>
                  </div>
                  <div className="media-body">
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{props.t(item.data.message) + "."}</p>
                      <p className="mb-0">
                        <i className="mdi mdi-clock-outline" />
                        {props.t(handleValidDate(item.created_at))}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            {/* <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link> */}
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
