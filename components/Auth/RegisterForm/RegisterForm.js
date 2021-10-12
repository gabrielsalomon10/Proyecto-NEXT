import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import { toast } from 'react-toastify';


export default function RegisterForm( props ) {

    const { showLoginForm } = props;

    const [ loading, setLoading ] = useState( false );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object( validationSchema() ),
        onSubmit: async( formData ) => {
            setLoading( true );
            const response = await registerApi( formData );

            if( response?.jwt ) {

                toast.success('Registro correcto');
                showLoginForm();

            } else {

                toast.error('Error al registrar el usuario');

            }

            setLoading( false );
        }
    });

    return (
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <Form.Input
                name="name"
                type="text"
                placeholder="Nombre"
                onChange={ formik.handleChange }
                error={ formik.errors.name }
            />
            <Form.Input
                name="lastname"
                type="text"
                placeholder="Apellido"
                onChange={ formik.handleChange }
                error={ formik.errors.lastname }
            />
            <Form.Input
                name="email"
                type="text"
                placeholder="Correo electrónico"
                onChange={ formik.handleChange }
                error={ formik.errors.email }
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
                onChange={ formik.handleChange }
                error={ formik.errors.password }
            />
            <div className="actions">
                <Button type="button" basic onClick={ showLoginForm }>
                    Iniciar sesión
                </Button>
                <Button type="submit" className="submit" loading={ loading } >
                    Registrar
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        name: '',
        lastname: '',
        email: '',
        password: ''
    }
}

function validationSchema() {
    return {
        name: Yup.string().required('El nombre es obligatorio'),
        lastname: Yup.string().required('El apellido es obligatorio'),
        email: Yup.string().email( true ).required('El email es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria')
    }
}