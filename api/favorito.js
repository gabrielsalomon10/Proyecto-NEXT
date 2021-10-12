import { BASE_PATH } from '../utils/constants';
import { authFetch } from '../utils/fetch';
import { size } from 'lodash';


export async function isFavoriteApi( idUser, idProp, logout ) {

    try {

        const url = `${ BASE_PATH }/favoritos?user=${ idUser }&propiedad=${ idProp }`;
        
        return await authFetch( url, null, logout );
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}


export async function addFavoriteApi( idUser, idProp, logout ) {

    try {

        const dataFound = await isFavoriteApi( idUser, idProp, logout );
        if( size( dataFound ) > 0 || !dataFound ) {

            return 'Esta propiedad ya esta en favoritos';

        } else {

            const url = `${ BASE_PATH }/favoritos`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: idUser, prop: idProp })
            };
            
            const result = await authFetch( url, params, logout );
            return result;

        }
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}


export async function removeFavoriteApi( idUser, idProp, logout ) {

    try {

        const dataFound = await isFavoriteApi( idUser, idProp, logout );

        if( size( dataFound ) > 0 ) {
            const url = `${ BASE_PATH }/favoritos/${ dataFound[0]?._id }`;
            const params = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const result = authFetch( url, params, logout );
            return result;

        }
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}