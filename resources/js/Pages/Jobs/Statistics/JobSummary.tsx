import React from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";

const JobSummary = ({ dataColors }:any) => {
  var revenueExpensesChartsColors = getChartColorsArray(dataColors);
  var series = [
    {
      name: "Application Sent  ",
      data: [33, 28, 30, 35, 40, 55, 70, 110, 150, 180, 210, 250],
    },
    {
      name: " Interviews",
      data: [20, 26, 45, 32, 42, 53, 59, 70, 78, 97, 110, 125],
    },
    {
      name: " Hired",
      data: [12, 17, 45, 42, 24, 35, 42, 75, 102, 108, 156, 199],
    },
    {
      name: " Rejected",
      data: [8, 13, 22, 27, 32, 34, 46, 59, 65, 97, 100, 110],
    },
  ];
  var options:any = {
    chart: {
      height: 320,
      type: "area",
      toolbar: "false",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: revenueExpensesChartsColors,
    fill: {
      opacity: 0.06,
      colors: revenueExpensesChartsColors,
      type: "solid",
    },
  };
  return (
    <React.Fragment>
      <Col xxl={8} md={6}>
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Jobs Summary</h4>
            <div className="flex-shrink-0">
            <Dropdown className="card-header-dropdown">
                <Dropdown.Toggle
                  className="text-reset dropdown-btn arrow-none"
                  as="a"
                  href="#"
                >
                  <span className="fw-semibold text-uppercase fs-12">
                    Sort by:{" "}
                  </span>
                  <span className="text-muted">
                    Current Year
                    <i className="mdi mdi-chevron-down ms-1"></i>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item href="#">Today</Dropdown.Item>
                  <Dropdown.Item href="#">Last Week</Dropdown.Item>
                  <Dropdown.Item href="#">Last Month</Dropdown.Item>
                  <Dropdown.Item href="#">Current Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <Card.Body className="card-body px-0">
            <ReactApexChart dir="ltr"
              className="apex-charts"
              series={series}
              options={options}
              type="area"
              height={320}
            />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default JobSummary;
