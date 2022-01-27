import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Button,

} from "reactstrap"
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function minipending() {
   const [orders, setorders] = React.useState([])
  function getOrders() {
    const token = localStorage.getItem("admin-token")

    axios
      .get(`${process.env.REACT_APP_URL}/admin/get/pending/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setorders(res.data.data.slice(0,9))

        }
      })
  }

  React.useEffect(() => {
    getOrders()
    return () => {
      setorders()
    }
  }, [])

  return (
    <Card className="card-box">
      <CardHeader>
        <CardTitle>Pending Orders</CardTitle>
      </CardHeader>
      <CardBody className="p-5  d-flex justify-content-between flex-column">
        <div>
          {orders.length ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order No</th>
                  <th>Total weight(kg)</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, id) => (
                  <tr key={item.id}>
                    <td>{id + 1}</td>
                    <td>{item.order_no}</td>
                    <td>{item.weight}kg</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className='text-center'>No pending order</div>
          )}
        </div>
        <div className="text-right">
          <Link to="/admin/orders/pending">
            <Button className="" size="sm">
              {" "}
              View all
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}
