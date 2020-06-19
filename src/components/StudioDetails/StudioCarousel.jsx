import React, { Component} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from "prop-types";
import Button from "../reusableComponents/Button";

export class StudioCarousel extends Component  {
    constructor(props) {
        super(props);
    }

    closeModal() {
        this.props.onRequestClose();
    }
    render(){
        return(
            <>
                <Button
                    name="close"
                    type="button"
                    className="ch-btn-black w-100"
                    handleClick={() => this.closeModal()}
                    label={'CLOSE'}
                />
            <Carousel>
                {this.props.images.map((image, index) =>
                    <div key={index}>
                        <img src={image.photo_url}/>
                    </div>
                )}
            </Carousel>
            </>
        );
    }
};

StudioCarousel.propTypes = {
    images: PropTypes.array,
    onRequestClose: PropTypes.func,
}

