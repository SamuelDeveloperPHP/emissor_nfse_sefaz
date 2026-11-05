import React from "react";
import { Container, Row } from "react-bootstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SalesByLocations from "../DashboardEcommerce/SalesByLocations";
import ApplicationsStatistic from "./ApplicationsStatistic";
import Candidates from "./Candidates";
import FeaturedCompanies from "./FeaturedCompanies";
import RecentApplicants from "./RecentApplicants";
import RecomendedJobs from "./RecomendedJobs";
import Widgets from "./Widgets";
import { Head } from "@inertiajs/react";
import Layout from "../../Layouts";

const DashboardJobs = () => {

  return (
    <React.Fragment>
        <Head title = "Jobs Dashboard | Velzon - React Admin & Dashboard Template"/>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Job Dashboard" pageTitle="Dashboards" />

          <Row>
            <Widgets />
            <FeaturedCompanies />
          </Row>

          <Row>
            <ApplicationsStatistic dataColors='["--vz-success", "--vz-info", "--vz-primary"]' />
            <Candidates />
          </Row>

          <Row>
            <RecomendedJobs />
          </Row>

          <Row>
            <RecentApplicants />
            <SalesByLocations />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
DashboardJobs.layout = (page:any) => <Layout children={page}/>
export default DashboardJobs;
