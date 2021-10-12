import React from 'react';
import { BASE_PATH } from '../../utils/constants';
import { map } from 'lodash';
import { Image, Grid } from 'semantic-ui-react';
import Link from 'next/Link';
import useWindowSize from '../../hooks/useWindowSize';
import { breackpointUpSm, breackpointUpMd, breackpointUpLg } from '../../utils/breackpoints';


export default function ListProps( props ) {

    const { propiedades } = props;

    const { width } = useWindowSize();

    const getColumnsRender = () => {

        switch ( true ) {
            case width > breackpointUpLg:
                return 4;
                
            case width > breackpointUpMd:
                return 3;

            case width > breackpointUpSm:
                return 2;
        
            default:
                return 1;
        }

    }

    return (
        <div className="list-props">
            <Grid>
                <Grid.Row columns={ getColumnsRender() }>
                    { map( propiedades, ( prop ) => (
                        <Prop prop={ prop } key={ prop.id } />
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    )
}

function Prop( props ) {

    const { prop } = props;

    return(
        <Grid.Column className="list-props__prop">
            <Link href={`/${ prop.url }`}>
                <a>
                    <div className="list-props__prop-poster">
                        <Image src={`${ BASE_PATH }${ prop.poster.url }`} alt={ prop.title } />
                        <div className="list-props__prop-poster-info">
                        {
                            prop.rebaja ? (
                                <span className="rebaja">-{ prop.rebaja }</span>
                                ) : (
                                <span />
                                )
                        }
                        <span className="price">U$SD{ prop.valor }</span>
                        </div>
                    </div>
                    <h2> { prop.title } </h2>
                </a>
            </Link>
        </Grid.Column>
    )
}