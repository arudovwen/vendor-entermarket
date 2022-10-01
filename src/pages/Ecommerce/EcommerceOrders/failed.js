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
    setOrderList(orders.filter(item => item.status === "failed"))
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders.filter(item => item.status === "failed"))
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
            toastr.success("Status updated")
            dispatch(onGetOrders())
            toggle()
          }
        })
    }
  }
  function markFailed(id) {
    let con = window.confirm("Are you sure?")
    if (con) {
      axios
        .get(`${process.env.REACT_APP_URL}/mark-order-failed/${id}`)
        .then(res => {
          if (res.status === 200) {
            toastr.success("Status updated")
            dispatch(onGetOrders())
            toggle()
          }
        })
    }
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Failed Orders | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Failed Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders.filter(item => item.status === "failed")}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders.filter(item => item.status === "failed")}
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
                              <Col
                                sm="12"
                                className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination"
                              >
                                {orders.filter(
                                  item => item.status === "failed"
                                ).length ? (
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                ) : (
                                  <div className="p-2 text-center tw-w-full">
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
                  <div className="tw-grid tw-grid-cols-4 tw-gap-4 mb-2">
                    <span> Customer name:</span>
                    <span className="text-capitalize tw-font-medium tw-col-span-2">
                      {order.orderinfo.firstName}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="tw-grid tw-grid-cols-4 tw-gap-4 mb-2">
                <span> Email :{" "}</span>
                <span className="text-capitalize tw-font-medium">
                    {order.orderinfo ? order.orderinfo.email : ""}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-4 tw-gap-4 mb-2">
                  Phone :{" "}
                  <span className="text-capitalize tw-font-medium tw-col-span-2">
                    {order.orderinfo ? order.orderinfo.phoneNumber : ""}
                  </span>
                </div>
                <div className="tw-grid tw-grid-cols-4 tw-gap-4 mb-2">
                  Address :{" "}
                  <span className="text-capitalize tw-font-medium tw-col-span-2">
                    {order.orderinfo ? order.orderinfo.shipping_address : ""}
                  </span>
                </div>

                {order.myorder &&
                order.myorder.shipping_method === "scheduled" ? (
                  <div>
                   <div className="tw-grid tw-grid-cols-4 tw-gap-4 mb-2">
                      Delivery Date :{" "}
                      <span className="text-capitalize tw-font-medium">
                      {moment(order.myorder.schedule_time).format("L")}
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <div>Instructions</div>
                  <p>
                  <span className="text-capitalize tw-font-medium">
                      {order.orderinfo ? order.orderinfo.extra_instruction : "N/a"}
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
                          <td className="text-capitalize tw-text-sm">
                            {item.product_name}
                          </td>
                          <td  className="text-capitalize tw-text-sm">{item.quantity}</td>
                          <td className="text-capitalize tw-text-sm">{item.store_name}</td>
                          <td  className="text-capitalize tw-text-sm">{currency.format(item.price)} </td>
                          <td  className="text-capitalize tw-text-sm">{item.weight || '-'}</td>
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
                  color="danger"
                  size="sm"
                 
                  className="tw-mr-4"
                >
                  Failed
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
