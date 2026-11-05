import React from "react";
import { Carousel, Image} from "react-bootstrap";

// Carousel images
import img7 from "../../../../../images/small/img-7.jpg";
import img8 from "../../../../../images/small/img-8.jpg";
import img9 from "../../../../../images/small/img-9.jpg";

const DisableTouch = () => {
    return (
        <React.Fragment>
           <Carousel indicators={false}>
            <Carousel.Item>
                <Image
                    src={img9}
                    className="d-block w-100"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img8}
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={img7}
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
        </React.Fragment>
    );
};

export default DisableTouch;
