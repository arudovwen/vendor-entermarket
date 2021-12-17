import React, { useEffect } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import MetaTags from "react-meta-tags"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import Components

import { useDispatch, useSelector } from "react-redux"
import Minipending from './minipending';
import Miniassigned from './miniassigned';
import Logistics from './logistics';

const Dashboard = props => {
  const obj = JSON.parse(localStorage.getItem("authAdmin"))
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>{obj.name} | EnterMarket</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="" />

          <Row>
            <Col lg="5">
              <Minipending/>
            </Col>

            <Col lg="5">
              <Miniassigned/>
            </Col>
            <Col lg="2">
              <Logistics/>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
