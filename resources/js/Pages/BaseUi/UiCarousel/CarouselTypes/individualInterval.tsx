import React from "react";
import { Carousel, Image } from "react-bootstrap";

// Carousel images
import img10 from "../../../../../images/small/img-10.jpg";
import img11 from "../../../../../images/small/img-11.jpg";
import img12 from "../../../../../images/small/img-12.jpg";

const IndividualInterval = () => {
  return (
    <React.Fragment>
       <Carousel indicators={false}>
            <Carousel.Item interval={1000}>
                <Image
                    className="d-block w-100"
                    src={img10}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <Image
                    className="d-block w-100"
                    src={img11}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img12}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </React.Fragment>
  );
};

export default IndividualInterval;
