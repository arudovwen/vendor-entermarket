import PropTypes from "prop-types"
import React from "react"
import { Col, Card, CardBody } from "reactstrap"

const MiniWidget = ({ reports }) => {
  return (
    <React.Fragment>
      {reports.map((report, key) => (
        <Col sm="4" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-sm me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-28">
                    <i className={report.icon} />
                  </span>
                </div>
                <div className="text-muted mt-4">
                  <h3 className="font-size-20 mb-0 text-muted">{report.title}</h3>
                  <h1>
                    {report.value}{" "}

                  </h1>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <span
                  className={
                    "badge badge-soft-" + report.color + " font-size-12"
                  }
                >
                  {" "}
                  {report.badgeValue}{" "}
                </span>{" "}
                <span className="ms-2 text-truncate">{report.desc}</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

MiniWidget.propTypes = {
  reports: PropTypes.array,
}

export default MiniWidget
