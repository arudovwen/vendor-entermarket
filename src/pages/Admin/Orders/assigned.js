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
  Table,
  Label,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getOrders as onGetOrders } from "store/actions"
import { currency } from "../../../helpers/currency"
import { classname } from 'classnames';

const AssignedOrders = props => {
  const dispatch = useDispatch()

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [orderList, setOrderList] = useState([])
  const [orders, setorders] = useState([])
  const [orderItemsFiltered, setorderItemsFiltered] = useState([])
  const [showing, setshowing] = useState("all")
  function getOrders() {
    const token = localStorage.getItem("admin-token")

    axios
      .get(`${process.env.REACT_APP_URL}/admin/get/assigned/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorders(res.data)
          setorderItemsFiltered(res.data)
        }
      })
  }

  const toggleShippingType = val => {
    let order
    setshowing(val)

    if (val === "all") {
      order = orders.filter(
        item => item.shipping_method.toLowerCase() !== "all"
      )
      setorderItemsFiltered(order)
    } else {
      order = orders.filter(
        item => item.shipping_method.toLowerCase() === val.toLowerCase()
      )
      setorderItemsFiltered(order)
    }
  }

  useEffect(() => {
    getOrders()
    return () => {
      setorders()
    }
  }, [])

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orderItemsFiltered?orderItemsFiltered.length:0, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  const toggleViewModal = () => setModal1(!modal1)

  const OrderColumns = () => [
    {
      dataField: "order_no",
      text: "Order No",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <span className="text-body fw-bold">{row.order_no}</span>
      ),
    },

    {
      dataField: "items",
      text: "No of Items",
      sort: true,
    },
    {
      dataField: "weight",
      text: "Weight(kg)",
      sort: true,
    },
    {
      dataField: "shipping_method",
      text: "Delivery Type",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <span className="text-capitalize">{row.shipping_method}</span>
      ),
    },

    {
      dataField: "grand_total",
      text: "Price",
      sort: true,
      formatter: (cellContent, row) => currency.format(row.grand_total),
    },
    {
      dataField: "status",
      text: "Delivery Status",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {" "}
          <span className="text-capitalize">{row.status}</span>
        </div>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      formatter: (cellContent, row) => (
        <div className="d-flex">
          <Button
            pill
            size="sm"
            className="mx-2 "
            onClick={() => handleOrderClicks(row)}
          >
            View
          </Button>{" "}
          <Button size="sm" className="mx-2 ">
            Re-query
          </Button>
        </div>
      ),
    },
  ]


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

  const handleOrderClicks = (arg) => {
    setOrderList(arg)

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
          <title>Assigned Orders | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Assigned" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={OrderColumns(toggle)}
                    data={orderItemsFiltered}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orderItemsFiltered}
                        columns={OrderColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box   d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col
                                sm="8"
                                className="d-flex justify-content-end"
                              >
                                <span>
                                  {" "}
                                  <ButtonGroup>
                                    <Button
                                      onClick={() =>
                                        toggleShippingType("all")
                                      }
                                      className={
                                        showing !== "all"
                                          ? "opacity-50 px-3"
                                          : "px-3"
                                      }
                                    >
                                      {" "}
                                      All
                                    </Button>
                                    <Button
                                      sizw="sm"
                                      onClick={() =>
                                        toggleShippingType("out for delivery")
                                      }
                                      className={
                                        showing !== "out for delivery"
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      Out for delivery
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        toggleShippingType("failed")
                                      }
                                      className={
                                        showing !== "failed" ? "opacity-50" : ""
                                      }
                                    >
                                      Failed
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        toggleShippingType("success")
                                      }
                                      className={
                                        showing !== "success"
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      Success
                                    </Button>
                                  </ButtonGroup>
                                </span>
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
                                    Order No : #85969696
                                  </ModalHeader>
                                  <ModalBody>
                                    {orderList.user ? (
                                      <h6>
                                        Customer name :{" "}
                                        <span className="text-capitalize">
                                          {orderList.user.firstName}{" "}
                                          {orderList.user.lastName}
                                        </span>
                                      </h6>
                                    ) : (
                                      ""
                                    )}

                                    <h6>
                                      Address :{" "}
                                      <span className="text-capitalize">
                                        {orderList.orderinfo
                                          ? orderList.orderinfo.shipping_address
                                          : ""}
                                      </span>
                                    </h6>
                                    <h6>
                                      Shipping Type :{" "}
                                      <span className="text-capitalize">
                                        {orderList.shipping_method}
                                      </span>
                                    </h6>

                                    {orderList.shipping_method ===
                                    "schedule" ? (
                                      <div>
                                        <h6>
                                          Delivery Date :{" "}
                                          {orderList.schedule_time}
                                        </h6>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div>
                                      <h6>Instructions</h6>
                                      <p>
                                        <span>
                                          {orderList.orderinfo
                                            ? orderList.orderinfo
                                                .extra_instruction
                                            : ""}
                                        </span>
                                      </p>
                                    </div>
                                    {orderList.items ? (
                                      <Table>
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
                                          {orderList.orderhistories.map(
                                            (item, id) => (
                                              <tr key={id}>
                                                <td className="text-capitalize">
                                                  {item.product_name}
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td className="text-capitalize">
                                                  {item.store_name}
                                                </td>
                                                <td>
                                                  {currency.format(item.price)}{" "}
                                                </td>
                                                <td>{item.weight}kg</td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </Table>
                                    ) : (
                                      ""
                                    )}
                                    <div className="my-4">
                                      <Table borderless size="sm">
                                        <tbody>
                                          <tr>
                                            <td>Total weight</td>
                                            <td>{orderList.weight}kg</td>
                                          </tr>
                                          <tr>
                                            <td>Total price</td>
                                            <td>
                                              {currency.format(
                                                orderList.grand_total
                                              )}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                    <h5 className="d-flex align-items-center p-2 bg-light">
                                      <span className="text-muted">
                                        Status :
                                      </span>{" "}
                                      {"   "}
                                      <span className="font-weight-bold mx-2">
                                        {" "}
                                        Out For Delivery{"   "}
                                      </span>
                                      <span className="bx bx-timer"></span>
                                    </h5>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button className="d-flex align-items-center">
                                      Re-query{" "}
                                      <span className="bx bx-rotate-right"></span>
                                    </Button>{" "}
                                  </ModalFooter>
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

AssignedOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

export default withRouter(AssignedOrders)
