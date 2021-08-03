import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { closeAllModals } from "../../utils/closeAllModals";
import { AllowGeolocation } from "./AllowGeolocation";
import { CLASS, MESSAGE, PLACEHOLDER } from "../../utils/enums";

/**
 * A component that returns a sign in form.
 * @const validate - validates input fields
 */

const validate = values => {
    const enums = {};
    if (!values.email) {
        enums.email = MESSAGE.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        enums.email = MESSAGE.invalidEmail;
    }
    if (!values.password) {
        enums.password = MESSAGE.required;
    }
    return enums;
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
            <input className={CLASS.modalInput}
                   data-testid="required-input-email"
                   type='email'
                   name='email'
                   onChange={formik.handleChange}
                   value={formik.values.email}
                   placeholder="email" />
            { formik.enums.email ? <div className='enums'>{formik.enums.email}</div> : null}
            <input className={CLASS.modalInput}
                   placeholder={PLACEHOLDER.password}
                   data-testid="required-input-password"
                   type='password'
                   name='password'
                   onChange={formik.handleChange}
                   value={formik.values.password}
            />
            { formik.enums.password ?
                <div className={CLASS.enums}>{formik.enums.password}</div>
                :
                null}
            {errorMessage ?
                <div>
                    <br/>
                    <span className={CLASS.enums}>Invalid data</span>
                    <br/>
                </div>
                :
                null}
            <AllowGeolocation/>
            <button type="button"
                    onClick={(event) => submitHandler(event)}
                    className={CLASS.buttonModal}>
                sign in
            </button>
        </form>
    )
}