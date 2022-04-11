import React, { useEffect, useState, useRef, useMemo } from "react"
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
import debounce from "lodash.debounce"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Input,
  Label,
  Badge,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
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
  const [shownTab, setshownTab] = useState(false)
  const [link, setlink] = useState(null)
  const [meta, setmeta] = useState(null)
  const [hasmore, sethasmore] = useState(false)
  const token = localStorage.getItem("admin-token")
  const [startdate, setStartdate] = useState(new Date())
  const [enddate, setEnddate] = useState(null)

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
          setlink(res.data.links)
          setmeta(res.data.meta)
          if (res.data.meta.total > 20) {
            sethasmore(true)
          }
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
    markasviewed(arg.id)
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
  // useEffect(() => {
  //   if (orderItemsFiltered.length<) {
  //     sethasmore(false)
  //   }
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const handleSearch = val => {
    const token = localStorage.getItem("admin-token")
    setorderItems([])
    setorderItemsFiltered([])
    axios
      .get(`${process.env.REACT_APP_URL}/search/order?query=${val}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorderItems(res.data.data)
          setorderItemsFiltered(res.data.data)
          setlink(res.data.links)
          setmeta(res.data.meta)
          if (res.data.meta.total > 20) {
            sethasmore(true)
          }
        }
      })
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(val => handleSearch(val), 500),
    []
  )
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
    const token = localStorage.getItem("admin-token")
    axios
      .get(link.next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          let updatedOrder = [...orderItems, ...res.data.data]
          setorderItems(updatedOrder)
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
          setorderItems(res.data.data)
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
  const markasviewed = (id) => {
    var data = {
      view_at: new Date(),
    }
    axios
      .put(
        `${process.env.REACT_APP_URL}/admin/update/order/status/${id}`,
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
        }
      })
  }
  function handleSearchByDate(dates)  {

    const [start, end] = dates;
    setStartdate(start);
    setEnddate(end);
    handledatesearch(start,end)
  };
  function handledatesearch(start,end) {
   if(!start && !end){
     getOrders()
     return
   }
    const token = localStorage.getItem("admin-token")
    setorderItems([])
    setorderItemsFiltered([])
    let data = {
      start: start,
      end: end,
    }
    axios
      .post(`${process.env.REACT_APP_URL}/search/order-by-date`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorderItems(res.data.data)
          setorderItemsFiltered(res.data.data)
          setlink(res.data.links)
          setmeta(res.data.meta)
          if (res.data.meta.total > 20) {
            sethasmore(true)
          }
        }
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Orders | EnterMarket </title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Orders" />
          <Row className="my-5 align-items-end">
            <Col sm="3">
              <Input
                type="search"
                className="rounded-pill px-3"
                placeholder="Search by order no, order name, weight"
                onChange={e => debouncedChangeHandler(e.target.value)}
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
            <Col
              sm="6"
              className="d-flex justify-content-between align-items-end"
            >
              <div className="w-100 mx-4">
                <div className="text-xs ">Filter by date</div>
                <DatePicker
                  selected={startdate}
                  onChange={handleSearchByDate}
                  startDate={startdate}
                  endDate={enddate}
                  selectsRange
                  isClearable={true}
                  shouldCloseOnSelect={false}
                  className="w-100 rounded-pill border py-2"
                />
              </div>
              <span>
                {" "}
                <ButtonGroup>
                  <Button
                    onClick={() => toggleShippingType("all")}
                    className={showing !== "all" ? "opacity-50 px-4" : "px-4"}
                  >
                    {" "}
                    All
                  </Button>
                  <Button
                    onClick={() => toggleShippingType("standard")}
                    className={showing !== "standard" ? "opacity-50" : ""}
                  >
                    Standard
                  </Button>

                  <Button
                    onClick={() => toggleShippingType("express")}
                    className={showing !== "express" ? "opacity-50" : ""}
                  >
                    Express
                  </Button>

                  <Button
                    onClick={() => toggleShippingType("schedule")}
                    className={showing !== "schedule" ? "opacity-50" : ""}
                  >
                    Scheduled
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
              {orderList.orderhistoriesitems ? (
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
                  </tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <span>Status</span>{" "}
              <Button className="text-capitalize"> {orderList.status}</Button>
            </ModalFooter>
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
                              <>
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
                                    <Pagination>
                                      <PaginationItem>
                                        <PaginationLink
                                          first
                                          href="#"
                                          onClick={() =>
                                            handlePagination("first")
                                          }
                                        />
                                      </PaginationItem>
                                      <PaginationItem>
                                        <PaginationLink
                                          href="#"
                                          previous
                                          onClick={() =>
                                            handlePagination("previous")
                                          }
                                        />
                                      </PaginationItem>

                                      <PaginationItem>
                                        <PaginationLink
                                          href="#"
                                          next
                                          onClick={() =>
                                            handlePagination("next")
                                          }
                                        />
                                      </PaginationItem>
                                      <PaginationItem>
                                        <PaginationLink
                                          href="#"
                                          last
                                          onClick={() =>
                                            handlePagination("last")
                                          }
                                        />
                                      </PaginationItem>
                                    </Pagination>
                                  </Col>
                                </Row>
                              </>
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
            <div>
              <div className="d-flex my-4">
                <span>
                  Pending{" "}
                  <i
                    className="fa fa-circle text-default"
                    aria-hidden="true"
                  ></i>
                </span>
                <span className="mx-3">
                  Assigned{" "}
                  <i
                    className="fa fa-circle text-warning"
                    aria-hidden="true"
                  ></i>
                </span>
                <span>
                  Delivered{" "}
                  <i
                    className="fa fa-circle text-primary"
                    aria-hidden="true"
                  ></i>
                </span>
                <span className="mx-3">
                  Failed{" "}
                  <i
                    className="fa fa-circle text-danger"
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
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
                            <span>
                              {!item.view_at ? (
                                <Badge
                                  color="primary"
                                  className="mr-1 bg-primary"
                                >
                                  New
                                </Badge>
                              ) : (
                                ""
                              )}{" "}
                              {item.order_no}
                            </span>

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
                            </tbody>
                          </Table>

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
            </div>
          )}
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
