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
import axios from "axios"
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
  ModalFooter,
  Table,
  Label,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { currency } from "../../../helpers/currency"
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

  const [order, setOrder] = useState({})
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
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent, row) => (
        <span className="text-capitalize">{row.status}</span>
      ),
    },
    {
      dataField: "action",
      text: "Action",
      sort: true,
      formatter: (cellContent, row) => (
        <Button
          size="sm"
          className="bg-secondary bg-sm text-sm"
          onClick={() => viewOrder(row)}
        >
          View order
        </Button>
      ),
    },
  ]

  useEffect(() => {
    dispatch(onGetOrders())
  }, [dispatch])

  useEffect(() => {
    setOrderList(orders.filter(item => item.status === "pending"))
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders.filter(item => item.status === "pending"))
      setIsEdit(false)
    }
  }, [orders])

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

  function viewOrder(order) {
    setOrder(order)
    toggle()
  }

  function markComplete(id) {
    let con = window.confirm("Are you sure?")
    if (con) {
      axios
        .get(`${process.env.REACT_APP_URL}/mark-order-complete/${id}`)
        .then(res => {
          if (res.status === 200) {
            toastr.success("Success")
            dispatch(onGetOrders())
          }
        })
    }
  }
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
                    data={orders.filter(item => item.status === "pending")}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders.filter(item => item.status === "pending")}
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
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                {orders.filter(
                                  item => item.status === "pending"
                                ).length ? (
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                ) : (
                                  <div className="p-2 text-center">
                                    No order available
                                  </div>
                                )}
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
          {order && (
            <Modal isOpen={modal} toggle={toggle} size="lg">
              <ModalHeader toggle={toggle} tag="h4">
                Order No : #{order.order_no}
              </ModalHeader>
              <ModalBody>
                {order.orderinfo ? (
                  <h6>
                    Customer name :{" "}
                    <span className="text-capitalize">
                      {order.orderinfo.firstName} {order.orderinfo.lastName}
                    </span>
                  </h6>
                ) : (
                  ""
                )}
                <h6>
                  Email :{" "}
                  <span className="">
                    {order.orderinfo ? order.orderinfo.email : ""}
                  </span>
                </h6>
                <h6>
                  Phone :{" "}
                  <span className="text-capitalize">
                    {order.orderinfo ? order.orderinfo.phoneNumber : ""}
                  </span>
                </h6>
                <h6>
                  Address :{" "}
                  <span className="text-capitalize">
                    {order.orderinfo ? order.orderinfo.shipping_address : ""}
                  </span>
                </h6>

                {order.myorder &&
                order.myorder.shipping_method === "scheduled" ? (
                  <div>
                    <h6>
                      Delivery Date : {moment(order.myorder.schedule_time).format('L')}
                    </h6>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <h6>Instructions</h6>
                  <p>
                    <span>
                      {order.orderinfo ? order.orderinfo.extra_instruction : ""}
                    </span>
                  </p>
                </div>
                {order.orderhistories ? (
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Store</th>
                        <th>Price</th>
                        <th>weight(kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderhistories.map((item, id) => (
                        <tr key={id}>
                          <td className="text-capitalize">
                            {item.product_name}
                          </td>
                          <td>{item.quantity}</td>
                          <td className="text-capitalize">{item.store_name}</td>
                          <td>{currency.format(item.price)} </td>
                          <td>{item.weight}kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  ""
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => markComplete(order.id)}
                >
                  Mark as delivered
                </Button>
              </ModalFooter>
            </Modal>
          )}
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
