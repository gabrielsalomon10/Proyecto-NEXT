import { BASE_PATH } from '../utils/constants';


export async function getLastPropsApi( limit ) {

    try {

        const limitItems = `_limit=${ limit }`;
        const sortItem = '_sort=createdAt:desc';

        const url = `${ BASE_PATH }/propiedads?${ limitItems }&${ sortItem }`;

        const response = await fetch( url );

        const result = await response.json();
        return result;
        
    } catch (error) {
        
        console.log( error );
        return null;
    }

}


export async function getPropsTiposApi( tipo, limit, start ) {

    try {

        const limitItems = `_limit=${ limit }`;
        const sortItems = `_sort=createdAt:desc`;
        const startItems = `_start=${ start }`;

        const url = `${ BASE_PATH }/propiedads?tipo.url=${ tipo }&${ limitItems }&${ sortItems }&${ startItems }`;

        const response = await fetch( url );

        const result = await response.json();
        return result;
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}


export async function getTotalPropsTiposApi( tipo ) {

    try {

        const url = `${ BASE_PATH }/propiedads/count?tipo.url=${ tipo }`;

        const response = await fetch( url );

        const result = await response.json();
        return result;
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}


export async function getPropByUrlApi( path ) {

    try {

        const url = `${ BASE_PATH }/propiedads?url=${ path }`;

        const response = await fetch( url );

        const result = await response.json();
        return result[0];
        
    } catch (error) {

        console.log(error);
        return null;
        
    }

}