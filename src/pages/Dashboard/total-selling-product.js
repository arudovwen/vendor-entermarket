import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Table } from "reactstrap";
import ReactApexChart from "react-apexcharts";

//redux
import { useSelector, useDispatch } from "react-redux";

//actions
import { getTopEarners } from "../../store/actions";
import * as moment from "moment";
import { currency } from './../../helpers/currency';

const getChartOptions = index => {
  var options = {
    chart: { sparkline: { enabled: !0 } },
    dataLabels: { enabled: !1 },
    colors: ["#556ee6"],
    plotOptions: {
      radialBar: {
        hollow: { margin: 0, size: "60%" },
        track: { margin: 0 },
        dataLabels: { show: !1 },
      },
    },
  };
  switch (index) {
    case 1:
      options["colors"][0] = "#556ee6";
      break;
    case 2:
      options["colors"][0] = "#34c38f";
      break;
    case 3:
      options["colors"][0] = "#f46a6a";
      break;
    default:
      break;
  }

  return options;
};

const TotalSellngProduct = props => {
  const dispatch = useDispatch();
  const [topSellingData, settopSellingData] = useState(null)

  const { sellingData } = useSelector(state => ({
    sellingData: state.dashboard.topearners,
  }));


  useEffect(() => {
    dispatch(getTopEarners());
  }, [dispatch]);

  useEffect(()=>{
    settopSellingData(sellingData.shift() )

  },[sellingData])

  const [seletedMonth, setSeletedMonth] = useState("");
  const currentdate = moment(new Date()).format("MMM Y")
  const onChangeMonth = value => {
    setSeletedMonth(value);
    dispatch(getTopSellingProduct(value));
  };

  return (
    <React.Fragment>
      <Col xl="4">
        <Card>
          <CardBody>
            <div className="clearfix">
              <div className="float-end">
                <div className="input-group input-group-sm">

                  <label className="input-group-text">{currentdate}</label>
                </div>
              </div>
              <h4 className="card-title mb-4">Top 5 Sales</h4>
            </div>

            <div className="text-muted text-center">
              <p className="mb-2">{topSellingData?topSellingData.product.product_name:0}</p>
              <h4>{topSellingData? currency.format(topSellingData.subtotal):currency.format(0)}</h4>
              <p className="mt-4 mb-0">
                <span className="badge badge-soft-success font-size-11 me-2">
                  {" "}
                  0.6% <i className="mdi mdi-arrow-up" />{" "}
                </span>{" "}
                From previous period
              </p>
            </div>

            <div className="table-responsive mt-4">
              <Table className="table align-middle mb-0">
                <tbody>
                  {(sellingData || []).map((data, key) => {
                    const options = getChartOptions(key + 1);
                    return (
                      <tr key={key}>
                        <td>
                          <h5 className="font-size-13 mb-1">{data.product.product_name}</h5>

                        </td>

                        <td>
                          <div id="radialchart-1">
                            <ReactApexChart
                              options={options}
                              series={[data.subtotal]}
                              type="radialBar"
                              height={60}
                              width={60}
                              className="apex-charts"
                            />
                          </div>
                        </td>
                        <td>
                          <p className="text-muted mb-1">Sales</p>
                          <h5 className="mb-0">{currency.format(data.subtotal|0)}</h5>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default TotalSellngProduct;
