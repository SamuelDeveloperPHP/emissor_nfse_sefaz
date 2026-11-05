import React from "react";
import { Carousel, Image } from "react-bootstrap";

// Carousel images
import img1 from "../../../../../images/small/img-4.jpg";
import img2 from "../../../../../images/small/img-5.jpg";
import img3 from "../../../../../images/small/img-6.jpg";

const SlideDark = () => {
  return (
    <React.Fragment>
     <Carousel data-bs-theme="dark" fade={true} indicators={false}>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />

                <Carousel.Caption className="d-none d-md-block">
                    <h3>Drawing a sketch</h3>
                    <p>Too much or too little spacing, as in the example below, can make things unpleasant for the reader.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Blue clock on a pastel background</h3>
                    <p>In some designs, you might adjust your tracking to create a certain artistic effect asked them what graphic design tips they live.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h5>Working at a coffee shop</h5>
                    <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </React.Fragment>
  );
};

export default SlideDark;
