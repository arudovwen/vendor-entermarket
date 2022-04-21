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
import { currency } from "../../../helpers/currency"
import toastr from "toastr"
import "toastr/build/toastr.min.css"

const EcommerceOthers = props => {
  const dispatch = useDispatch()

  const [lgas, setLgas] = useState([])
  const [modal, setModal] = useState(false)

  const { status } = useSelector(state => ({
    status: state.ecommerce.status,
  }))

  const [isdisabled, setisdisabled] = useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/lga-prices`).then(res => {
      if (res.status === 200) {
        setLgas(res.data)
      }
    })
  }, [])
  //pagination customization
  const pageOptions = {
    sizePerPage: 25,
    totalSize: lgas.length, // replace later with size(products),
    custom: true,
  }
  currency

  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1)

  const EcommercelgasColumns = toggleModal => [
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
      dataField: "lga",
      text: "Lga",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {row.lga}
        </div>
      ),
    },
    {
      dataField: "standard_fee",
      text: "Standard shipping",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {currency.format(row.standard_fee)}
        </div>
      ),
    },
    {
      dataField: "express_fee",
      text: "Express shipping",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
          className="cursor-pointer"
        >
          {currency.format(row.express_fee)}
        </div>
      ),
    },
    {
      dataField: "scheduled_fee",
      text: "Scheduled shipping",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <div
          data-toggle="tooltip"
          data-placement="top"
          title="Double click to edit"
        >
          {currency.format(row.scheduled_fee)}
        </div>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, lga) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-danger"
              onClick={() => handleDelete(lga)}
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

  const toggle = () => {
    setModal(!modal)
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

  const handleDelete = data => {
    let confirm = window.confirm("Are you sure?")
    if (confirm) {
      if (data.id !== undefined) {
        axios
          .delete(`${process.env.REACT_APP_URL}/lga-prices/${data.id}`)
          .then(res => {
            if (res.status === 200) {
              toastr.success("Updated")

              let filteredLga = [...lgas].filter(item =>  Number(item.id) !== Number(data.id) )

              setLgas(filteredLga)
            }
          })
      }
    }
  }
  const handleTableUpdate = (id, value, column) => {
    var data = { id }

    switch (column) {
      case "standard_fee":
        data.standard_fee = value
        break
      case "express_fee":
        data.express_fee = value
        break
      case "scheduled_fee":
        data.scheduled_fee = value
        break

      default:
        break
    }
    axios
      .put(`${process.env.REACT_APP_URL}/lga-prices/${id}`, data)
      .then(res => {
        if (res.status === 200) {
          toastr.success("Updated")
        }
      })
  }
  function addLga(e, values) {
    setisdisabled(true)
    var data = {
      lga: values["lga"],
      standard_fee: values["standard_fee"],
      express_fee: values["express_fee"],
      scheduled_fee: values["scheduled_fee"],
    }
    axios
      .post(`${process.env.REACT_APP_URL}/lga-prices`, data)
      .then(res => {
        if (res.status === 201) {
          toastr.success("Added")
          setisdisabled(false)
          toggle()

          let filteredLga = [res.data, ...lgas]
           setLgas(filteredLga)
        }
      })
      .catch(() => {
        setisdisabled(false)
        toastr.error("Server error")
      })
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
          <title>Lgas & Fees | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Lgas" breadcrumbItem="Fees" />
          <Row className="justify-content-center">
            <Col xs="12" md="9">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommercelgasColumns(toggle)}
                    data={lgas}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={lgas}
                        columns={EcommercelgasColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2 align-items-center">
                              <Col sm="4">
                                <h4>All Lgas</h4>
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
                              <Col>
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
                                    Add lga
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm onValidSubmit={addLga}>
                                      <Row>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="lga"
                                              label=" Lga Name"
                                              type="text"
                                              errorMessage="Invalid  name"
                                              placeholder="Enter lga name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="standard_fee"
                                              label=" Standard fee"
                                              type="number"
                                              errorMessage="Invalid  "
                                              placeholder="NGN0.00"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="express_fee"
                                              label=" Express Fee"
                                              type="number"
                                              errorMessage="Invalid "
                                              placeholder="NGN0.00"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value=""
                                            />
                                          </div>
                                        </Col>
                                        <Col className="col-lg-6">
                                          <div className="mb-3">
                                            <AvField
                                              name="scheduled_fee"
                                              label=" Scheduled fee"
                                              type="number"
                                              errorMessage="Invalid "
                                              placeholder="NGN0.00"
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
                                              disabled={isdisabled}
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
  lgas: PropTypes.array,
}

export default withRouter(EcommerceOthers)
