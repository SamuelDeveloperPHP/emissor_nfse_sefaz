import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Masonry from 'react-masonry-css';

import { gallery } from '../../../common/data';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../../Layouts';

const Gallery = () => {

  const [displayCategory, setCategory] = useState<any>("All");

  const breakpointColumnsObj = {
    default: 4,
    900: 3,
    750: 2,
    500: 1,
  };

  return (
    <React.Fragment>
      <Head title='Gallery | Velzon - React Admin & Dashboard Template'/>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <div className="">
                <Card.Body>
                  <Row>
                    <Col lg={12}>
                      <div className="text-center">
                        <ul className="list-inline categories-filter animation-nav" id="filter">
                          <li className="list-inline-item">
                            <Button variant='link' href="#" onClick={() => setCategory("All")} className={displayCategory === "All" ? "categories active" : "categories"} data-filter="*">All</Button></li>
                          <li className="list-inline-item"><Button variant='link' href="#" onClick={() => setCategory("Project")} className={displayCategory === "Project" ? "categories active" : "categories"} data-filter=".project">Project</Button></li>
                          <li className="list-inline-item"><Button variant='link' href="#" onClick={() => setCategory("Designing")} className={displayCategory === "Designing" ? "categories active" : "categories"} data-filter=".designing">Designing</Button></li>
                          <li className="list-inline-item"><Button variant='link' href="#" onClick={() => setCategory("Photography")} className={displayCategory === "Photography" ? "categories active" : "categories"} data-filter=".photography">Photography</Button></li>
                          <li className="list-inline-item"><Button variant='link' href="#" onClick={() => setCategory("Development")} className={displayCategory === "Development" ? "categories active" : "categories"} data-filter=".development">Development</Button></li>
                        </ul>
                      </div>

                      <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="row gallery-wrapper"
                        columnClassName="my-masonry-grid_column ps-0"
                      >
                        {(gallery.filter(({ category }) => displayCategory === category || displayCategory === "All")).map(({ img, title, auther, likes, comments }, key) => (
                          <div className="element-item project designing development" key={key}>
                            <Card className="gallery-box">
                              <div className="gallery-container">
                                <Link className="image-popup" href="/" title="">
                                  <img className="gallery-img img-fluid mx-auto" src={img} alt="" />
                                  <div className="gallery-overlay">
                                    <h5 className="overlay-caption">{title}</h5>
                                  </div>
                                </Link>
                              </div>

                              <div className="box-content">
                                <div className="d-flex align-items-center mt-1">
                                  <div className="flex-grow-1 text-muted">by <Link href="#" className="text-body text-truncate">{auther}</Link></div>
                                  <div className="flex-shrink-0">
                                    <div className="d-flex gap-3">
                                      <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                        <i className="ri-thumb-up-fill text-muted align-bottom me-1"></i> {likes}
                                      </button>
                                      <button type="button" className="btn btn-sm fs-12 btn-link text-body text-decoration-none px-0">
                                        <i className="ri-question-answer-fill text-muted align-bottom me-1"></i> {comments}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}

                      </Masonry>
                      <div className="text-center my-2">
                        <Link href="#" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load More </Link>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </div>
            </Col>
          </Row>


        </Container>

      </div>
    </React.Fragment>
  );
};

Gallery.layout = (page:any) => <Layout children={page} />

export default Gallery;