import React from 'react';
import CarouselScreenshots from '../CarouselScreenshots/CarouselScreenshots';
import moment from 'moment';
import 'moment/locale/es';


export default function InfoProp( props ) {

    const { prop } = props;

    return (
        <div className="info-prop">
            <CarouselScreenshots title={ prop.title } screenshot={ prop.screenshot } />
            <div className="info-prop__content">
                <div className="info-prop__content-date">
                    <h4>Publicado el:</h4>
                    <p> { moment( prop.lanzamiento ).format('LL') } </p>
                </div>
            </div>
        </div>
    )
}