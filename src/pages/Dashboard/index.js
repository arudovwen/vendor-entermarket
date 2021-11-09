import React, { useEffect } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from "react-meta-tags"



//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import MiniWidget from "./mini-widget"
import Earning from "./earning"
import TotalSellingProduct from "./total-selling-product"
import { useDispatch, useSelector } from 'react-redux';
import { getStoreReport as onGetReports } from './../../store/dashboard/actions';


const Dashboard = props => {
  const dispatch = useDispatch();
  const {reports} = useSelector(state=>({
    reports:state.dashboard.reports
  }))

  useEffect(() => {
 
    if (reports && !reports.length) {
   
      dispatch(onGetReports())
    }
 
  }, [dispatch, reports])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>EnterMarket | Vendor</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="" />

          <Row>
            {/* welcome card
            <CardWelcome /> */}

            <Col>
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} />
              </Row>
            </Col>
          </Row>

          <Row>
            {/* earning */}
            <Earning />

               {/* total selling product */}
               <TotalSellingProduct />
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
