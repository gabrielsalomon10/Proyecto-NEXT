import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { size } from 'lodash';
import { Loader } from 'semantic-ui-react';

import BasicLayout from '../../layouts/BasicLayout/BasicLayout';
import ListProps from '../../components/ListProps/ListProps';
import { getPropsTiposApi, getTotalPropsTiposApi } from '../../api/prop';
import Pagination from '../../components/Pagination/Pagination';


const limitPerPage = 10;

export default function Tipos() {

    const { query } = useRouter();

    const [ props, setProps ] = useState( null );

    const [ totalProps , settotalProps ] = useState( null );

    const getStartItem = () => {

        const currentPages = parseInt( query.page );
        if( !query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;

    }

    useEffect(() => {
   
        ( async () => {
            if( query.tipo ) {
                const response = await getPropsTiposApi( query.tipo, limitPerPage, getStartItem() );
                setProps( response );
            }
        })();

    }, [ query ]);


    useEffect(() => {
        
       ( async () => {
           const response = await getTotalPropsTiposApi( query.tipo );  
           settotalProps( response );
       })();

    }, [ query ]);

    return (
        <BasicLayout className="tipo">
            { !props && <Loader active>Cargando propiedades</Loader> }
            { props && size( props ) === 0 && (
                <div>
                    <h3>No hay propiedades</h3>
                </div>
            )}
            { size( props ) > 0 && <ListProps propiedades={ props } /> }
            {
                totalProps ? <Pagination totalProps={ totalProps } page={ query.page ? parseInt( query.page ) : 1 } limitPerPage={ limitPerPage } /> : null 
            }
        </BasicLayout>
    )
}

