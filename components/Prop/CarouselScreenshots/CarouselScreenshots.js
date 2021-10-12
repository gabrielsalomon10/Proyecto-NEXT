import React, { useState } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import Slider from 'react-slick';
import { map } from 'lodash';
import { BASE_PATH } from '../../../utils/constants';

const settings = {
    className: 'carousel-screenshots',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    swipeToSlider: true
}


export default function CarouselScreenshots( props ) {

    const { title, screenshot } = props;

    const [ showModal, setShowModal ] = useState( false );
    const [ urlImage, setUrlImage ] = useState( null );

    const openImage = ( url ) => {

        setUrlImage( url );
        setShowModal( true );

    }

    return (
        <>
        <Slider { ...settings } >
            { map( screenshot, ( screen ) => (
                <Image 
                    key={ screen.id }
                    src={`${ BASE_PATH }${ screen.url }`}
                    alt={ screen.name }
                    onClick={ () => openImage(`${ BASE_PATH }${ screen.url }`) }
                />
            ))}
        </Slider>
        <Modal open={ showModal } onClose={ () => setShowModal(false) } size="large" >
            <Image src={ urlImage } alt={ title } />
        </Modal>
        </>
    )
}
