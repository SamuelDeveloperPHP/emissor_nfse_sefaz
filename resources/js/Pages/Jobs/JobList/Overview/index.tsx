import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import JobDescription from "./JobDescription";
import RelatedJobs from "./RelatedJobs";
import RightSection from "./RightSection";
import { Head } from "@inertiajs/react";
import Layout from "../../../../Layouts";

const JobOverview = () => {

  return (
    <React.Fragment>
      <Head title = "Job Overview | Velzon -  Admin & Dashboard Template"/>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Header />
          </Row>

          <Row className="mt-n5">
            <Col xxl={9}>
              <JobDescription />

              <RelatedJobs />
            </Col>
            <Col xxl={3}>
              <RightSection />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
JobOverview.layout = (page:any) => <Layout children={page}/>
export default JobOverview;
