import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
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
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions"


const EcommerceOrders = props => {
  const dispatch = useDispatch()

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }))

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  const toggleViewModal = () => setModal1(!modal1)

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "order_no",
      text: "Order No",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.order_no}
        </Link>
      ),
    },
    {
      dataField: "product.product_name",
      text: "Product Name",
      sort: true,
    },
    {
      dataField: "created_at",
      text: "Creation",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => handleValidDate(row.created_at),
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
      sort: true,
    },
    {
      dataField: "subtotal",
      text: "Subtotal",
      sort: true,
    },


  ]

  useEffect(() => {

      dispatch(onGetOrders())


  }, [dispatch])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    setModal(!modal)
  }

  const toLowerCase1 = str => {
    return str.toLowerCase()
  }

  const handleOrderClick = arg => {
    const order = arg

    setOrderList({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
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

  const handleDeleteOrder = order => {
    if (order.id !== undefined) {
      dispatch(onDeleteOrder(order))
      onPaginationPageChange(1)
    }
  }

  const handleValidOrderSubmit = (e, values) => {
    if (isEdit) {
      const updateOrder = {
        id: orderList.id,
        orderId: values.orderId,
        billingName: values.billingName,
        orderdate: values.orderdate,
        total: values.total,
        paymentStatus: values.paymentStatus,
        paymentMethod: values.paymentMethod,
        badgeclass: values.badgeclass,
      }

      // update order
      dispatch(onUpdateOrder(updateOrder))
    } else {
      const newOrder = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        orderId: values["orderId"],
        billingName: values["billingName"],
        orderdate: values["orderdate"],
        total: values["total"],
        paymentStatus: values["paymentStatus"],
        paymentMethod: values["paymentMethod"],
        badgeclass: values["badgeclass"],
      }
      // save new order
      dispatch(onAddNewOrder(newOrder))
    }
    toggle()
  }

  const handleOrderClicks = () => {
    setOrderList("")
    setIsEdit(false)
    toggle()
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>

      <div className="page-content">
        <MetaTags>
          <title>Orders | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders}
                        columns={EcommerceOrderColumns(toggle)}
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

                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
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
                                    {!!isEdit ? "Edit Order" : "Add Order"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <AvForm
                                      onValidSubmit={handleValidOrderSubmit}
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <AvField
                                              name="orderId"
                                              label="Order Id"
                                              type="text"
                                              errorMessage="Invalid orderId"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.orderId || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="billingName"
                                              label="Billing Name"
                                              type="text"
                                              errorMessage="Invalid Billing Name"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                orderList.billingName || ""
                                              }
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="orderdate"
                                              label="Date"
                                              type="date"
                                              errorMessage="Invalid Date"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.orderdate || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="total"
                                              label="Total"
                                              type="text"
                                              errorMessage="Invalid Total"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.total || ""}
                                            />
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentStatus"
                                              label="Payment Status"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Status"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                orderList.paymentStatus || ""
                                              }
                                            >
                                              <option>Paid</option>
                                              <option>Chargeback</option>
                                              <option>Refund</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="badgeclass"
                                              label="Badge Class"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Badge Class"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={orderList.badgeclass || ""}
                                            >
                                              <option>success</option>
                                              <option>danger</option>
                                              <option>warning</option>
                                            </AvField>
                                          </div>
                                          <div className="mb-3">
                                            <AvField
                                              name="paymentMethod"
                                              label="Payment Method"
                                              type="select"
                                              className="form-select"
                                              errorMessage="Invalid Payment Method"
                                              validate={{
                                                required: { value: true },
                                              }}
                                              value={
                                                orderList.paymentMethod || ""
                                              }
                                            >
                                              <option>Mastercard</option>
                                              <option>Visa</option>
                                              <option>Paypal</option>
                                              <option>COD</option>
                                            </AvField>
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

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

export default withRouter(EcommerceOrders)
