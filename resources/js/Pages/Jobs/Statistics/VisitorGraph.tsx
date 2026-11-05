import React from "react";
import { Card, Col, Dropdown } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../Components/Common/ChartsDynamicColor";


const VisitorGraph = ({ dataColors }:any) => {
  var chartTreemapDiffColor = getChartColorsArray(dataColors);

  const series = [
    {
      data: [
        {
          x: "USA",
          y: 321,
        },
        {
          x: "Russia",
          y: 165,
        },
        {
          x: "India",
          y: 184,
        },
        {
          x: "China",
          y: 98,
        },
        {
          x: "Canada",
          y: 84,
        },
        {
          x: "Brazil",
          y: 31,
        },
        {
          x: "UK",
          y: 70,
        },
        {
          x: "Australia",
          y: 30,
        },
        {
          x: "Germany",
          y: 44,
        },
        {
          x: "Italy",
          y: 68,
        },
        {
          x: "Israel",
          y: 28,
        },
        {
          x: "Indonesia",
          y: 19,
        },
        {
          x: "Bangladesh",
          y: 29,
        },
      ],
    },
  ];
  var options:any = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Visitors Location",
      align: "center",
      style: {
        fontWeight: 500,
      },
    },
    colors: chartTreemapDiffColor,
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };
  return (
    <React.Fragment>
      <Col className="col-xl-8">
        <Card className="card">
          <Card.Header>
            <div className="d-flex">
              <h5 className="card-title mb-0 flex-grow-1  ">Visitor Graph</h5>
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
                      Current Week
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
            </div>
          </Card.Header>
          <Card.Body>
            <ReactApexChart dir="ltr"
              className="apex-charts"
              series={series}
              options={options}
              type="treemap"
              height={350}
            />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default VisitorGraph;
