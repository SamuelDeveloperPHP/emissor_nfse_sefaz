import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Table,
} from "react-bootstrap";

import Flatpickr from "react-flatpickr";

import BreadCrumb from "../../Components/Common/BreadCrumb";
import Select from "react-select";

import logoDark from "../../../images/logo-dark.png";
import logoLight from "../../../images/logo-light.png";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

//redux
import { useDispatch } from "react-redux";
import { onAddNewInvoice } from "../../slices/thunk";
import { Head, Link } from "@inertiajs/react";
import { invoiceTable } from "../../common/data";
import Layout from "../../Layouts";

const InvoiceCreate = () => {
  const dispatch :any= useDispatch();
  // const history = useNavigate();

  const [ispaymentDetails, setispaymentDetails] = useState<any>(null);
  const [isCurrency, setisCurrency] = useState<any>("$");

  function handleispaymentDetails(ispaymentDetails:any) {
    setispaymentDetails(ispaymentDetails);
  }

  function handleisCurrency(isCurrency:any) {
    setisCurrency(isCurrency);
  }

  const paymentdetails = [
    {
      options: [
        { label: "Payment Method", value: "Payment Method" },
        { label: "Mastercard", value: "Mastercard" },
        { label: "Credit Card", value: "Credit Card" },
        { label: "Visa", value: "Visa" },
        { label: "Paypal", value: "Paypal" },
      ],
    },
  ];

  const allstatus = [
    {
      options: [
        { label: "Select Payment Status", value: "Select Payment Status" },
        { label: "Paid", value: "Paid" },
        { label: "Unpaid", value: "Unpaid" },
        { label: "Refund", value: "Refund" },
      ],
    },
  ];

  const allcurrency = [
    {
      options: [
        { label: "$", value: "($)" },
        { label: "£", value: "(£)" },
        { label: "₹", value: "(₹)" },
        { label: "€", value: "(€)" },
      ],
    },
  ];

  const [count, setCount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [dis, setDis] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);

  
  useEffect(() => {
    let tax = (0.125 * rate * count);
    let dis = (0.15 * rate * count);

    // if ((rate && count) && isNaN !== 0) {
      if (rate && count && !isNaN(rate) && !isNaN(count)) {
      setCharge(65);
    } else {
      setCharge(0);

    }
    setTax(tax);
    setDis(dis);
  }, [rate, count]);

  const dateFormat = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear()).toString());
  };

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e:any) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };


  const validation :any= useFormik({
    enableReinitialize: true,

    initialValues: {
      postalcode: "",
      registration: "",
      email: "",
      website: "",
      contact: "",
      invoiceId: "",
      date: "",
      name: "",
      status: "",
      country: "",
      amount: "",
      billing_address: "",
      billing_phone: "",
      billing_taxno: "",
      shipping_name: "",
      shipping_address: "",
      shipping_phone: "",
      shipping_taxno: "",
      product_name: "",
    },
    validationSchema: Yup.object({
      postalcode: Yup.string().required("This field is required"),
      registration: Yup.string().required("Please Enter a registration no"),
      email: Yup.string().required("Please Enter a Email"),
      website: Yup.string().required("Please Enter a website"),
      contact: Yup.string().required("Please Enter a contact number"),
      invoiceId: Yup.string().required("This field is required"),
      name: Yup.string().required("Please Enter a Full name"),
      // country: Yup.string().required("Please Enter a Country"),
      billing_address: Yup.string().required("Please Enter a Address"),
      billing_phone: Yup.string().required("Please Enter a Phone Number"),
      billing_taxno: Yup.string().required("Please Enter a tax Number"),
      shipping_name: Yup.string().required("Please Enter a Full name"),
      shipping_address: Yup.string().required("Please Enter a Address"),
      shipping_phone: Yup.string().required("Please Enter a Phone Number"),
      shipping_taxno: Yup.string().required("Please enter a tax Number"),
      product_name: Yup.string().required("Please Enter a product Name"),
    }),
    onSubmit: (values) => {
      const newInvoice = {
        _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        postalcode: values.postalcode,
        registration: values.registration,
        email: values.email,
        website: values.website,
        contact: values.contact,
        invoiceId: values.invoiceId,
        date: date,
        name: values.name,
        status: values.status,
        country: "United States of America",
        amount: Math.round(rate * count + tax + charge - dis),
        billing_address: values.billing_address,
        billing_phone: values.billing_phone,
        billing_taxno: values.billing_taxno,
        shipping_name: values.shipping_name,
        shipping_address: values.shipping_address,
        shipping_phone: values.shipping_phone,
        shipping_taxno: values.shipping_taxno,
        product_name: values.product_name,
      };
      dispatch(onAddNewInvoice(invoiceTable));
      // history("/apps-invoices-list");
      validation.resetForm();
    },
  });

  return (
    <React.Fragment>
    <Head title="Create Invoice | Velzon - React Admin & Dashboard Template" />
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Invoice" pageTitle="Invoices" />
        <Row className="justify-content-center">
          <Col xxl={9}>
            <Card>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                className="needs-validation"
                id="invoice_form"
              >
                <Card.Body className="border-bottom border-bottom-dashed p-4">
                  <Row>
                    <Col lg={4}>
                      <div className="profile-user mx-auto  mb-3">
                        <Form.Control
                          id="profile-img-file-input"
                          type="file"
                          className="profile-img-file-input"
                        />
                        <Form.Label htmlFor="profile-img-file-input" className="d-block">
                          <span
                            className="overflow-hidden border border-dashed d-flex align-items-center justify-content-center rounded"
                            style={{ height: "60px", width: "256px" }}
                          >
                            <img
                              src={logoDark}
                              className="card-logo card-logo-dark user-profile-image img-fluid"
                              alt="logo dark"
                            />
                            <img
                              src={logoLight}
                              className="card-logo card-logo-light user-profile-image img-fluid"
                              alt="logo light"
                            />
                          </span>
                        </Form.Label>
                      </div>
                      <div>
                        <div>
                          <Form.Label htmlFor="companyAddress">Address</Form.Label>
                        </div>
                        <div className="mb-2">
                          <textarea
                            className="form-control bg-light border-0"
                            id="companyAddress"
                            rows={3}
                            placeholder="Company Address"
                          />
                          <div className="invalid-feedback">
                            Please enter a address
                          </div>
                        </div>
                        <div>
                        <Form.Control
                            type="text"
                            className="form-control bg-light border-0"
                            id="companyaddpostalcode"
                            minLength={5}
                            maxLength={6}
                            name="postalcode"
                            value={validation.values.postalcode || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            placeholder="Enter Postal Code"
                          />
                          {validation.errors.postalcode && validation.touched.postalcode ? (
                            <Form.Control.Feedback type="invalid">{validation.errors.postalcode}</Form.Control.Feedback>
                          ) : null}
                          
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} className="ms-auto">
                      <div className="mb-2">
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          id="registrationNumber"
                          name="registration"
                          value={validation.values.registration || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          maxLength={12}
                          placeholder="Legal Registration No"
                        />
                        {validation.errors.registration && validation.touched.registration ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.registration}</Form.Control.Feedback>
                        ) : null}
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          type="email"
                          className="form-control bg-light border-0"
                          id="companyEmail"
                          name="email"
                          value={validation.values.email || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="Email Address"
                        />
                        {validation.errors.email && validation.touched.email ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          id="companyWebsite"
                          name="website"
                          value={validation.values.website || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="Website"
                        />
                        {validation.errors.website && validation.touched.website ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.website}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          data-plugin="cleave-phone"
                          id="compnayContactno"
                          name="contact"
                          value={validation.values.contact || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="Contact No"
                        />
                        {validation.errors.contact && validation.touched.contact ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.contact}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-4">
                  <Row className="g-3">
                    <Col lg={3} sm={6}>
                      <Form.Label htmlFor="invoicenoInput">Invoice No</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control bg-light border-0"
                        id="invoicenoInput"
                        name="invoiceId"
                        value={validation.values.invoiceId || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        placeholder="#VL67485555"
                      />
                      {validation.errors.invoiceId && validation.touched.invoiceId ? (
                        <Form.Control.Feedback type="invalid">{validation.errors.invoiceId}</Form.Control.Feedback>
                      ) : null}
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <Form.Label htmlFor="date-field">Date</Form.Label>
                        <Flatpickr
                          name="date"
                          id="date-field"
                          className="form-control"
                          placeholder="Select Date-time"
                          options={{
                            altInput: true,
                            altFormat: "d M, Y",
                            dateFormat: "d M, Y",
                          }}
                          onChange={(e:any) =>
                            dateformate(e)
                          }
                          value={validation.values.date || ""}
                        />
                        {validation.touched.date && validation.errors.date ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.date}</Form.Control.Feedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <Form.Label htmlFor="choices-payment-status">Payment Status</Form.Label>
                      <div className="input-light">

                        <select
                          name="status"
                          className="bg-light border-0 form-select"
                          id="choices-payment-status"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={
                            validation.values.status || ""
                          }
                        >
                          {allstatus.map((item, key) => (
                            <React.Fragment key={key}>
                              {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                            </React.Fragment>
                          ))}
                        </select>
                        {validation.touched.status &&
                          validation.errors.status ? (
                          <Form.Control.Feedback type="invalid">
                            {validation.errors.status}
                          </Form.Control.Feedback>
                        ) : null}
                      
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <Form.Label htmlFor="totalamountInput">Total Amount</Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          id="totalamountInput"
                          placeholder="$0.00"
                          readOnly
                          value={"$" + Math.round(rate * count + tax + charge - dis)}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-4 border-top border-top-dashed">
                  <Row>
                    <Col lg={4} sm={6}>
                      <div>
                        <Form.Label
                          htmlFor="billingName"
                          className="text-muted text-uppercase fw-semibold"
                        >
                          Billing Address
                        </Form.Label>
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          id="billingName"
                          name="name"
                          value={validation.values.name || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="Full Name"
                        />
                        {validation.errors.name && validation.touched.name ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="form-control bg-light border-0"
                          id="billingAddress"
                          name="billing_address"
                          value={validation.values.billing_address || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          rows={3}
                          placeholder="Address"
                        />
                        {validation.errors.billing_address && validation.touched.billing_address ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.billing_address}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          data-plugin="cleave-phone"
                          id="billingPhoneno"
                          name="billing_phone"
                          value={validation.values.billing_phone || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="(123)456-7890"
                        />
                        {validation.errors.billing_phone && validation.touched.billing_phone ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.billing_phone}</Form.Control.Feedback>
                        ) : null}
                       
                      </div>
                      <div className="mb-3">
                        <Form.Control
                          type="text"
                          className="form-control bg-light border-0"
                          id="billingTaxno"
                          name="billing_taxno"
                          value={validation.values.billing_taxno || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          placeholder="Tax Number"
                        />
                        {validation.errors.billing_taxno && validation.touched.billing_taxno ? (
                          <Form.Control.Feedback type="invalid">{validation.errors.billing_taxno}</Form.Control.Feedback>
                        ) : null}
                        
                      </div>
                      <div className="form-check">
                        <Form.Check.Input
                          type="checkbox"
                          className="form-check-input"
                          id="same"
                          name="same"
                        />
                        <Form.Check.Label className="form-check-label" htmlFor="same">
                          Will your Billing and Shipping address same?
                        </Form.Check.Label>
                      </div>
                    </Col>
                    <Col sm={6} className="ms-auto">
                      <Row>
                        <Col lg={8}>
                          <div>
                            <Form.Label
                              htmlFor="shippingName"
                              className="text-muted text-uppercase fw-semibold"
                            >
                              Shipping Address
                            </Form.Label>
                          </div>
                          <div className="mb-2">
                            <Form.Control
                              type="text"
                              className="form-control bg-light border-0"
                              id="shippingName"
                              name="shipping_name"
                              value={validation.values.shipping_name || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              placeholder="Full Name"
                            />
                            {validation.errors.shipping_name && validation.touched.shipping_name ? (
                              <Form.Control.Feedback type="invalid">{validation.errors.shipping_name}</Form.Control.Feedback>
                            ) : null}
                            
                          </div>
                          <div className="mb-2">
                            <textarea
                              className="form-control bg-light border-0"
                              id="shippingAddress"
                              rows={3}
                              name="shipping_address"
                              value={validation.values.shipping_address || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              placeholder="Address"
                            />
                            {validation.errors.shipping_address && validation.touched.shipping_address ? (
                              <Form.Control.Feedback type="invalid">{validation.errors.shipping_address}</Form.Control.Feedback>
                            ) : null}
                            
                          </div>
                          <div className="mb-2">
                            <Form.Control
                              type="text"
                              className="form-control bg-light border-0"
                              data-plugin="cleave-phone"
                              id="shippingPhoneno"
                              name="shipping_phone"
                              value={validation.values.shipping_phone || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              placeholder="(123)456-7890"
                            />
                            {validation.errors.shipping_phone && validation.touched.shipping_phone ? (
                              <Form.Control.Feedback type="invalid">{validation.errors.shipping_phone}</Form.Control.Feedback>
                            ) : null}
                            
                          </div>
                          <div>
                            <Form.Control
                              type="text"
                              className="form-control bg-light border-0"
                              id="shippingTaxno"
                              placeholder="Tax Number"
                              name="shipping_taxno"
                              value={validation.values.shipping_taxno || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                            />
                            {validation.errors.shipping_taxno && validation.touched.shipping_taxno ? (
                              <Form.Control.Feedback type="invalid">{validation.errors.shipping_taxno}</Form.Control.Feedback>
                            ) : null}
                            
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Body className="p-4">
                  <div className="table-responsive">
                    <Table className="invoice-table table-borderless table-nowrap mb-0">
                      <thead className="align-middle">
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            #
                          </th>
                          <th scope="col">Product Details</th>
                          <th scope="col" style={{ width: "120px" }}>
                            <div className="d-flex currency-select input-light align-items-center">
                              Rate
                              <Select
                                defaultValue={isCurrency}
                                onChange={(isCurrency:any) => {
                                  handleisCurrency(isCurrency);
                                }}
                                options={allcurrency}
                                id="choices-payment-currency"
                                className="form-selectborder-0 bg-light"
                              />
                            </div>
                          </th>
                          <th scope="col" style={{ width: "120px" }}>
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="text-end"
                            style={{ width: "150px" }}
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="text-end"
                            style={{ width: "105px" }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody id="newlink">
                        <tr id="1" className="product">
                          <th scope="row" className="product-id">
                            1
                          </th>
                          <td className="text-start">
                            <div className="mb-2">
                              <Form.Control
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                                value={validation.values.product_name || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                              />
                              {validation.errors.product_name && validation.touched.product_name ? (
                                <Form.Control.Feedback type="invalid">{validation.errors.product_name}</Form.Control.Feedback>
                              ) : null}
                              
                            </div>
                            <textarea
                              className="form-control bg-light border-0"
                              id="productDetails-1"
                              rows={2}
                              placeholder="Product Details"
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              className="form-control product-price bg-light border-0"
                              placeholder="0.00"
                              id="productRate-1" step="0.01"
                              onChange={(e:any) => {
                                setRate(e.target.value);
                              }}
                            />
                            <div className="invalid-feedback">
                              Please enter a rate
                            </div>
                          </td>
                          <td>


                            <div className="input-step">
                              <button type="button" className="minus" onClick={() => setCount(count > 0 ? (count - 1) : count)}>
                                –
                              </button>
                              <Form.Control
                                type="number"
                                className="product-quantity"
                                id="product-qty-1"
                                value={count}
                                readOnly
                              />
                              <button type="button" className="plus" onClick={() => setCount(count + 1)}>
                                +
                              </button>
                            </div>


                          </td>
                          <td className="text-end">
                            <div>
                              <Form.Control
                                type="text"
                                className="form-control bg-light border-0 product-line-price"
                                id="productPrice-1"
                                placeholder="$0.00"
                                value={"$" + rate * count}
                                readOnly
                              />
                            </div>
                          </td>
                          <td className="product-removal">
                            <Link href="#" className="btn btn-success">
                              Delete
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr id="newForm" style={{ display: "none" }}><td className="d-none" colSpan={5}><p>Add New Form</p></td></tr>
                        <tr>
                          <td colSpan={5}>
                            <Link
                              href="#"
                              className="btn btn-soft-secondary fw-medium"
                              id="add-item"
                            >
                              <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                              Add Item
                            </Link>
                          </td>
                        </tr>
                        <tr className="border-top border-top-dashed mt-2">
                          <td colSpan={3}></td>
                          <td colSpan={2} className="p-0">
                            <Table className="table-borderless table-sm table-nowrap align-middle mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">Sub Total</th>
                                  <td style={{ width: "150px" }}>
                                    <Form.Control
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-subtotal"
                                      placeholder="$0.00"
                                      readOnly
                                      value={"$" + rate * count}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Estimated Tax (12.5%)</th>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-tax"
                                      placeholder="$0.00"
                                      readOnly
                                      value={"$" + tax}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">
                                    Discount{" "}
                                    <small className="text-muted">
                                      (VELZON15)
                                    </small>
                                  </th>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-discount"
                                      placeholder="$0.00"
                                      readOnly
                                      value={"$" + dis}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Shipping Charge</th>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-shipping"
                                      placeholder="$0.00"
                                      readOnly
                                      value={"$" + charge}
                                    />
                                  </td>
                                </tr>
                                <tr className="border-top border-top-dashed">
                                  <th scope="row">Total Amount</th>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="cart-total"
                                      placeholder="$0.00"
                                      readOnly
                                      value={"$" + Math.round(rate * count + tax + charge - dis)}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-3">
                    <Col lg={4}>
                      <div className="mb-2">
                        <Form.Label
                          htmlFor="choices-payment-type"
                          className="form-label text-muted text-uppercase fw-semibold"
                        >
                          Payment Details
                        </Form.Label>
                        <div className="input-light">
                          <Select
                            value={ispaymentDetails}
                            onChange={(ispaymentDetails:any) => {
                              handleispaymentDetails(ispaymentDetails);
                            }}
                            options={paymentdetails}
                            name="choices-single-default"
                            id="idStatus"
                            className="bg-light border-0"
                          ></Select>
                        </div>
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          className="form-control bg-light border-0"
                          type="text"
                          id="cardholderName"
                          placeholder="Card Holder Name"
                        />
                      </div>
                      <div className="mb-2">
                        <Form.Control
                          className="form-control bg-light border-0"
                          type="text"
                          id="cardNumber"
                          placeholder="xxxx xxxx xxxx xxxx"
                        />
                      </div>
                      <div>
                        <Form.Control
                          className="form-control  bg-light border-0"
                          type="text"
                          id="amountTotalPay"
                          placeholder="$0.00"
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Form.Label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label text-muted text-uppercase fw-semibold"
                    >
                      NOTES
                    </Form.Label>
                    <textarea
                      className="form-control alert alert-info"
                      id="exampleFormControlTextarea1"
                      placeholder="Notes"
                      rows={2}
                      defaultValue="All accounts are to be paid within 7 days from receipt of
                      invoice. To be paid by cheque or credit card or direct
                      payment online. If account is not paid within 7 days the
                      credits details supplied as confirmation of work
                      undertaken will be charged the agreed quoted fee noted
                      above."
                    />
                  </div>
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button type="submit" className="btn btn-success">
                      <i className="ri-printer-line align-bottom me-1"></i> Save
                    </button>
                    <Link href="#" className="btn btn-primary">
                      <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                      Download Invoice
                    </Link>
                    <Link href="#" className="btn btn-secondary">
                      <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                      Send Invoice
                    </Link>
                  </div>
                </Card.Body>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </React.Fragment>
  );
};
InvoiceCreate.layout = (page: any) => <Layout children={page} />
export default InvoiceCreate;
