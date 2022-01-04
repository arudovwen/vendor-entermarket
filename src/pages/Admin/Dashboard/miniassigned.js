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
export default function miniassigned() {
    const [orders, setorders] = React.useState([])
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
            setorders(res.data.data.slice(0, 9))
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
    <Card className='card-box'>
      <CardHeader>
        <CardTitle>Assigned Orders</CardTitle>
      </CardHeader>
      <CardBody className="p-5 d-flex justify-content-between flex-column">
        {orders.length ? (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Logistic</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

                {orders.map((item, id) => (
                  <tr key={item.id}>
                    <td>{id + 1}</td>
                    <td>{item.order_no}</td>
                    <td className="text-capitalize">{item.logistic} </td>
                    <td className="text-capitalize">{item.logistic_status}</td>
                  </tr>
                ))}

            </tbody>
          </Table>
        ) : (
          ""
        )}
        <div className="text-right">

          <Link to="/admin/orders/assigned">
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
