import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  Dropdown,
  Nav,
  Row,
  Card,
  Col,
  Accordion,
} from "react-bootstrap";
// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Rating, Published, Price } from "./EcommerceProductCol";
//Import data
import { productsData } from "../../../common/data";

import { isEmpty } from "lodash";
import Select from "react-select";

//redux
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { onGetProducts, ondeleteProducts } from "../../../slices/thunk";
import { Head, Link } from "@inertiajs/react";
import Layout from "../../../Layouts";

const SingleOptions = [
  { value: 'Watches', label: 'Watches' },
  { value: 'Headset', label: 'Headset' },
  { value: 'Sweatshirt', label: 'Sweatshirt' },
  { value: '20% off', label: '20% off' },
  { value: '4 star', label: '4 star' },
];

const EcommerceProducts = (props: any) => {
  const dispatch: any = useDispatch();

  const selectecomproductData = createSelector(
    (state: any) => state.Ecommerce,
    (products: any) => products.products
  );
  // Inside your component
  const products: any = useSelector(selectecomproductData);

  const [productList, setProductList] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<any>("1");
  const [selectedMulti, setselectedMulti] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);

  function handleMulti(selectedMulti: any) {
    setselectedMulti(selectedMulti);
  }

  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab: any, type: any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredProducts = products;
      if (type !== "all") {
        filteredProducts = products.filter((product: any) => product.status === type);
      }
      setProductList(filteredProducts);
    }
  };

  const [cate, setCate] = useState("all");

  const categories = (category: any) => {
    let filteredProducts = products;
    if (category !== "all") {
      filteredProducts = products.filter((product: any) => product.category === category);
    }
    setProductList(filteredProducts);
    setCate(category);
  };

  const [mincost, setMincost] = useState(0);
  const [maxcost, setMaxcost] = useState(500);
  useEffect(() => {
    onUpDate([mincost, maxcost]);
  }, [mincost, maxcost]);

  const onUpDate = (value: any) => {
    setProductList(
      productsData.filter(
        (product: any) => product.price >= value[0] && product.price <= value[1]
      )
    )
    setMincost(value[0]);
    setMaxcost(value[1]);
  };


  const [ratingvalues, setRatingvalues] = useState<any>([]);
  /*
  on change rating checkbox method
  */
  const onChangeRating = (value: any) => {
    setProductList(productsData.filter((product: any) => product.rating >= value));

    // var modifiedRating = [...ratingvalues];
    // modifiedRating.push(value);
    // setRatingvalues(modifiedRating);
  };

  const onUncheckMark = (value: any) => {
    var modifiedRating = [...ratingvalues];
    const modifiedData = (modifiedRating || []).filter(x => x !== value);
    /*
    find min values
    */
    var filteredProducts = productsData;
    if (modifiedData && modifiedData.length && value !== 1) {
      var minValue = Math.min(...modifiedData);
      if (minValue && minValue !== Infinity) {
        filteredProducts = productsData.filter(
          (product: any) => product.rating >= minValue
        );
        setRatingvalues(modifiedData);
      }
    } else {
      filteredProducts = productsData;
    }
    setProductList(filteredProducts);
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState<boolean>(false);

  const onClickDelete = (product: any) => {
    setProduct(product);
    setDeleteModal(true);
  };

  const handleDeleteProduct = () => {
    if (product) {
      dispatch(ondeleteProducts(product.id));
      setDeleteModal(false);
    }
  };


  const [dele, setDele] = useState<any>(0);

  // Displat Delete Button
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = 'none';
    } else {
      del.style.display = 'block';
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element") as HTMLElement;
    ele.forEach((element: any) => {
      dispatch(ondeleteProducts(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
      del.style.display = 'none';
    });
  };

  const columns = useMemo(() => [
    {
      header: "#",
      cell: (cell: any) => {
        return <input type="checkbox" className="productCheckBox form-check-input" value={cell.getValue()} onClick={() => displayDelete()} />;
      },
    },
    {
      header: "Product",
      cell: (product: any) => (
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
                <Link
                  href="/apps-ecommerce-product-details"
                  className="text-body"
                >
                  {" "}
                  {product.getValue()}
                </Link>
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
      cell: (cellProps: any) => {
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
      cell: (cellProps: any) => {
        return <Rating {...cellProps} />;
      },
    },
    {
      header: "Published",
      accessorKey: "publishedDate",
      enableColumnFilter: false,
      cell: (cellProps: any) => {
        return <Published {...cellProps} />;
      },
    },
    {
      header: "Action",
      cell: (cellProps: any) => {
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
                onClick={() => {
                  const productData = cellProps.row.original;
                  onClickDelete(productData);
                }}
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
      <Head title="Products | Velzon - React Admin & Dashboard Template" />
      <div className="page-content">
        <ToastContainer closeButton={false} limit={1} />

        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteProduct}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Container fluid>
          <BreadCrumb title="Products" pageTitle="Ecommerce" />

          <Row>
            <Col xl={3} lg={4}>
              <Card>
                <Card.Header >
                  <div className="d-flex mb-3">
                    <div className="flex-grow-1">
                      <h5 className="fs-16">Filters</h5>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href="#" className="text-decoration-underline">
                        Clear All
                      </Link>
                    </div>
                  </div>

                  <div className="filter-choices-input">
                    <Select
                      value={selectedMulti}
                      isMulti={true}
                      onChange={(selectedMulti: any) => {
                        handleMulti(selectedMulti);
                      }}
                      options={SingleOptions}
                    />
                  </div>
                </Card.Header>

                <div className="accordion accordion-flush">
                  <div className="card-body border-bottom">
                    <div>
                      <p className="text-muted text-uppercase fs-12 fw-medium mb-2">
                        Products
                      </p>
                      <ul className="list-unstyled mb-0 filter-list">
                        <li>
                          <a href="#" className={cate === "Kitchen Storage & Containers" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Kitchen Storage & Containers")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Grocery</h5>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "Clothes" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Clothes")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Fashion</h5>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <span className="badge bg-light text-muted">5</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "Watches" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Watches")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Watches</h5>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "electronics" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("electronics")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Electronics</h5>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <span className="badge bg-light text-muted">5</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "Furniture" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Furniture")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Furniture</h5>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <span className="badge bg-light text-muted">6</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "Bike Accessories" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Bike Accessories")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Automotive Accessories</h5>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "appliances" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("appliances")}>
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Appliances</h5>
                            </div>
                            <div className="flex-shrink-0 ms-2">
                              <span className="badge bg-light text-muted">7</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className={cate === "Bags, Wallets and Luggage" ? "active d-flex py-1 align-items-center" : "d-flex py-1 align-items-center"} onClick={() => categories("Bags, Wallets and Luggage")} >
                            <div className="flex-grow-1">
                              <h5 className="fs-13 mb-0 listname">Kids</h5>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-body border-bottom">
                    <p className="text-muted text-uppercase fs-12 fw-medium mb-4">
                      Price
                    </p>

                    <Nouislider
                      range={{ min: 0, max: 2000 }}
                      start={[mincost, maxcost]}
                      connect
                      onSlide={onUpDate}
                      data-slider-color="primary"
                      id="product-price-range"
                    />
                    <div className="formCost d-flex gap-2 align-items-center mt-3">
                      <input className="form-control form-control-sm" type="text" value={`$ ${mincost}`} onChange={(e: any) => setMincost(e.target.value)} id="minCost" readOnly />
                      <span className="fw-semibold text-muted">to</span>
                      <input className="form-control form-control-sm" type="text" value={`$ ${maxcost}`} onChange={(e: any) => setMaxcost(e.target.value)} id="maxCost" readOnly />
                    </div>
                  </div>

                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>

                        <span className="text-muted text-uppercase fs-12 fw-medium p-0">
                          Brands
                        </span>{" "}
                        <span className="badge bg-success rounded-pill align-middle ms-1">
                          2
                        </span>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div
                          id="flush-collapseBrands"
                          className="accordion-collapse collapse show"
                          aria-labelledby="flush-headingBrands"
                        >
                          <div className="accordion-body text-body pt-0">
                            <div className="search-box search-box-sm">
                              <input
                                type="text"
                                className="form-control bg-light border-0"
                                placeholder="Search Brands..."
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                            <div className="d-flex flex-column gap-2 mt-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="productBrandRadio5"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="productBrandRadio5"
                                >
                                  Boat
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="productBrandRadio4"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="productBrandRadio4"
                                >
                                  OnePlus
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="productBrandRadio3"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="productBrandRadio3"
                                >
                                  Realme
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="productBrandRadio2"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="productBrandRadio2"
                                >
                                  Sony
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="productBrandRadio1"
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="productBrandRadio1"
                                >
                                  JBL
                                </label>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  className="btn btn-link text-decoration-none text-uppercase fw-medium p-0"
                                >
                                  1,235 More
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>



                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <span className="text-muted text-uppercase fs-12 fw-medium">
                          Discount
                        </span>{" "}
                        <span className="badge bg-success rounded-pill align-middle ms-1">
                          1
                        </span>
                      </Accordion.Header>
                      <Accordion.Body className="text-body pt-1">
                        <div className="d-flex flex-column gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio6"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio6"
                            >
                              50% or more
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio5"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio5"
                            >
                              40% or more
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio4"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio4"
                            >
                              30% or more
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio3"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio3"
                            >
                              20% or more
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio2"
                            >
                              10% or more
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productdiscountRadio1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productdiscountRadio1"
                            >
                              Less than 10%
                            </label>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <span className="text-muted text-uppercase fs-12 fw-medium">
                          Rating
                        </span>{" "}
                        <span className="badge bg-success rounded-pill align-middle ms-1">
                          1
                        </span>
                      </Accordion.Header>
                      <Accordion.Body className="text-body">
                        <div className="d-flex flex-column gap-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productratingRadio4"
                              onChange={e => {
                                if (e.target.checked) {
                                  onChangeRating(4);
                                } else {
                                  onUncheckMark(4);
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productratingRadio4"
                            >
                              <span className="text-muted">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star"></i>
                              </span>{" "}
                              4 & Above
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productratingRadio3"
                              onChange={e => {
                                if (e.target.checked) {
                                  onChangeRating(3);
                                } else {
                                  onUncheckMark(3);
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productratingRadio3"
                            >
                              <span className="text-muted">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                              </span>{" "}
                              3 & Above
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productratingRadio2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productratingRadio2"
                              onChange={(e: any) => {
                                if (e.target.checked) {
                                  onChangeRating(2);
                                } else {
                                  onUncheckMark(2);
                                }
                              }}
                            >
                              <span className="text-muted">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                              </span>{" "}
                              2 & Above
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="productratingRadio1"
                              onChange={e => {
                                if (e.target.checked) {
                                  onChangeRating(1);
                                } else {
                                  onUncheckMark(1);
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="productratingRadio1"
                            >
                              <span className="text-muted">
                                <i className="mdi mdi-star text-warning"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                                <i className="mdi mdi-star"></i>
                              </span>{" "}
                              1
                            </label>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Card>
            </Col>

            <Col xl={9} lg={8}>
              <div>
                <Card>
                  <Card.Header className="border-0">
                    <Row className=" align-items-center">
                      <Col>
                        <Nav
                          className="nav-tabs-custom card-header-tabs border-bottom-0"
                          role="tablist"
                        >
                          <Nav.Item>
                            <Nav.Link
                              className="fw-semibold"
                              onClick={() => {
                                toggleTab("1", "all");
                              }}
                              href="#"
                              eventKey="all"
                            >
                              All{" "}
                              <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                12
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-semibold"
                              onClick={() => {
                                toggleTab("2", "published");
                              }}
                              eventKey="published"
                              href="#"
                            >
                              Published{" "}
                              <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                5
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="fw-semibold"
                              onClick={() => {
                                toggleTab("3", "draft");
                              }}
                              href="#"
                              eventKey="draft"
                            >
                              Draft
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <div className="col-auto">
                        <div id="selection-element">
                          <div className="my-n1 d-flex align-items-center text-muted">
                            Select{" "}
                            <div
                              id="select-content"
                              className="text-body fw-semibold px-1"
                            >{dele}</div>{" "}
                            Result{" "}
                            <button
                              type="button"
                              className="btn btn-link link-danger p-0 ms-3"
                              onClick={() => setDeleteModalMulti(true)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </Card.Header>
                  <div className="card-body pt-0">
                    {productList && productList.length > 0 ? (
                      <TableContainer
                        columns={columns}
                        data={(productList || [])}
                        isGlobalFilter={true}
                        customPageSize={10}
                        divClass="table-responsive mb-1"
                        tableClass="mb-0 align-middle table-borderless"
                        theadClass="table-light text-muted"
                        isProductsFilter={true}
                        SearchPlaceholder='Search Products...'
                      />
                    ) : (
                      <div className="py-4 text-center">
                        <div>
                          <i className="ri-search-line display-5 text-success"></i>
                        </div>

                        <div className="mt-4">
                          <h5>Sorry! No Result Found</h5>
                        </div>
                      </div>
                    )}
                  </div>


                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment >
  );
};
EcommerceProducts.layout = (page: any) => <Layout children={page} />
export default EcommerceProducts;
