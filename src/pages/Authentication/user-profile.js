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
  Input,
} from "reactstrap"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Link } from "react-router-dom"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
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
  const [selectedFiles, setselectedFiles] = React.useState(null)
  const token = localStorage.getItem("user-token")
  const [productImages, setproductImages] = React.useState(null)
  const [isuploading, setisuploading] = React.useState(false)
  const [address, setAddress] = useState(null)
  const [lgas, setlgas] = useState([])
  const [lga, setlga] = useState([])
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)
  const [image, setImage] = useState("")
  const [location, setlocation] = useState("")
  const [status, setstatus] = useState("")
  const apikey = process.env.REACT_APP_APIKEY
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/get-lgas`).then(res => {
      if (res.status === 200) {
        setlgas(res.data)
      }
    })
  }, [])
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      setname(obj.name)
      setidx(obj.id)
      setemail(obj.email)
      setlocation(obj.location)
      setAddress({label:obj.location})
      setImage(obj.image)
      setstatus(obj.status)
      setlga(obj.lga_id)

      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
      if (success) {
        toastr.success("Profile updated")
      }
    }
  }, [dispatch, success])

  function handleValidSubmit(event, values) {
    if (isuploading) {
      return
    }
    const token = localStorage.getItem("user-token")

    var data = {
      name: values["name"],
      email: values["email"],
      location: address?.label,
      image: image,
      lga_id: values["lga_id"],
    }

    axios
      .post(`${process.env.REACT_APP_URL}/store/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          let obj = JSON.parse(localStorage.getItem("authUser"))
          toastr.success("Profile updated")
          obj.name = values["name"]
          obj.email = values["email"]
          obj.location = address?.label
          obj.image = image
          obj.lga_id = values["lga_id"]
          localStorage.setItem("authUser", JSON.stringify(obj))
          window.location.reload()
        }
      })
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
        setImage(response.data.secure_url)
        setisuploading(false)
      })
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

          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Update Store profile</h4>
              <AvForm
                className="form-horizontal tw-max-w-md tw-p-5"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="form-group mb-3">
                  <AvField
                    name="name"
                    label="Store Name"
                    value={name}
                    className="form-control"
                    placeholder="Enter new name"
                    type="text"
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div>
                <div className="mb-3">
                  <AvField
                    id="email"
                    name="email"
                    value={email}
                    label="Email"
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                  />
                </div>

                <div className="mb-3">
                  <label>Store Address </label>
                  <GooglePlacesAutocomplete
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
                    value={lga}
                  >
                    <option value="">Select lga</option>
                    {lgas.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.lga}
                      </option>
                    ))}
                  </AvField>
                </div>

                <div className="mb-3">
                  <label>Upload Store Image</label>
                  <Input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    onChange={handleUploadImages}
                  />

                  <div className="dropzone-previews mt-3" id="file-previews">
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
                                src={selectedFiles.preview || obj.image}
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
                                <strong>{selectedFiles.formattedSize}</strong>
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
                <div className="text-right mt-4">
                  <Button type="submit" color="success">
                    Update Profile
                  </Button>
                </div>
              </AvForm>

              <hr className="mt-5" />
              <div className="text-right tw-flex tw-justify-end">
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
