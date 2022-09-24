import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"
import toastr from 'toastr'
import "toastr/build/toastr.min.css"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.png"
const Login = props => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("user-token")
  const [hidePassword, setHidePassword] = React.useState(false)
  React.useEffect(() => {

    if (token ) {

     window.location.href = "/dashboard"
    }
  }, [token])
   const { loading } = useSelector(state => ({
     loading: state.Login.loading,
   }))
  const { error } = useSelector(state => ({
    error: state.Login.error,
  }))

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
 if(values.password.length < 6){
   toastr.error('Password must be more 6 or more!')
   return;
 }
     dispatch(loginUser(values, props.history))
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | EnterMarket Vendor</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <img
                          className="text-primary mb-2"
                          src={logo}
                          height="40"
                        />
                        <p>Sign in to your Dashboard.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2 mt-4">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3 tw-relative">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type={hidePassword?'password':'text'}
                          required
                          placeholder="Enter Password"
                          className="tw-flex-1 tw-w-full"
                        />
                       <span onClick={()=> setHidePassword(!hidePassword)} className="tw-absolute tw-right-3 tw-bottom-2"> <i className={hidePassword?'fa fa-eye':'fa fa-eye-slash'} aria-hidden="true"></i></span>
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Log In {loading?<i className="fa fa-spinner fa-spin" aria-hidden="true"></i>:''}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
