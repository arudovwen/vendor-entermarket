import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap"

export default function logistics() {
  return (
    <Card className="card-box">
      <CardHeader>
        <CardTitle>Logistics</CardTitle>
      </CardHeader>
      <CardBody className="">
        <Table responsive>
          <tbody>
            <tr>
              <td>Kwik Logistics</td>
            </tr>
            <tr>
              <td>Gokada</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
