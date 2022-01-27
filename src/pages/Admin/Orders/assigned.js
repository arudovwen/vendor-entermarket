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
import InfiniteScroll from "react-infinite-scroll-component"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  ButtonGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getOrders as onGetOrders } from "store/actions"
import { currency } from "../../../helpers/currency"
import { classname } from "classnames"

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
  const [shownTab, setshownTab] = useState(false)
  const [link, setlink] = useState(null)
  const [meta, setmeta] = useState(null)
  const [hasmore, sethasmore] = useState(false)
  const token = localStorage.getItem("admin-token")
  function getOrders() {


    axios
      .get(`${process.env.REACT_APP_URL}/admin/get/assigned/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorders(res.data.data)
          setorderItemsFiltered(res.data.data)
          setlink(res.data.links)
          setmeta(res.data.meta)
          if (res.data.total > 30) {
            sethasmore(true)
          }
        }
      })
  }

  const toggleShippingType = val => {
    let order
    setshowing(val)

    if (val === "all") {
      order = orders.filter(
        item => item.logistic_status.toLowerCase() !== "all"
      )
      setorderItemsFiltered(order)
    } else {
      order = orders.filter(
        item => item.logistic_status.toLowerCase() === val.toLowerCase()
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
            className="mx-2 "
            onClick={() => handleOrderClick(row)}
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

  const handleOrderClick = arg => {
    setOrderList(arg)
    toggle()
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const handleSearch = val => {
    let newsearch = orders.filter(item => item.order_no.includes(val))
    setorderItemsFiltered(newsearch)
  }
  const handleCheckBox = () => {
    setshowing("all")
    getOrders()
    setshownTab(!shownTab)
  }
  const fetchData = () => {
    if (!link.next) {
      sethasmore(false)
      return
    }

    axios
      .get(link.next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          let updatedOrder = [...orderItems, ...res.data.data]
          setorders(updatedOrder)
          setorderItemsFiltered(updatedOrder)
          setlink(res.data.links)
          setmeta(res.data.meta)
        }
      })
  }
  const handlePagination = val => {
    let url
    switch (val) {
      case "next":
        url = link.next
        break
      case "prev":
        url = link.prev
        break
      case "first":
        url = link.first
        break
      case "last":
        url = link.last
        break

      default:
        break
    }

    if (!url) return
    const token = localStorage.getItem("admin-token")
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorders(res.data.data)
          setorderItemsFiltered(res.data.data)
          setlink(res.data.links)
          setmeta(res.data.meta)
        }
      })
  }
  const refresh = () => {
    getOrders()
  }

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ]

   const handleSubmit = val => {
     var data = {
       logistic_status: val,
     }
     axios
       .put(
         `${process.env.REACT_APP_URL}/admin/update/order/status/${orderList.id}`,
         data,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       )
       .then(res => {
         if (res.status === 200) {
           getOrders()
           toggle()
         }
       })
   }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Assigned Orders | EnterMarket -</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Assigned" breadcrumbItem="Orders" />
          <Row className="my-5">
            <Col sm="3">
              <Input
                type="search"
                className="rounded-pill"
                placeholder="Search order no"
                onChange={e => handleSearch(e.target.value)}
              />
            </Col>
            <Col sm="3" className="d-flex align-items-center">
              <>
                <span className="mx-3">Toggle view</span>
                <div className="square-switch">
                  <input
                    type="checkbox"
                    id="square-switch"
                    switch="none"
                    checked={shownTab ? true : false}
                    onChange={() => {
                      handleCheckBox()
                    }}
                  />
                  <label className="mb-0" htmlFor="square-switch" />
                </div>
              </>
            </Col>
            <Col sm="6" className="d-flex justify-content-end">
              <span>
                {" "}
                <ButtonGroup>
                  <Button
                    onClick={() => toggleShippingType("all")}
                    className={showing !== "all" ? "opacity-50 px-3" : "px-3"}
                  >
                    {" "}
                    All
                  </Button>
                  <Button
                    sizw="sm"
                    onClick={() => toggleShippingType("out for delivery")}
                    className={
                      showing !== "out for delivery" ? "opacity-50" : ""
                    }
                  >
                    Out for delivery
                  </Button>

                  <Button
                    onClick={() => toggleShippingType("failed")}
                    className={showing !== "failed" ? "opacity-50" : ""}
                  >
                    Failed
                  </Button>

                  <Button
                    onClick={() => toggleShippingType("delivered")}
                    className={showing !== "delivered" ? "opacity-50" : ""}
                  >
                    Success
                  </Button>
                </ButtonGroup>
              </span>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle} size="md">
            <ModalHeader toggle={toggle} tag="h4">
              Order No : #{orderList.order_no}
            </ModalHeader>
            <ModalBody>
              {orderList.orderinfo ? (
                <h6>
                  Customer name :{" "}
                  <span className="text-capitalize">
                    {orderList.orderinfo.firstName}{" "}
                    {orderList.orderinfo.lastName}
                  </span>
                </h6>
              ) : (
                ""
              )}
              <h6>
                Email :{" "}
                <span className="">
                  {orderList.orderinfo ? orderList.orderinfo.email : ""}
                </span>
              </h6>
              <h6>
                Phone :{" "}
                <span className="text-capitalize">
                  {orderList.orderinfo ? orderList.orderinfo.phoneNumber : ""}
                </span>
              </h6>

              <h6>
                Address :{" "}
                <span className="text-capitalize">
                  {orderList.orderinfo
                    ? orderList.orderinfo.shipping_address
                    : ""}
                </span>
              </h6>
              <h6>
                State :{" "}
                <span className="text-capitalize">
                  {orderList.orderinfo ? orderList.orderinfo.state : ""}
                </span>
              </h6>
              <h6>
                Shipping Type :{" "}
                <span className="text-capitalize">
                  {orderList.shipping_method}
                </span>
              </h6>

              {orderList.shipping_method === "schedule" ? (
                <div>
                  <h6>Delivery Date : {orderList.schedule_time}</h6>
                </div>
              ) : (
                ""
              )}
              <div>
                <h6>Instructions</h6>
                <p>
                  <span>
                    {orderList.orderinfo
                      ? orderList.orderinfo.extra_instruction
                      : ""}
                  </span>
                </p>
              </div>
              {orderList.items ? (
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
                    {orderList.orderhistories.map((item, id) => (
                      <tr key={id}>
                        <td className="text-capitalize">{item.product_name}</td>
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
              <div className="my-4">
                <Table responsive borderless size="sm">
                  <tbody>
                    <tr>
                      <td>Total weight</td>
                      <td>{orderList.weight}kg</td>
                    </tr>
                    <tr>
                      <td>Total price</td>
                      <td>{currency.format(orderList.grand_total)}</td>
                    </tr>
                    <tr>
                      <td>Logistic</td>
                      <td className="text-capitalize">{orderList.logistic}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <h6 className="d-flex align-items-center p-2 bg-light">
                <span className="text-muted">Status :</span> {"   "}
                {orderList.logistic_status === "out for delivery" ? (
                  <span>
                    <span className="text-capitalize font-weight-bold mx-2">
                      {" "}
                      {orderList.logistic_status}
                      {"   "}
                    </span>
                    <span className="bx bx-timer"></span>
                  </span>
                ) : (
                  ""
                )}
                {orderList.logistic_status === "failed" ? (
                  <span>
                    <span className="text-capitalize font-weight-bold mx-2 text-danger">
                      {" "}
                      {orderList.logistic_status}
                      {"   "}
                    </span>
                    <span className="bx bx-x text-danger"></span>
                  </span>
                ) : (
                  ""
                )}
                {orderList.logistic_status === "delivered" ? (
                  <span>
                    <span className="text-capitalize font-weight-bold mx-2 text-success">
                      {" "}
                      {orderList.logistic_status}
                      {"   "}
                    </span>
                    <span className="bx bx-check text-success"></span>
                  </span>
                ) : (
                  ""
                )}
              </h6>
            </ModalBody>
            {orderList.logistic_status === "delivered" ? (
              ""
            ) : (
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => handleSubmit("failed")}
                  className="d-flex align-items-center"
                >
                  Mark as failed <span className="bx bx-x"></span>
                </Button>{" "}
                <Button
                  onClick={() => handleSubmit("delivered")}
                  className="d-flex align-items-center"
                >
                  Mark as delivered <span className="bx bx-check"></span>
                </Button>{" "}
              </ModalFooter>
            )}
          </Modal>
          {shownTab ? (
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
          ) : (
            <InfiniteScroll
              dataLength={orderItemsFiltered.length} //This is important field to render the next data
              next={fetchData}
              hasMore={hasmore}
              loader={
                <div style={{ textAlign: "center" }}>
                  {" "}
                  <i
                    className="fa fa-spinner fa-spin fa-2x "
                    aria-hidden="true"
                  ></i>
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>No more order! </b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={refresh}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8595; Pull down to refresh
                </h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8593; Release to refresh
                </h3>
              }
            >
              <Row>
                {orderItemsFiltered.map((item, id) => (
                  <Col md="3" key={id}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="d-flex justify-content-between align-items-center">
                          <span> {item.order_no}</span>

                          {item.logistic_status === null ? (
                            <i
                              className="fa fa-circle text-default"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            ""
                          )}
                          {item.logistic_status === "out for delivery" ? (
                            <i
                              className="fa fa-circle text-warning"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            ""
                          )}
                          {item.logistic_status === "failed" ? (
                            <i
                              className="fa fa-circle text-danger"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            ""
                          )}
                          {item.logistic_status === "delivered" ? (
                            <i
                              className="fa fa-circle text-primary"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            ""
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Table responsive>
                          <tbody>
                            <tr>
                              <td>Order </td>
                              <td className="font-weight-bolder">
                                {item.name}
                              </td>
                            </tr>
                            <tr>
                              <td>Items</td>
                              <td className="font-weight-bolder">
                                {item.items}
                              </td>
                            </tr>
                            <tr>
                              <td> Weight(kg)</td>
                              <td className="font-weight-bolder">
                                {item.weight}kg
                              </td>
                            </tr>
                            <tr>
                              <td>Delivery </td>
                              <td className="font-weight-bolder text-capitalize">
                                {item.shipping_method}
                              </td>
                            </tr>
                            <tr>
                              <td>Total price</td>
                              <td className="font-weight-bolder">
                                {currency.format(item.total_amount)}
                              </td>
                            </tr>
                            <tr>
                              <td>Logistic</td>
                              <td className="text-capitalize font-weight-bolder">
                                {item.logistic}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <div className="my-3">
                          {item.logistic_status === "out for delivery" ? (
                            <span className="d-flex justify-content-between align-items-center p-2 bg-light">
                              <span className="text-capitalize font-weight-bolder mx-2">
                                {" "}
                                {item.logistic_status} {"   "}
                              </span>
                              <span className="bx bx-timer"></span>
                            </span>
                          ) : (
                            ""
                          )}
                          {item.logistic_status === "failed" ? (
                            <span className="d-flex justify-content-between align-items-center p-2 bg-light text-danger">
                              <span className="text-capitalize font-weight-bolder mx-2">
                                {" "}
                                {item.logistic_status} {"   "}
                              </span>
                              <span className="bx bx-x"></span>
                            </span>
                          ) : (
                            ""
                          )}
                          {item.logistic_status === "delivered" ? (
                            <span className="d-flex justify-content-between align-items-center p-2 bg-light text-success">
                              <span className="text-capitalize font-weight-bolder mx-2">
                                {" "}
                                {item.logistic_status} {"   "}
                              </span>
                              <span className="bx bx-check"></span>
                            </span>
                          ) : (
                            ""
                          )}
                        </div>

                        <Button
                          block
                          className="w-100"
                          onClick={() => handleOrderClick(item)}
                        >
                          View
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          )}
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
