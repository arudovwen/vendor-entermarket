import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory from "react-bootstrap-table2-editor"
import Dropzone from "react-dropzone"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"
import axios from "axios"

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getProducts as onGetProducts,
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
  deleteProduct as onDeleteProduct,
  getCategories as onGetCategories,
  getBrands as onGetBrands,
} from "store/actions"

import EcommerceProductsModal from "./EcommerceProductsModal"
import { toastr } from 'toastr';

const EcommerceProducts = props => {
  const dispatch = useDispatch()

  const { products } = useSelector(state => ({
    products: state.ecommerce.products,
  }))
  const { status } = useSelector(state => ({
    status: state.ecommerce.status,
  }))

  useEffect(() => {
    if (status === "ADD_PRODUCT_SUCCESS") {
      setModal(false)
    }
  }, [status])
  const { categories } = useSelector(state => ({
    categories: state.ecommerce.categories,
  }))
  const { brands } = useSelector(state => ({
    brands: state.ecommerce.brands,
  }))
  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [productList, setProductList] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [categoriesList, setcategoriesList] = useState([])
  const [brandList, setbrandList] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
   const [productImages, setproductImages] = useState([])
   const [isuploading, setisuploading] = useState(false)
  const handleNewProduct = (e, values) => {
    if(isuploading){
      toastr.info('Upload still in progres')
      return;
    }
    var detail = {
      category_id: values["category_id"],
      brand_id: values["brand_id"],
      product_name: values["product_name"],
      product_desc: values["product_desc"],
      price: values["price"],
      sales_price: values["sales_price"],
      in_stock: values["in_stock"],
      images: productImages,
    }
    dispatch(onAddNewProduct(detail))
  }
  const handleCheckBox = (id, value) => {
    var product = { id, active: value }
    dispatch(onUpdateProduct(product))
  }

  const handleTableUpdate = (id, value, column) => {

    var data = { id }

    switch (column) {
      case "price":
        data.price = value
        break
      case "product_name":
        data.product_name = value
        break
      case "product_desc":
        data.product_desc = value
        break
      case "sales_price":
        data.sales_price = value
        break
      case "in_stock":
        data.in_stock = value
        break

      default:
        break
    }
    dispatch(onUpdateProduct(data))
  }
  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: products.length, // replace later with size(products),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1)

  const EcommerceProductColumns = toggleModal => [
    {
      dataField: "id",
      text: " ID",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row, index) => (
        <Link to="#" className="text-body fw-bold">
          {index + 1}
        </Link>
      ),
    },
    {
      dataField: "category.name",
      text: "Category",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => <div>{row.category.name}</div>,
    },
    {
      dataField: "product_name",
      text: "Name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div
            data-toggle="tooltip"
            data-placement="top"
            title="Double click to edit"
          >
            {row.product_name}
          </div>
        </>
      ),
    },
    {
      dataField: "product_desc",
      text: "Description",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div
            data-toggle="tooltip"
            data-placement="top"
            title="Double click to edit"
          >
            {row.product_desc}
          </div>
        </>
      ),
    },
    {
      dataField: "created_at",
      text: "Created at",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
        >
          {handleValidDate(row.created_at)}
        </div>
      ),
      editable: () => {
        return false
      },
    },

    {
      dataField: "price",
      text: "Price ",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div
            data-toggle="tooltip"
            data-placement="top"
            title="Double click to edit"
          >
            {row.price}
          </div>
        </>
      ),
    },
    {
      dataField: "sales_price",
      isDummyField: true,
      text: "Sales Price",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div
            data-toggle="tooltip"
            data-placement="top"
            title="Double click to edit"
          >
            {row.sales_price ? row.sales_price : "-"}
          </div>
        </>
      ),
    },
    {
      dataField: "in_stock",
      text: "Available",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div
            data-toggle="tooltip"
            data-placement="top"
            title="Double click to edit"
          >
            {row.in_stock}
          </div>
        </>
      ),
    },
    {
      dataField: "active",
      text: "Active",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <div className="square-switch">
            <input
              type="checkbox"
              id={"square-switch" + row.id}
              switch="none"
              checked={row.active ? true : false}
              onChange={e => {
                handleCheckBox(row.id, !row.active)
              }}
            />
            <label
              className="mb-0"
              htmlFor={"square-switch" + row.id}
              data-on-label="On"
              data-off-label="Off"
            />
          </div>
        </>
      ),
      editable: () => {
        return false
      },
    },

    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, product) => (
        <>
          <div className="d-flex gap-3">
            {/* <Link
              to="#"
              className="text-success"
              onClick={() => handleProductClick(product)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link> */}
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDeleteProduct(product)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
      editable: () => {
        return false
      },
    },
  ]

  useEffect(() => {
      const store = JSON.parse(localStorage.getItem("authUser"))
      dispatch(onGetCategories(store.id))

  }, [dispatch])

  useEffect(() => {
    setcategoriesList(categories)
  }, [categories])

  useEffect(() => {
     const store = JSON.parse(localStorage.getItem("authUser"))
      dispatch(onGetBrands(store.id))

  }, [dispatch])

  useEffect(() => {
    setbrandList(brands)
  }, [brands])

  useEffect(() => {
     const store = JSON.parse(localStorage.getItem("authUser"))
      dispatch(onGetProducts(store.id))

  }, [dispatch])

  useEffect(() => {
    setProductList(products)
  }, [products])

  useEffect(() => {
    if (!isEmpty(products) && !!isEdit) {
      setProductList(products)
      setIsEdit(false)
    }
  }, [products])

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const handleProductClick = arg => {
    const product = arg

    setProductList({
      id: product.id,
      productId: product.product_no,
      name: product.product_name,
      created_at: product.created_at,
      available: product.in_stock,
      price: product.price,
      paymentMethod: product.price,
      description: product.product_desc,
    })

    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  const handleDeleteProduct = product => {
    if (product.id !== undefined) {
      dispatch(onDeleteProduct(product))
      onPaginationPageChange(1)
    }
  }

  const handleProductClicks = () => {
    setProductList("")
    setIsEdit(false)
    toggle()
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]
  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }
  function handleUploadImages(images) {
    setisuploading(true)
   var imagefiles = []
    handleAcceptedFiles(images)
    // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
    const uploads = images.map(image => {
      // our formdata
      const formData = new FormData()
      formData.append("file", image)
      formData.append("tags", "Products") // Add tags for the images - {Array}
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUNDINARY_UPLOAD_PRESET
      ) // Replace the preset name with your own
      formData.append("api_key", process.env.REACT_APP_CLOUNDINARY_APIKEY) // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0)

      // Replace cloudinary upload URL with yours
      return axios
        .post(`${process.env.REACT_APP_CLOUNDINARY_URL}`, formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(response => imagefiles.push(response.data.secure_url))

    })

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      // ... do anything after successful upload. You can setState() or save the data
      setproductImages(imagefiles)
       setisuploading(false)
    })
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
      <EcommerceProductsModal isOpen={modal1} toggle={toggleViewModal} />
      <div className="page-content">
        <MetaTags>
          <title>Products | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceProductColumns(toggle)}
                    data={products}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={products}
                        columns={EcommerceProductColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={handleProductClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New Product
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bproducted={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    cellEdit={cellEditFactory({
                                      mode: "dbclick",
                                      blurToSave: true,
                                      beforeSaveCell(
                                        oldValue,
                                        newValue,
                                        row,
                                        column,
                                        done
                                      ) {
                                        handleTableUpdate(
                                          row.id,
                                          newValue,
                                          column.dataField
                                        )
                                        done()
                                        return { async: true }
                                      },
                                    })}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Product" : "Add Product"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm onValidSubmit={handleNewProduct}>
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="product_name"
                                              label="Product Name"
                                              type="text"
                                              errorMessage="Invalid product name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="category_id"
                                              label="Product Category"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Category"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            >
                                              <option value="">
                                                Select category
                                              </option>
                                              {categoriesList.map(item => (
                                                <option
                                                  key={item.id}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              ))}
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="brand_id"
                                              label="Product brand"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid brand"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            >
                                              <option value="">
                                                Select brand
                                              </option>
                                              {brandList.map(item => (
                                                <option
                                                  key={item.id}
                                                  value={item.id}
                                                >
                                                  {item.name}
                                                </option>
                                              ))}
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="product_desc"
                                              label="Product Description"
                                              type="textarea"
                                              errorMessage="Invalid Product Description"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <AvField
                                              name="in_stock"
                                              label="In Stock"
                                              type="number"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="price"
                                              label="price"
                                              type="number"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="sales_price"
                                              label="Sales Price"
                                              type="number"
                                              errorMessage="Invalid sales price"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                          <Card>
                                            <CardBody>
                                              <CardTitle className="mb-3">
                                                Product Images
                                              </CardTitle>

                                              <Dropzone
                                                onDrop={images => {
                                                  handleUploadImages(images)
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
                                            </CardBody>
                                          </Card>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </AvForm>
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  onGetProducts: PropTypes.func,
  onAddNewProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onUpdateProduct: PropTypes.func,
}

export default withRouter(EcommerceProducts)
