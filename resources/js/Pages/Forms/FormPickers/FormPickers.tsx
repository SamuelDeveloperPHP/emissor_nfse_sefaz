import React, { useState } from 'react';
import { Card, Container, Form, Row, Col, } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import ColorPicker from "@vtaits/react-color-picker";
import { SketchPicker } from "react-color";

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { Head } from '@inertiajs/react';
import Layout from '../../../Layouts';
import 'flatpickr/dist/themes/material_green.css';

const FormPickers = () => {
  const [color, setcolor] = useState<any>("rgba(3, 142, 220, 1)");
  const [colorCust, setcolorCust] = useState<any>("rgba(95, 208, 243, 1)");
  const [colorRGBA, setcolorRGBA] = useState<any>("rgba(247, 204, 83, 1)");

  const [display_RGBA, setdisplay_RGBA] = useState<boolean>(false);
  const [display_Cust, setdisplay_Cust] = useState<boolean>(false);

  function handleRGBA() {
    setdisplay_RGBA(!display_RGBA);
  }
  function handleCust() {
    setdisplay_Cust(!display_Cust);
  }
  const onSwatchHover_RGBA = (color: any) => {
    const format =
      "rgba(" +
      color.rgb.r +
      "," +
      color.rgb.g +
      "," +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    setcolorRGBA(format);
  };

  const onSwatchHover_Cust = (color: any) => {
    const format1 =
      "rgba(" +
      color.rgb.r +
      "," +
      color.rgb.g +
      "," +
      color.rgb.b +
      "," +
      color.rgb.a +
      ")";
    setcolorCust(format1);
  };

  const [simple_color, setsimple_color] = useState<any>(0);

  const onDrag = (c1: any) => {
    setcolor(c1);
  };


  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 365);


  return (
    <React.Fragment>
      <Head title='Pickers | Velzon - React Admin & Dashboard Template' />
      <div className="page-content">

        <Container fluid>
          <BreadCrumb title="Pickers" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card >
                <Card.Header >
                  <h4 className="card-title mb-0">Flatpickr - Datepicker</h4>
                </Card.Header>
                <Card.Body>
                  <Form >
                    <Row className="gy-3">
                      <Col lg={6}>
                        <div>
                          <Form.Label className="form-label mb-0">Basic</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              dateFormat: "d M, Y"
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <Form.Label className="form-label mb-0">DateTime</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              dateFormat: "Y-m-d H:i",
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row >
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Human-Friendly Dates</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d",
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">MinDate and MaxDate</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              minDate: today,
                              maxDate: maxDate,
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} >
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Default Date</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              dateFormat: "Y-m-d",
                              defaultDate: ["2022-01-20"]
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6} >
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Disabling Dates</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              disable: ["2022-01-30", "2022-02-21", "2022-03-08", new Date(2025, 4, 9)],
                              dateFormat: "Y-m-d",
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Selecting Multiple Dates</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              mode: "multiple",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Range</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              mode: "range",
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} >
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Inline</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              inline: true,
                              dateFormat: "Y-m-d"
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Week Numbers</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              weekNumbers: true,
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d",
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Flatpickr - Timepicker</h4>
                </Card.Header>
                <Card.Body>
                  <Form >
                    <Row className="gy-3">
                      <Col lg={6}>
                        <div>
                          <Form.Label className="form-label mb-0">Timepicker</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: "H:i",
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <Form.Label className="form-label mb-0">24-hour Time Picker</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: "H:i",
                              time_24hr: true
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Time Picker w/ Limits</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: "H:i",
                              minTime: "16:00",
                              maxTime: "22:30",
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Preloading Time</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              dateFormat: "H:i",
                              defaultDate: "13:45"
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <div className="mt-3">
                          <Form.Label className="form-label mb-0">Inline</Form.Label>
                          <Flatpickr
                            className="form-control"
                            options={{
                              enableTime: true,
                              noCalendar: true,
                              inline: true,
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

         
        </Container>
      </div>
    </React.Fragment>
  );
};
FormPickers.layout = (page:any) => <Layout children={page} />
export default FormPickers;