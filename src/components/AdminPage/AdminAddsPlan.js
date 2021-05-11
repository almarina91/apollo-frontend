import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";

const required= 'Required';

// validation of new plan inputs
const validate = values => {
    const errors = {};
    if (!values.englishName) {
        errors.englishName = required;
    }
    if (!values.italianName) {
        errors.italianName = required;
    }
    if (!values.frenchName) {
        errors.frenchName = required;
    }
    if (!values.serbianName) {
        errors.serbianName = required;
    }
    if (!values.dutchName) {
        errors.dutchName = required;
    }
    return errors;
};

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
                .catch(e => console.log('something went wrong'))
        }
    } , [inputData])
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <input name="englishName"
                   value={formik.values.englishName}
                   onChange={formik.handleChange}
                   className='admin-input'
                   placeholder='english name'/>
            {formik.errors.englishName ? (<div>{formik.errors.englishName}</div>) : null}
            <br/>
            <input  name="italianName"
                    value={formik.values.italianName}
                    onChange={formik.handleChange}
                    className='admin-input'
                    placeholder='italian name'/>
            {formik.errors.italianName ? (<div>{formik.errors.italianName}</div>) : null}
            <br/>
            <input  name="frenchName"
                    value={formik.values.frenchName}
                    onChange={formik.handleChange}
                    className='admin-input'
                    placeholder='french name'/>
            {formik.errors.frenchName ? (<div>{formik.errors.frenchName}</div>) : null}
            <br/>
            <input  name="serbianName"
                    value={formik.values.serbianName}
                    onChange={formik.handleChange}
                    className='admin-input'
                    placeholder='serbian name'/>
            {formik.errors.serbianName ? (<div>{formik.errors.serbianName}</div>) : null}
            <br/>
            <input  name="dutchName"
                    value={formik.values.dutchName}
                    onChange={formik.handleChange}
                    className='admin-input'
                    placeholder='dutch name' />
            {formik.errors.dutchName ? (<div>{formik.errors.dutchName}</div>) : null}
            <br/>
            {message? <span>plan created!</span>:null}
            <button type='submit'
                    aria-label='confirm'
                    className='admin-buttons'><i className="fa fa-check" aria-hidden="true"/></button>
        </form>
    )
}