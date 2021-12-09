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
  resetstatus,
  getBrands as onGetBrands,
  getCategories as onGetCategories,
  addNewBrand as onAddBrand,
  updateBrand as onUpdateBrand,
  deleteBrand as onDeleteBrand,
  addNewCategory as onAddCategory,
  updateCategory as onUpdateCategory,
  deleteCategory as onDeleteCategory,
} from "store/actions"

const EcommerceOthers = props => {
  const dispatch = useDispatch()

  const { categories } = useSelector(state => ({
    categories: state.ecommerce.categories,
  }))
  const { brands } = useSelector(state => ({
    brands: state.ecommerce.brands,
  }))

  const [modal, setModal] = useState(false)
  const [brandModal, setBrandModal] = useState(false)

  const { status } = useSelector(state => ({
    status: state.ecommerce.status,
  }))

  useEffect(() => {
    if (status === "ADD_CATEGORY_SUCCESS") {

      setModal(false)
       dispatch(resetstatus())
    }
    if (status === "ON_ADD_BRAND_SUCCESS") {
      setBrandModal(false)
       dispatch(resetstatus())
    }
  }, [status])
  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: categories.length, // replace later with size(products),
    custom: true,
  }

  const pageOptions1 = {
    sizePerPage: 10,
    totalSize: brands.length, // replace later with size(products),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1)

  const EcommerceCategoriesColumns = toggleModal => [
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
      dataField: "name",
      text: "Category",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
        >
          {row.name}
        </div>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, category) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDelete(category, "category")}
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
  const EcommerceBrandsColumns = toggleModal => [
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
      dataField: "name",
      text: "Brand",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
        >
          {row.name}
        </div>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, brand) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDelete(brand, "brand")}
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
  const selectRow = {
    mode: "checkbox",
  }

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("authUser"))
    dispatch(onGetCategories(store.id))
  }, [dispatch])

  useEffect(() => {
    const store = JSON.parse(localStorage.getItem("authUser"))

    dispatch(onGetBrands(store.id))
  }, [dispatch])

  const toggle = () => {
    setModal(!modal)
  }

  const toggleBrand = () => {
    setBrandModal(!brandModal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
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

  const handleNewCategory = (e, values) => {
    var detail = {
      name: values["name"],
    }
    dispatch(onAddCategory(detail))
  }
  const handleNewBrand = (e, values) => {
    var detail = {
      name: values["name"],
    }
    dispatch(onAddBrand(detail))
  }

  const handleDelete = (data, type) => {
    if (data.id !== undefined) {
      type === "category"
        ? dispatch(onDeleteCategory(data))
        : dispatch(onDeleteBrand(data))
      onPaginationPageChange(1)
    }
  }
  const handleTableUpdate = (id, value, column, type) => {
    var data = { id }

    switch (column) {
      case "name":
        data.name = value
        break

      default:
        break
    }

    type === "category"
      ? dispatch(onUpdateCategory(data))
      : dispatch(onUpdateBrand(data))
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Categories & Brands | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Others" />
          <Row>
            <Col xs="12" md="6">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceCategoriesColumns(toggle)}
                    data={categories}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={categories}
                        columns={EcommerceCategoriesColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <h4>All Categories</h4>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={toggle}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New
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
                                          column.dataField,
                                          "category"
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
                                    Add Category
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm onValidSubmit={handleNewCategory}>
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="name"
                                              label=" Name"
                                              type="text"
                                              errorMessage="Invalid  name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
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
            <Col xs="12" md="6">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions1)}
                    keyField="id"
                    columns={EcommerceBrandsColumns(toggle)}
                    data={brands}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={brands}
                        columns={EcommerceBrandsColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <h4>All Brands </h4>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={toggleBrand}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New
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
                                          column.dataField,
                                          "brand"
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
                                <Modal isOpen={brandModal} toggle={toggleBrand}>
                                  <ModalHeader toggle={toggleBrand} tag="h4">
                                    Add Brand
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm onValidSubmit={handleNewBrand}>
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="name"
                                              label=" Name"
                                              type="text"
                                              errorMessage="Invalid  name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
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

EcommerceOthers.propTypes = {
  categories: PropTypes.array,
  onGetCategories: PropTypes.func,
}

export default withRouter(EcommerceOthers)
