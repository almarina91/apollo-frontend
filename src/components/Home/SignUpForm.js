import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { closeAllModals } from "../../utils/closeAllModals";
import { AllowGeolocation } from "./AllowGeolocation";
import { languageName } from "../../utils/translations";

const required = 'Required';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = required;
    } else if (values.password.length < 8) {
        errors.password = 'Must be longer than 8 characters';
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Must contain at least 1 capital letter';
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = 'Must contain at least 1 lowercase letter';
    } else if (!/[@#$^+=!]/.test(values.password)) {
        errors.password = 'Must contain at least 1 special character';
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Must contain at least 1 number';
    }
    if (!values.email) {
        errors.email =required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'invalid email';
    }
    if (!values.username) {
        errors.username = required;
    }
    return errors;
};

export const SignUpForm = () => {
    const { setUserData, setToken, reqUrl } = usePlanContext();

    const [fetchPlans, setFetchPlans] = useState(false)
    const [inputUserData, setInputUserData]= useState({})

    const [language, setLanguage] = useState(languageName.english);

    let history = useHistory();

    const formik = useFormik({
        initialValues: {
            email:'',
            password: '',
            username:''
        },
        validate,
        onSubmit: values => {
            setFetchPlans(true)
            setInputUserData({...values, language:language})
        },
    });

    useEffect(() => {
        if (fetchPlans) {
                fetch(`${reqUrl}/users`,{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputUserData)})
                    .then(res => res.json())
                    .then(data => {
                        setUserData(data.user)
                        setToken(data.token)
                    })
                    .then(() => history.push("/plans"))
                    .then(()=> closeAllModals())
                    .catch(e => console.log(e))
        }
    } , [inputUserData])

    return(
        <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}} noValidate>
            <input
                name='username'
                className='modal-input'
                id="username"
                placeholder="username"
                onChange={formik.handleChange}
                value={formik.values.username}/>
            { formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}

            <input
                name="email"
                type="email"
                className='modal-input'
                id="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}/>
            { formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
            <input
                name="password"
                type="password"
                className='modal-input'
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}/>
            { formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}

            <DropdownButton id="dropdown-item-button" title={language} onClick={e=>e.preventDefault()}>
                <Dropdown.Item as="button" onSelect={()=> setLanguage(languageName.english)}>english</Dropdown.Item>
                <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.italian)}>italian</Dropdown.Item>
                <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.dutch)}>dutch</Dropdown.Item>
                <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.serbian)}>serbian</Dropdown.Item>
                <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.french)}>french</Dropdown.Item>
            </DropdownButton>
            <br/>
            <AllowGeolocation />
            <br/>
            <button type="submit" className="btn btn-modal">sign up</button>
        </form>
    )
}