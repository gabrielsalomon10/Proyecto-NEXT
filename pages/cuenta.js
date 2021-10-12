import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import useAuth from '../hooks/useAuth';
import { getMeApi } from '../api/user';
import ChangeNameForm from '../components/Cuenta/ChangeNameForm/ChangeNameForm';
import ChangeEmailForm from '../components/Cuenta/ChangeEmailForm/ChangeEmailForm';
import ChangePasswordForm from '../components/Cuenta/ChangePasswordForm/ChangePasswordForm';


export default function cuenta() {

    const [ user, setUser ] = useState(undefined);

    const { auth, logout, setReloadUser } = useAuth();

    const router = useRouter();

    useEffect( () => {
        ( async () => {
            const response = await getMeApi( logout );
            setUser( response || null );
        })();
    }, [ auth ] );

    if( user === undefined ) return null;

    if( !auth && !user ) {
        router.replace('/');
        return null;
    }

    return (
        <BasicLayout className="account">
            <Configuration user={ user } logout={ logout } setReloadUser={ setReloadUser } />
        </BasicLayout>
    )
}

function Configuration( props ) {

    const { user, logout, setReloadUser } = props;

    return (
    <div className="account__configuration">
        <div className="title">Configuracion</div>
        <div className="data">
            <ChangeNameForm 
                user={ user } 
                logout={ logout } 
                setReloadUser={ setReloadUser }
            />
            <ChangeEmailForm user={ user } logout={ logout } setReloadUser={ setReloadUser } />
            <ChangePasswordForm user={ user } logout={ logout } />
        </div>
    </div>
    );
}