import React, { useState, useEffect } from 'react';
import { Container, Menu, Grid, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { map } from 'lodash';
import BasicModal from '../../Modal/BasicModal';
import Auth from '../../Auth';
import useAuth from '../../../hooks/useAuth';
import { getMeApi } from '../../../api/user';
import { getTipoApi } from '../../../api/tipo';
 

export default function MenuWeb() {

    const [ tipos, setTipos ] = useState([]);

    const [ showModal, setShowModal ] = useState( false );

    const [ titleModal, setTitleModal ] = useState('Iniciar sesión');

    const [ user, setUser ] = useState( undefined );

    const { logout, auth } = useAuth();

    useEffect(() => {
        ( async () => {
            const response = await getMeApi( logout );
            setUser( response );
        })();
    }, [ auth ]);

    useEffect(() => {
        ( async () => {
            const response = await getTipoApi();
            setTipos( response || [] );
        })();
    }, []);

    const onShowModal = () => setShowModal( true );

    const onCloseModal = () => setShowModal( false );    

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={ 6 }>
                        <MenuPlatforms tipos={ tipos } />
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={ 10 }>      
                    { user !== undefined && (
                        <MenuOptions 
                            onShowModal={ onShowModal } 
                            user={ user } 
                            logout={ logout } 
                        /> 
                    )}
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal 
                show={ showModal } 
                setShow={ setShowModal } 
                title={ titleModal }
                size="small"
            >
                <Auth onCloseModal={ onCloseModal } setTitleModal={ setTitleModal } />
            </BasicModal>

        </div>
    )
}

function MenuPlatforms( props ) {

    const { tipos } = props;

    return (
        <Menu>
            { map ( tipos, ( tipo ) => (
                <Link href={`/tipos/${ tipo.url }`} key={ tipo._id }>
                    <Menu.Item as="a" name={ platform.url }>
                        { tipos.title }
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    )
}

function MenuOptions( props ) {

    const { onShowModal, user, logout } = props;

    return (
        <Menu>
            { user ? (
            <>
                <Link href="/favoritos">
                    <Menu.Item as="a">
                        <Icon name="heart outline" />
                        Favoritos
                    </Menu.Item>
                </Link>
                <Link href="/cuenta">
                    <Menu.Item as="a">
                        <Icon name="user outline" />
                        { user.name } { user.lastname }
                    </Menu.Item>
                </Link>    
                <Menu.Item className="m-0" onClick={ logout }>
                    <Icon name="power off" />
                </Menu.Item>
            </>
            ) : (
            <Menu.Item onClick={ onShowModal }>
                <Icon name="user outline" />
                Mi cuenta
            </Menu.Item>
            )}    
        </Menu>
    )
}