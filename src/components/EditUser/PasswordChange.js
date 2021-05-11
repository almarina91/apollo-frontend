import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { usePlanContext } from "../../context/context";
import { passwordChange,
        required,
        passwordLongerThan,
        passwordContainsLetters,
        passwordSpecialCharacters,
        passwordContainsNumber,
        passwordSaved} from "../../utils/translations";

export const PasswordChange = () => {
    // getting data from context
    const { token, userData, reqUrl } = usePlanContext();

    // component-specific states
    const [inputPassword, setInputPassword] = useState({})
    const [updatePassword, setUpdatePassword] = useState(false);
    const [patch, setPatch] = useState(false)
    const [message, setMessage] = useState('')

    const validate = values => {
        const errors = {};
        if (!values.password) {
            errors.password = required[userData.language];
        } else if (values.password.length < 8) {
            errors.password = passwordLongerThan[userData.language];
        } else if (!/[A-Za-z]/.test(values.password)) {
            errors.password = passwordContainsLetters[userData.language];
        } else if (!/[@#$^+=!]/.test(values.password)) {
            errors.password = passwordSpecialCharacters[userData.language];
        } else if (!/[0-9]/.test(values.password)) {
            errors.password = passwordContainsNumber[userData.language];
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate,
        onSubmit: values => {
            setInputPassword(values)
            setPatch(true)
        },
    });

    const passwordChangeText = `${passwordChange[userData.language]}`;

    useEffect(() => {
        if(patch){
            fetch(`${reqUrl}/users/me`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body: JSON.stringify(inputPassword)
            })
                .then(res => res.json())
                .then(()=>setPatch(false))
                .then(()=>setMessage(passwordSaved[userData.language]))
                .catch(e => setMessage('Something went wrong, try again later'))
        }
    }, [patch])

    return (
        <div className='settings controls'>
            {updatePassword ?
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <input type='password'
                           name='password'
                           className='edit-user-input'
                           placeholder={passwordChangeText}
                           onChange={formik.handleChange}
                           value={formik.values.password}
                    />
                    <br/>
                    {message}
                    { formik.errors.password ?
                        <div>{formik.errors.password}</div> :
                        <button className='btn btn-edit'
                                aria-label='confirm'
                                type='submit'>
                            <i className="fa fa-check"/>
                        </button>}
                    <button className='btn btn-edit'
                            aria-label='close'
                            onClick={()=> {
                                setUpdatePassword(false)
                                setMessage('')}}>
                        <i className="fa fa-times"/>
                    </button>
                </form>
                : <button className='btn btn-edit'
                          aria-label='change password'
                          onClick={()=> setUpdatePassword(true)}>
                    <i className="fa fa-key"/>
                </button>
            }
        </div>
    )
}