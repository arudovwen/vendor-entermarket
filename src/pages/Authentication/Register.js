import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Row, Col, CardBody, Card, Alert, Container, Input } from "reactstrap"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import { Link, useHistory } from "react-router-dom"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

// import images
import profileImg from "../../assets/images/profile-img.png"
import axios from "axios"
import logo from "assets/images/logo.png"
const Register = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [selectedFiles, setselectedFiles] = React.useState(null)
  const token = localStorage.getItem("user-token")
  const [productImages, setproductImages] = React.useState(null)
  const [isuploading, setisuploading] = React.useState(false)
 const [address, setAddress] = useState(null)
 const [lgas,setlgas] = useState([])
 const apikey = process.env.REACT_APP_APIKEY
  React.useEffect(() => {
  axios.get(`${process.env.REACT_APP_URL}/get-lgas`).then(res=>{
    if(res.status === 200) {
      setlgas(res.data)
    }
  })
  }, [])
  const [hidePassword, setHidePassword] = React.useState(false)
  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))

  // handleValidSubmit
  const handleValidSubmit = values => {
    if(isuploading){
      return;
    }
    var data = {
      name: values["name"],
      password: values["password"],
      email: values["email"],
      location: address.label,
      image: productImages,
      lga_id:values["lga_id"],
    }
     dispatch(registerUser(data))


  }

  useEffect(() => {
    if (user) {
      history.push("/login")
    }
  }, [user])

  useEffect(() => {
    dispatch(apiError(""))
  }, [])

  function handleAcceptedFiles(file) {
    var file = {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    }

    setselectedFiles(file)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }
  function handleUploadImages(e) {
    setisuploading(true)

    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
    var image = e.target.files[0]
    handleAcceptedFiles(image)
    // our formdata
    const formData = new FormData()
    formData.append("file", image)
    formData.append("tags", "storeImage") // Add tags for the images - {Array}
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET
    ) // Replace the preset name with your own
    formData.append("api_key", process.env.REACT_APP_CLOUNDINARY_APIKEY) // Replace API key with your own Cloudinary API key
    formData.append("timestamp", (Date.now() / 1000) | 0)

    // Replace cloudinary upload URL with yours
    axios
      .post(`${process.env.REACT_APP_CLOUNDINARY_URL}`, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
      .then(response => {
        setproductImages(response.data.secure_url)
        setisuploading(false)
      })
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
                        <img
                          className="text-primary mb-2"
                          src={logo}
                          height="40"
                        />
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
                        <Alert color="success">Registration Successful</Alert>
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
                      <div className="mb-3">
                        <label>Store Address </label>
                        <GooglePlacesAutocomplete
                          required
                          name="location"
                          label="Store location"
                          selectProps={{
                            address,
                            onChange: setAddress,
                          }}
                          apiKey={apikey}
                          placeholder="Enter location e.g 10, Admiralty way, lekki, Lagos, Nigeria"
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="lga_id"
                          label="Local Govt Area"
                          type="select"
                          className="form-select"
                          errorMessage="Invalid lga"
                          validate={{
                            required: { value: true },
                          }}
                          value=""
                        >
                          <option value="">Select lga</option>
                          {lgas.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.lga}
                            </option>
                          ))}
                        </AvField>
                      </div>

                      <div>
                        <label>Upload Store Image</label>
                        <Input
                          type="file"
                          className="form-control"
                          id="inputGroupFile01"
                          onChange={handleUploadImages}
                        />

                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles ? (
                            <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={selectedFiles.name}
                                      src={selectedFiles.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {selectedFiles.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>
                                        {selectedFiles.formattedSize}
                                      </strong>
                                    </p>
                                  </Col>
                                  <Col>
                                    {isuploading ? (
                                      <i
                                        className="fa fa-spinner fa-spin fa-3x"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      <i
                                        className="fa fa-check-circle fa-2x text-primary"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register{" "}
                          {loading ? (
                            <i
                              className="fa fa-spinner fa-spin"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            ""
                          )}
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
