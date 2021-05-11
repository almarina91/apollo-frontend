import React, { useEffect, useState } from 'react'
import { usePlanContext } from "../../context/context";
import { useFormik } from 'formik';
import { Dropdown, DropdownButton } from "react-bootstrap";
import { required, insertValidWeight, insertValidHeight, invalidEmail, languageName } from "../../utils/translations";


export const EditUserData = () => {
    const { token, setUserData, userData, reqUrl } = usePlanContext();
    const [edit, setEdit] = useState(false)

    const [inputUserData, setInputUserData]= useState({})
    const [language, setLanguage] = useState(userData.language)

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = required[userData.language];
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = invalidEmail[userData.language];
        }
        if (!values.username) {
            errors.username = required[userData.language];
        }
        if (!/^\d+$/.test(values.weight)) {
            errors.weight = insertValidWeight[userData.language];
        }
        if (!/^\d+$/.test(values.height)) {
            errors.height = insertValidHeight[userData.language];
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: userData.email,
            username: userData.username,
            weight: userData.weight?userData.weight:0,
            height: userData.height?userData.height:0
        },
        validate,
        onSubmit: values => {
            setInputUserData({...values, language:language})
            setEditable(false)
            setEdit(true)
        },
    });

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if(edit){
            fetch(`${reqUrl}/users/me`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body: JSON.stringify(inputUserData)
            })
                .then(res => res.json())
                .then(data => setUserData(data))
                .then(()=>setEdit(false))
                .catch(e => console.log(e))
        }
    }, [edit])
    return (
            <div className='edit-user-data'>
                {(editable === false) ?
                    <div>
                        <span className='edit-user-span'><i className="fa fa-user-o colored"/></span>
                        <span  className='edit-user-span'> {userData.username}</span>
                        <br/>
                        <span className='edit-user-span'><i className="fa fa-envelope-o colored"/></span>
                        <span  className='edit-user-span' > {userData.email}</span>
                        <br/>
                        <span className='edit-user-span'><i className="fa fa-balance-scale colored"/></span>
                        <span className='edit-user-span' > {userData.weight?`${userData.weight} kg` :'0 kg'}</span>
                        <br/>
                        <span className='edit-user-span'><i className="fa fa-arrows-v colored"/></span>
                        <span className='edit-user-span' > {userData.height?`${userData.height} cm` :'0 cm'}</span>
                        <br/>
                        <span className='edit-user-span'><i className="fa fa-language colored"/></span>
                        <span className='edit-user-span' > {userData.language}</span>
                        <br/>
                        <button className='btn btn-edit'
                                aria-label='edit'
                                onClick={() => setEditable(!editable)}><i className="fa fa-pencil"/></button>
                    </div>
                    :
                    <div>
                    <form onSubmit={formik.handleSubmit}>
                        <i className="fa fa-user-o colored"/>
                        <input name="username"
                               value={formik.values.username}
                               onChange={formik.handleChange}
                               className='edit-user-input'
                               defaultValue={userData.username}/>
                        {formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
                        <br/>
                        <i className="fa fa-envelope-o colored"/>
                        <input name="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               className='edit-user-input'
                               defaultValue={userData.email}/>
                        {formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                        <br/>
                        <i className="fa fa-balance-scale colored"/>
                        <input name="weight"
                               value={formik.values.weight}
                               onChange={formik.handleChange}
                               className='edit-user-input'
                               defaultValue={userData.weight?userData.weight:0}/>
                        {formik.errors.weight ? (<div>{formik.errors.weight}</div>) : null}
                        <br/>
                        <i className="fa fa-arrows-v colored"/>
                        <input name="height"
                               value={formik.values.height}
                               onChange={formik.handleChange}
                               className='edit-user-input'
                               defaultValue={userData.height? userData.height: 0}/>
                        {formik.errors.height ? (<div>{formik.errors.height}</div>) : null}
                        <br/>
                        <DropdownButton className='styled-dropdown' id="dropdown-item-button-edit-user" title={language} onClick={e=>e.preventDefault()}>
                            <Dropdown.Item as="button" onSelect={()=> setLanguage(languageName.english)}>english</Dropdown.Item>
                            <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.italian)}>italian</Dropdown.Item>
                            <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.dutch)}>dutch</Dropdown.Item>
                            <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.serbian)}>serbian</Dropdown.Item>
                            <Dropdown.Item as="button" onSelect={()=>setLanguage(languageName.french)}>french</Dropdown.Item>
                        </DropdownButton>

                        <button type='submit'
                                className='btn btn-edit confirm'
                                aria-label='confirm'>
                            <i className="fa fa-check confirm"/>
                        </button>
                    </form>
                    </div>
                }
            </div>
    )
}