import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { closeAllModals } from "../../utils/closeAllModals";
import { AllowGeolocation } from "./AllowGeolocation";
import { languageName } from "../../utils/translations";
import {CLASS, MESSAGE, PLACEHOLDER} from "../../utils/enums";

const validate = values => {
    const enums = {};
    if (!values.password) {
        enums.password = MESSAGE.required;
    } else if (values.password.length < 8) {
        enums.password = MESSAGE.longerThan;
    } else if (!/[A-Z]/.test(values.password)) {
        enums.password = MESSAGE.capital;
    } else if (!/[a-z]/.test(values.password)) {
        enums.password = MESSAGE.lowercase;
    } else if (!/[@#$^+=!]/.test(values.password)) {
        enums.password = MESSAGE.specialChar;
    } else if (!/[0-9]/.test(values.password)) {
        enums.password = MESSAGE.number;
    }
    if (!values.email) {
        enums.email = MESSAGE.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        enums.email = MESSAGE.invalidEmail;
    }
    if (!values.username) {
        enums.username = MESSAGE.required;
    }
    return enums;
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
                className={CLASS.modalInput}
                id="username"
                placeholder={PLACEHOLDER.username}
                onChange={formik.handleChange}
                value={formik.values.username}/>
            { formik.enums.username ? <div className={CLASS.enums}>{formik.enums.username}</div> : null}

            <input
                name="email"
                type="email"
                className={CLASS.modalInput}
                id="email"
                placeholder={PLACEHOLDER.email}
                onChange={formik.handleChange}
                value={formik.values.email}/>
            { formik.enums.email ? <div className={CLASS.enums}>{formik.enums.email}</div> : null}
            <input
                name="password"
                type="password"
                className={CLASS.modalInput}
                id="password"
                placeholder={PLACEHOLDER.password}
                onChange={formik.handleChange}
                value={formik.values.password}/>
            { formik.enums.password ? <div className={CLASS.enums}>{formik.enums.password}</div> : null}

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
            <button type="submit" className={CLASS.buttonModal}>sign up</button>
        </form>
    )
}