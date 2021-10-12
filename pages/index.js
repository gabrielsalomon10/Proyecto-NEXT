import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { getLastPropsApi } from '../api/prop';
import { size } from 'lodash';
import ListProps from '../components/ListProps/ListProps';


export default function Home() {

  const [ propiedades, setPropiedades ] = useState( null );
  console.log( propiedades );

  useEffect(() => {
    
    ( async () => {
      const response = await getLastPropsApi( 10 );

      if( size( response ) > 0 ) setPropiedades( response );
      else setPropiedades([]);

    })();

  }, []);

  return (
    <BasicLayout className="home">
      { !propiedades && <Loader active>Cargando propiedades</Loader> }
      { propiedades && size( propiedades ) === 0 && (
        <div>
          <h3>No hay propiedades</h3>
        </div>
      )}
      { size( propiedades ) > 0 && <ListProps propiedades={ propiedades } />}
    </BasicLayout>
  );
}