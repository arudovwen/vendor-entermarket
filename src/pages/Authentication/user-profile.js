import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import axios from "axios"

const UserProfile = props => {
  const dispatch = useDispatch()

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)
  const [image, setimage] = useState("")
  const [location, setlocation] = useState("")
  const [status, setstatus] = useState("")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      setname(obj.name)
      setidx(obj.id)
      setemail(obj.email)
      setlocation(obj.location)
      setimage(obj.image)
      setstatus(obj.status)

      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  function handleValidSubmit(event, values) {
    dispatch(editProfile(values))
  }
  function deactivate(value) {
    let confirm = window.confirm("Are you sure you want to do this?")
    const token = localStorage.getItem("user-token")

    if (confirm) {
      axios
        .post(
          `${process.env.REACT_APP_URL}/store/update`,
          { status: value },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(res => {
          setstatus(value)
        })
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{name ? name : "Profile"} | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="EnterMarket" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <Media>
                    <div className="">
                      <img
                        src={image}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <Media body className="align-self-center ms-4">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-1 text-capitalize">{location}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change Store Name</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <AvField
                    name="name"
                    label="Store Name"
                    value={name}
                    className="form-control"
                    placeholder="Enter new name"
                    type="text"
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="success">
                    Update Store Name
                  </Button>
                </div>
              </AvForm>

              <hr className="my-5" />
              <div className="text-left mt-4">
                {status ? (
                  <Button
                    type="button"
                    onClick={() => deactivate(false)}
                    color="danger"
                  >
                    Deactivate store
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => deactivate(true)}
                    color="success"
                  >
                    Activate store
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
