import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
import Dropzone from "react-dropzone"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link, useHistory } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"

import logo from "assets/images/logo.png"
const Register = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedFiles, setselectedFiles] = React.useState([])
  const token = localStorage.getItem('user-token')

  React.useEffect(() => {
    if(token){
      history.push('/dashboard')
    }
   
  }, [token])

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = values => {
    var data  = {
      name:values['name'],
      password: values['password'],
      email: values['email'],
      location:values['location'],
      images: selectedFiles,
    }
    dispatch(registerUser(data))
  }
 useEffect(() => {
    if(user){
      history.push('/login')
    }

   }, [user])
  
  useEffect(() => {
    dispatch(apiError(""))
  }, [])
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | EnterMarket</title>
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
                    <Col className="col-7">
                      <div className="text-primary p-4">
                      <img className="text-primary mb-2" src={logo} height="40"  />
                        <p>Get started today.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  
                  <div className="p-2 mt-4">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(v)
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Registration Successful
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <AvField
                          id="email"
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="name"
                          label="Store name"
                          type="text"
                          required
                          placeholder="Enter store name"
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="location"
                          label="Store location"
                          type="text"
                          required
                          placeholder="Enter location e.g Lekki"
                        />
                      </div>

                   
                                          <div>
                                            <label>Upload Store Image</label>
                                            <Dropzone
                                                onDrop={acceptedFiles => {
                                                  handleAcceptedFiles(
                                                    acceptedFiles
                                                  )
                                                }}
                                              >
                                                {({
                                                  getRootProps,
                                                  getInputProps,
                                                }) => (
                                                  <div className="dropzone">
                                                    <div
                                                      className="dz-message needsclick"
                                                      {...getRootProps()}
                                                    >
                                                      <input
                                                        {...getInputProps()}
                                                      />
                                                      <div className="dz-message needsclick">
                                                        <div className="mb-3">
                                                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                        </div>
                                                        <h4>
                                                          Drop files here or
                                                          click to upload.
                                                        </h4>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )}
                                              </Dropzone>
                                              <div
                                                className="dropzone-previews mt-3"
                                                id="file-previews"
                                              >
                                                {selectedFiles.map((f, i) => {
                                                  return (
                                                    <Card
                                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                      key={i + "-file"}
                                                    >
                                                      <div className="p-2">
                                                        <Row className="align-items-center">
                                                          <Col className="col-auto">
                                                            <img
                                                              data-dz-thumbnail=""
                                                              height="80"
                                                              className="avatar-sm rounded bg-light"
                                                              alt={f.name}
                                                              src={f.preview}
                                                            />
                                                          </Col>
                                                          <Col>
                                                            <Link
                                                              to="#"
                                                              className="text-muted font-weight-bold"
                                                            >
                                                              {f.name}
                                                            </Link>
                                                            <p className="mb-0">
                                                              <strong>
                                                                {
                                                                  f.formattedSize
                                                                }
                                                              </strong>
                                                            </p>
                                                          </Col>
                                                        </Row>
                                                      </div>
                                                    </Card>
                                                  )
                                                })}
                                              </div>
                                          

                                          </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the EnterMarket{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
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

export default Register
