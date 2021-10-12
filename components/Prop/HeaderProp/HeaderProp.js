import React, { useState, useEffect } from 'react';
import { BASE_PATH } from '../../../utils/constants';
import { Grid, Image, Icon, Button } from 'semantic-ui-react';
import { size } from 'lodash';
import useAuth from '../../../hooks/useAuth';
import { isFavoriteApi, addFavoriteApi, removeFavoriteApi } from '../../../api/favorito';
import classNames from 'classnames';


export default function HeaderProp( props ) {

    const { prop } = props;

    const { poster, title } = prop;

    return (
        <Grid className="header-prop">
            <Grid.Column mobile={ 16 } tablet={ 6 } computer={ 4 }>
                <Image src={`${ BASE_PATH }${ poster.url }`} alt={ title } fluid />
            </Grid.Column>
            <Grid.Column mobile={ 16 } tablet={ 10 } computer={ 10 }>
                <Info prop={ prop } />
            </Grid.Column>
        </Grid>
    );
}


function Info( props ) {

    const { prop } = props;
    const { title, descripcion, valor } = prop;
    const [ isFavorite, setIsFavorite ] = useState( false );
    const [ reloadFavorite, setReloadFavorite ] = useState( false );
    const { auth, logout } = useAuth();

    useEffect(() => {
        
        ( async () => {
            const response = await isFavoriteApi( auth.idUser, prop.id, logout );
            if( size( response ) > 0 ) setIsFavorite( true )
            else setIsFavorite( false );
        })();
        setReloadFavorite( false )

    }, [ prop, reloadFavorite ]);


    const addFavorite = async() => {
        if( auth ) {
            await addFavoriteApi( auth.idUser, prop.id, logout );
            setReloadFavorite( true );
        } console.log('Agregado favorito')
        console.log(auth.idUser)
        console.log(prop.id)
    };

    const removeFavorite = async() => {
        if( auth ) {
            await removeFavoriteApi( auth.idUser, prop.id, logout );
            setReloadFavorite( true );
        }
    };

    return(
        <>
        <div className="header-prop__title">
            { title }
            <Icon 
                name={ isFavorite ? 'heart' : 'heart outline'}
                className={classNames({
                    like: isFavorite
                })}
                link
                onClick={ isFavorite ? removeFavorite : addFavorite }
            />
        </div>
        <div className="header-prop__sumary"
            dangerouslySetInnerHTML={{ __html: descripcion }}
        />
        <div className="header-prop__buy">
            <div className="header-prop__buy-price">
                <p>Valor del inmueble: { valor } </p>
            </div>
        </div>
        </>
    )

}