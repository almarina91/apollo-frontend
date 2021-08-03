import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { CLASS, ICON, MESSAGE, PLACEHOLDER } from "../../utils/enums";

/**
 * A component that allows admin to add a plan.
 * @requires enums
 * @returns input form
 */

/**
 * Validates input data.
 * @const errors - contains all the error messages.
 */

const validate = values => {
    const errors = {};
    if (!values.englishName) {
        errors.englishName = MESSAGE.required;
    }
    if (!values.italianName) {
        errors.italianName = MESSAGE.required;
    }
    if (!values.frenchName) {
        errors.frenchName = MESSAGE.required;
    }
    if (!values.serbianName) {
        errors.serbianName = MESSAGE.required;
    }
    if (!values.dutchName) {
        errors.dutchName = MESSAGE.required;
    }
    return errors;
};

/**
 * A component that returns admin input form.
 * @const formik - validates the input data
 * @const inputData - contains all the input data that are validated by formik
 * @const createPlan - when true, fetch is called with input data already set
 * @const message - shows a message when a plan is created
 */

export const AdminAddsPlan = ()=> {
    const { token, reqUrl, setFetchPlansAgain } = usePlanContext();

    const [createPlan, setCreatePlan] = useState(false);
    const [inputData, setInputData] = useState({});
    const [message, setMessage] = useState(false)

    const formik = useFormik({
        initialValues: {
            englishName:'',
            italianName:'',
            frenchName: '',
            serbianName: '',
            dutchName: ''
        },
        validate,
        onSubmit: values => {
            setCreatePlan(true)
            setInputData(values)
        },
    });
    useEffect(() => {
        if (createPlan) {
            fetch(`${reqUrl}/plans`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body: JSON.stringify(inputData)})
                .then(res => res.json())
                .then(()=> setMessage(true))
                .then(()=> setFetchPlansAgain(true))
                .catch(e => console.log(MESSAGE.wrong))
        }
    } , [inputData])
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <input name="englishName"
                   value={formik.values.englishName}
                   onChange={formik.handleChange}
                   className={CLASS.adminInput}
                   placeholder={PLACEHOLDER.engName}/>
            {formik.errors.englishName ? (<div>{formik.errors.englishName}</div>) : null}
            <br/>
            <input  name="italianName"
                    value={formik.values.italianName}
                    onChange={formik.handleChange}
                    className={CLASS.adminInput}
                    placeholder={PLACEHOLDER.itaName}/>
            {formik.errors.italianName ? (<div>{formik.errors.italianName}</div>) : null}
            <br/>
            <input  name="frenchName"
                    value={formik.values.frenchName}
                    onChange={formik.handleChange}
                    className={CLASS.adminInput}
                    placeholder={PLACEHOLDER.frName}/>
            {formik.errors.frenchName ? (<div>{formik.errors.frenchName}</div>) : null}
            <br/>
            <input  name="serbianName"
                    value={formik.values.serbianName}
                    onChange={formik.handleChange}
                    className={CLASS.adminInput}
                    placeholder={PLACEHOLDER.serName}/>
            {formik.errors.serbianName ? (<div>{formik.errors.serbianName}</div>) : null}
            <br/>
            <input  name="dutchName"
                    value={formik.values.dutchName}
                    onChange={formik.handleChange}
                    className={CLASS.adminInput}
                    placeholder={PLACEHOLDER.nlName} />
            {formik.errors.dutchName ? (<div>{formik.errors.dutchName}</div>) : null}
            <br/>
            {message? <span>plan created!</span>:null}
            <button type='submit'
                    aria-label='confirm'
                    className={CLASS.adminButtons}>
                <i className={ICON.check}aria-hidden="true"/>
            </button>
        </form>
    )
}