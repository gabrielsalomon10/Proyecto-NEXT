import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import { useRouter } from 'next/router';
import { getPropByUrlApi } from '../api/prop';
import HeaderProp from '../components/Prop/HeaderProp/HeaderProp';
import TabsProp from '../components/Prop/TabsProp/TabsProp';


export default function Prop() {

    const [ prop, setProp ] = useState( null );

    const { query } = useRouter();

    useEffect( () => {

        ( async () => {
            const response = await getPropByUrlApi( query.prop );
            setProp( response );
        })();

    }, [ query ]);

    if( !prop ) return null;

    return (
            <BasicLayout className="prop">
                <HeaderProp prop={ prop } />
                <TabsProp prop={ prop } />
            </BasicLayout>
    )
}
