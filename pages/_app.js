import React, { useMemo, useEffect, useState } from 'react';
import '../scss/global.scss';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer } from 'react-toastify';
import { setToken, getToken, removeToken } from '../api/token'
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function MyApp({ Component, pageProps }) {

  const [ auth, setAuth ] = useState( undefined );

  const [ reloadUser, setReloadUser ] = useState( false );

  const router = useRouter();

  useEffect( () => {
    
    const token = getToken();

    if( token ) {

      setAuth({
        token,
        idUser: jwtDecode( token ).id,

      });
    } else {

      setAuth( null );

    }

    setReloadUser( false );

  }, [ reloadUser ] );

  const login= ( token ) => {

    setToken( token );
    setAuth({
      token,
      idUser: jwtDecode( token ).id
    });

  }

  const logout = () => {

    if( auth ) {
      removeToken();
      setAuth( null );
      router.push('/');
    }

  }

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [ auth ]
  );

  if( auth === undefined ) return null;

  return (
    <AuthContext.Provider value={ authData }>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right"
        autoClose={ 5000 }
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss={ false }
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}