import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

//actions
import { getEarningChartsData, getStoreEarnings } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { currency } from './../../helpers/currency';

function Earning(props) {
  const dispatch = useDispatch();
   const [series, setseries] = useState([])
  const { earningChartData } = useSelector(state => ({
    earningChartData: state.dashboard.earnings,
  }));

  const options = {
    chart: {
      toolbar: "false",
      dropShadow: {
        enabled: !0,
        color: "#000",
        top: 18,
        left: 7,
        blur: 8,
        opacity: 0.2,
      },
    },
    dataLabels: {
      enabled: !1,
    },
    colors: ["#556ee6"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
  };
  useEffect(() => {
   if(earningChartData && earningChartData.earningChart){
    setseries([
      {
        name: "Amount",
        data: [...earningChartData.earningChart],
      },
    ])
   }
  
  }, [earningChartData])


  /*
  call api action to receive data
  */
  useEffect(() => {
   
  
      dispatch(getStoreEarnings());
  
  }, [dispatch]);
   

  const [seletedMonth, setSeletedMonth] = useState("jan");
  const onChangeMonth = value => {
    setSeletedMonth(value);
    dispatch(getEarningChartsData(value));
  };

  return (
    <React.Fragment>
      <Col xl="8">
        <Card>
          <CardBody>
            <div className="clearfix">
             
              <h4 className="card-title mb-4">Earnings</h4>
            </div>

            <Row>
              <Col lg="4">
                <div className="text-muted">
                  <div className="mb-4">
                    <p  className="mb-3">This month</p>
                    <h4>{currency.format(earningChartData.earningthismonth|0)}</h4>
                    <div>
                      <span className="badge badge-soft-success font-size-12 me-1">
                        {" "}
                        {currency.format(earningChartData.earning |0)}{" "}
                      </span>{" "}
                      Total Earnings
                    </div>
                  </div>

                  <div>
                    <Link to="#" className="btn btn-primary  btn-sm">
                      View Details{" "}
                      <i className="mdi mdi-chevron-right ms-1"></i>
                    </Link>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2">Last month</p>
                    <h5>{currency.format(earningChartData.earninglastmonth |0)}</h5>
                  </div>
                </div>
              </Col>

              <Col lg="8">
                <div id="line-chart" dir="ltr">
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={350}
                    className="apex-charts"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default Earning;
