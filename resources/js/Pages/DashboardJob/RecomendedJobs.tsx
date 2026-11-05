import React, { useMemo} from "react";
import { Col, Card, Row, Form } from "react-bootstrap";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { recomendedJob } from "../../common/data";

const RecomendedJobs = () => {
  const columns = useMemo(
    () => [
      {
        header: "Position",
        accessorKey: "position",
        disableFilters: true,
        enableColumnFilter: true,
      },
      {
        header: "Company Name",
        accessorKey: "company",
        disableFilters: true,
        enableColumnFilter: true,
      },
      {
        header: "Location",
        accessorKey: "location",
        disableFilters: true,
        enableColumnFilter: true,
      },
      {
        header: "Salary",
        accessorKey: "salary",
        disableFilters: true,
        enableColumnFilter: true,
      },
      {
        header: "Experience",
        accessorKey: "experience",
        disableFilters: true,
        enableColumnFilter: true,
      },
      {
        header: "Job Type",
        accessorKey: "type",
        disableFilters: true,
        enableColumnFilter: true,
      },
    ], []
  );
  return (
    <Row>
      <div className="col-lg-12">
        <Card>
          <Card.Header>
            <Row className="g-4 align-items-center">
              <div className="col-sm-auto">
                <div>
                  <h4 className="card-title mb-0 flex-grow-1">Recommended Jobs</h4>
                </div>
              </div>
              <div className="col-sm">
                <div className="d-flex justify-content-sm-end">
                  <div className="search-box ms-2">
                    <Form.Control type="text" className="form-control" id="searchResultList" placeholder="Search for jobs..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </div>
              </div>
            </Row>
          </Card.Header>
          <Card.Body>
            <TableContainer
              columns={(columns || [])}
              data={(recomendedJob || [])}
              isGlobalFilter={false}
              customPageSize={5}
              tableClass="table-centered align-middle table-nowrap mb-0"
              theadClass="text-muted table-light"
              SearchPlaceholder='Search...'
            />
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
  }
export default RecomendedJobs;
