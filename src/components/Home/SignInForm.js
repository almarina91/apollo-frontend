import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { closeAllModals } from "../../utils/closeAllModals";
import { AllowGeolocation } from "./AllowGeolocation";

const required = 'Required';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email';
    }
    if (!values.password) {
        errors.password = required;
    }
    return errors;
};

export const SignInForm = () => {
    const { userData, setUserData, setToken, reqUrl } = usePlanContext();
    const [fetchPlans, setFetchPlans] = useState(false)
    const [inputUserData, setInputUserData]= useState({})
    let history = useHistory();
    const [errorMessage, setErrorMessage]= useState(false)

    const formik = useFormik({
        initialValues: {
            email:'',
            password: ''
        },
        validate,
        onSubmit: values => {
            setFetchPlans(true)
            setInputUserData(values)
        },
    });

    const submitHandler = async(event) => {
        event.preventDefault();
        formik.handleSubmit(event);
    }

    useEffect(() => {
        if (fetchPlans) {
        fetch(`${reqUrl}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputUserData)
        })
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length === 0) {
                    throw Error
                } else {
                    setToken(data.token)
                    setUserData(data.user)
                }
            })
            .catch(e => setErrorMessage(true))
        }
    } , [inputUserData])

    useEffect(()=>{
        if (userData !== undefined && fetchPlans) {
            history.push("/plans", { from: '/home' });
            closeAllModals()
            setErrorMessage(false)
        }
    }, [userData])

    return(
        <form autoComplete="off">
            <input className='modal-input'
                   data-testid="required-input-email"
                   type='email'
                   name='email'
                   onChange={formik.handleChange}
                   value={formik.values.email}
                   placeholder="email" />
            { formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
            <input className='modal-input'
                   placeholder="password"
                   data-testid="required-input-password"
                   type='password'
                   name='password'
                   onChange={formik.handleChange}
                   value={formik.values.password}
            />
            { formik.errors.password ?
                <div className='errors'>{formik.errors.password}</div>
                :
                null}
            {errorMessage ?
                <div>
                    <br/>
                    <span className='errors'>Invalid data</span>
                    <br/>
                </div>
                :
                null}
            <AllowGeolocation/>
            <button type="button"
                    onClick={(event) => submitHandler(event)}
                    className="btn btn-modal">
                sign in
            </button>
        </form>
    )
}