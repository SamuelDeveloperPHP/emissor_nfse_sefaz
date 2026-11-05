import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  ProgressBar,
  Row,
  Card,
 Dropdown,
  Table,
} from "react-bootstrap";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import Img2 from "../../../../images/companies/img-2.png";
import ReviewSlider from "../../../Components/Common/ReviewSlider";
import TableContainer from "../../../Components/Common/TableContainer";

import {
  Rating,
  Published,
  Price,
} from "../EcommerceProducts/EcommerceProductCol";

import Revenue from "../../DashboardEcommerce/Revenue";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";
import { onGetProducts } from "../../../slices/thunk";

const EcommerceSellerDetail = () => {
  const dispatch :any= useDispatch();

  const ecomsellerData = createSelector(
    (state :any) => state.Ecommerce,
    (products:any) => products.products
  );
  // Inside your component
  const products :any= useSelector(ecomsellerData);

  const [productList, setProductList] = useState<any>([]);

  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
  }, [dispatch,products]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const columns = useMemo(
    () => [
      {
        header: "#",
        cell: () => {
          return <input type="checkbox" className="form-check-input"/>;
        },
      },
      {
        header: "Product",
        cell: (product :any) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="avatar-sm bg-light rounded p-1">
                  <img
                    src={product.row.original.image}
                    alt=""
                    className="img-fluid d-block"
                  />
                </div>
              </div>
              <div className="flex-grow-1">
                <h5 className="fs-14 mb-1">
                  <a
                    href="apps-ecommerce-product-details"
                    className="text-body"
                  >
                    {" "}
                    {product.row.original.name}
                  </a>
                </h5>
                <p className="text-muted mb-0">
                  Category :{" "}
                  <span className="fw-medium">
                    {" "}
                    {product.row.original.category}
                  </span>
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        enableColumnFilter: false,
      },
      {
        header: "Price",
        accessorKey: "price",
        enableColumnFilter: false,
        cell: (cellProps  :any) => {
          return <Price {...cellProps} />;
        },
      },
      {
        header: "Orders",
        accessorKey: "orders",
        enableColumnFilter: false,
      },
      {
        header: "Rating",
        accessorKey: "rating",
        enableColumnFilter: false,
        cell: (cellProps  :any) => {
          return <Rating {...cellProps} />;
        },
      },
      {
        header: "Published",
        accessorKey: "publishedDate",
        enableColumnFilter: false,
        cell: (cellProps  :any) => {
          return <Published {...cellProps} />;
        },
      },
      {
        header: "Action",
        cell: (cellProps  :any) => {
          return (
            <Dropdown>
              <Dropdown.Toggle
                href="#"
                className="btn btn-soft-secondary btn-sm arrow-none"
                as="button"
              >
                <i className="ri-more-fill" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item href="apps-ecommerce-product-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </Dropdown.Item>

                <Dropdown.Item href="apps-ecommerce-add-product">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#removeItemModal"
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
          <Head title = "Sellers Details | Velzon - React Admin & Dashboard Template"/>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Seller Details" pageTitle="Ecommerce" />
          <Row>
            <div className="col-xxl-3">
              <Card>
                <Card.Body className="p-4">
                  <div>
                    <div className="flex-shrink-0 avatar-md mx-auto">
                      <div className="avatar-title bg-light rounded">
                        <img src={Img2} alt="" height="50" />
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h5 className="mb-1">Force Medicines</h5>
                      <p className="text-muted">Since 1987</p>
                    </div>
                    <div className="table-responsive">
                      <Table className="table mb-0 table-borderless">
                        <tbody>
                          <tr>
                            <th>
                              <span className="fw-medium">Owner Name</span>
                            </th>
                            <td>David Marshall</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Company Type</span>
                            </th>
                            <td>Partnership</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Email</span>
                            </th>
                            <td>forcemedicines@gamil.com</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Website</span>
                            </th>
                            <td>
                            <Link href="#" className="link-primary">
                                www.forcemedicines.com
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Contact No.</span>
                            </th>
                            <td>+(123) 9876 654 321</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Fax</span>
                            </th>
                            <td>+1 999 876 5432</td>
                          </tr>
                          <tr>
                            <th>
                              <span className="fw-medium">Location</span>
                            </th>
                            <td>United Kingdom</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Card.Body>
                <Card.Body className="border-top border-top-dashed p-4">
                  <div>
                    <h6 className="text-muted text-uppercase fw-semibold mb-4">
                      Customer Reviews
                    </h6>
                    <div>
                      <div>
                        <div className="bg-light px-3 py-2 rounded-2 mb-2">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <div className="fs-16 align-middle text-warning">
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-fill"></i>
                                <i className="ri-star-half-fill"></i>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <h6 className="mb-0">4.5 out of 5</h6>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted">
                            Total <span className="fw-medium">5.50k</span>{" "}
                            reviews
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                      <Row className="align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">5 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                              <ProgressBar
                                className="progress-sm"
                                variant="success"
                                now={50.16} />
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">2758</h6>
                            </div>
                          </div>
                        </Row>

                        <Row className="align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">4 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                                <ProgressBar
                                className="progress-sm"
                                  variant="success"
                                  now={29.32}/>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">1063</h6>
                            </div>
                          </div>
                        </Row>

                        <Row className="align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">3 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                                <ProgressBar
                                className="progress-sm"
                                  variant="warning"
                                  now={18.12}
                                />
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">997</h6>
                            </div>
                          </div>
                        </Row>

                        <Row className="align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">2 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                                <ProgressBar
                                className="progress-sm"
                                  variant="success"
                                  now={4.98}/>
                            </div>
                          </div>

                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">227</h6>
                            </div>
                          </div>
                        </Row>

                        <Row className="align-items-center g-2">
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0">1 star</h6>
                            </div>
                          </div>
                          <div className="col">
                            <div className="p-1">
                                <ProgressBar
                                className="progress-sm"
                                  variant="danger"
                                  now={7.42}/>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="p-1">
                              <h6 className="mb-0 text-muted">408</h6>
                            </div>
                          </div>
                        </Row>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Body className="p-4 border-top border-top-dashed">
                  <h6 className="text-muted text-uppercase fw-semibold mb-4">
                    Products Reviews
                  </h6>

                  <ReviewSlider />

                  <div className="text-center mt-3">
                    <Link href="#" className="link-primary">
                      View All Reviews{" "}
                      <i className="ri-arrow-right-line align-bottom ms-1"></i>
                    </Link>
                  </div>
                </Card.Body>
                <Card.Body className="p-4 border-top border-top-dashed">
                  <h6 className="text-muted text-uppercase fw-semibold mb-4">
                    Contact Support
                  </h6>
                  <form action="#">
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={4}
                        placeholder="Enter your messages..."
                      ></textarea>
                    </div>
                    <div className="text-end">
                      <button type="submit" className="btn btn-primary">
                        <i className="ri-mail-send-line align-bottom me-1"></i>{" "}
                        Send Messages
                      </button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </div>

            <div className="col-xxl-9">
              <Revenue />

              <Row className="g-4 mb-3">
                <div className="col-sm-auto">
                  <div>
                    <a
                      href="apps-ecommerce-add-product"
                      className="btn btn-success"
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add New
                    </a>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="d-flex justify-content-sm-end">
                    <div className="search-box ms-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Products..."
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </div>
              </Row>
              <Card>
                <Card.Body>
                  <div
                    className="table-card gridjs-border-none pb-2"
                  >
                    <TableContainer
                      columns={columns}
                      data={(productList || [])}
                      isGlobalFilter={false}
                      customPageSize={10}
                      divClass="table-responsive"
                      tableClass="mb-0 table-borderless"
                      theadClass="table-light text-muted"
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
EcommerceSellerDetail.layout = (page:any) => <Layout children={page}/>
export default EcommerceSellerDetail;
