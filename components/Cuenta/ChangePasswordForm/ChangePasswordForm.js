import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { updatePasswordApi } from '../../../api/user';


export default function ChangePasswordForm( props ) {

    const { user, logout } = props;

    const [ loading, setLoading ] = useState( false );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async( formData ) => {
            setLoading( true );
            const response = await updatePasswordApi( user.id, formData.password, logout );

            if( !response ) {
                toast.error('Error al actualizar la contraseña');
            } else {
                logout();
                toast.info('Su contraseña ha sido actualizada');
            }
            setLoading( false );
        }
    });

    return (
        <div className="change-password-form">
            <h4>Cambiar contraseña</h4>
            <Form onSubmit={ formik.handleSubmit }>
                <Form.Group widths="equal">
                    <Form.Input onChange={ formik.handleChange } value={ formik.values.password } error={ formik.errors.password } name="password" type="password" placeholder="Nueva contraseña" />
                    <Form.Input onChange={ formik.handleChange } value={ formik.values.repeatPassword } error={ formik.errors.repeatPassword } name="repeatPassword" type="password" placeholder="Confirmar nueva contraseña" />
                </Form.Group>
                <Button loading={ loading } className="submit">Actualizar</Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        password: '',
        repeatPassword: ''
    }
}

function validationSchema() {
    return {
        password: Yup.string().required( true ).oneOf([ Yup.ref('repeatPassword') ], true ),
        repeatPassword: Yup.string().required( true ).oneOf([ Yup.ref('password') ], true ),
    }
}