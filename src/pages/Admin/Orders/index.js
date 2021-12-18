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
  Label,
  Badge,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { currency } from "../../../helpers/currency"

const Orders = props => {
  const dispatch = useDispatch()
  const [orderItems, setorderItems] = useState([])
  const [orderItemsFiltered, setorderItemsFiltered] = useState([])

  const selectRow = {
    mode: "checkbox",
  }

  function getOrders() {
    const token = localStorage.getItem("admin-token")
    axios
      .get(`${process.env.REACT_APP_URL}/admin/get/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorderItems(res.data.data)
          setorderItemsFiltered(res.data.data)
        }
      })
  }

  useEffect(() => {
    getOrders()
    return () => {
      setorderItems()
    }
  }, [])

  const [modal, setModal] = useState(false)
  const [orderList, setOrderList] = useState({})
  const [showing, setshowing] = useState("all")
  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orderItemsFiltered ? orderItemsFiltered.length : 0, // replace later with size(orders),
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
            size="sm"
            className="mr-2"
            onClick={() => handleOrderClick(row)}
          >
            View
          </Button>{" "}
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

  const handleOrderClick = arg => {
    setOrderList(arg)
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

  const toggleShippingType = val => {
    let orders
    setshowing(val)

    if (val === "all") {
      orders = orderItems.filter(
        item => item.shipping_method.toLowerCase() !== "all"
      )
      setorderItemsFiltered(orders)
    } else {
      orders = orderItems.filter(
        item => item.shipping_method.toLowerCase() === val.toLowerCase()
      )
      setorderItemsFiltered(orders)
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

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Orders | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Orders" />
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
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col
                                sm="8"
                                className="d-flex justify-content-end align-items-center"
                              >

                                <span>
                                  {" "}
                                  <ButtonGroup>
                                    <Button
                                      onClick={() => toggleShippingType("all")}
                                      className={
                                        showing !== "all"
                                          ? "opacity-50 px-4"
                                          : "px-4"
                                      }
                                    >
                                      {" "}
                                      All
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        toggleShippingType("standard")
                                      }
                                      className={
                                        showing !== "standard"
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      Standard
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        toggleShippingType("express")
                                      }
                                      className={
                                        showing !== "express"
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      Express
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        toggleShippingType("schedule")
                                      }
                                      className={
                                        showing !== "schedule"
                                          ? "opacity-50"
                                          : ""
                                      }
                                    >
                                      Scheduled
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
                                    Order No : #{orderList.order_no}
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
                                    {orderList.orderhistoriesitems ? (
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
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button className="text-capitalize">
                                      {orderList.status}
                                    </Button>
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

Orders.propTypes = {
  orderItems: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

export default withRouter(Orders)
