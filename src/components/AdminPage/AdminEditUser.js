import React, { useEffect, useState } from "react";
import { usePlanContext } from "../../context/context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useFormik } from 'formik';

// formik validation of updated user info
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email';
    }
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!/^\d+$/.test(values.weight)) {
        errors.weight = 'insert valid weight in kgs';
    }
    if (!/^\d+$/.test(values.height)) {
        errors.height = 'insert valid height in cm';
    }
    return errors;
};

export const AdminEditUser = () => {
    const { token, reqUrl } = usePlanContext();

    const [userList, setUserList]= useState([])
    const [userUpdateVisible, setUserUpdateVisible] = useState(false)

    const [selectedUser, setSelectedUser] = useState({})
    const [deleteUser, setDeleteUser] = useState(false);
    const [updateUsersList, setUpdateUsersList] = useState(false)

    const [updateSelectedUser, setUpdateSelectedUser] = useState(false)
    const [language, setLanguage] = useState('english');
    const [updateUser, setUpdateUser] = useState(false);
    const [inputData, setInputData] = useState({});
    const [message, setMessage] = useState(false)

    const formik = useFormik({
        initialValues: {
            email:'',
            username:'',
            weight: '',
            height: ''
        },
        validate,
        onSubmit: values => {
            setUpdateUser(true)
            setInputData({...values, language:language})
        },
    });
    // admin changes user
    useEffect(() => {
        if (updateUser) {
            fetch(`${reqUrl}/users/${selectedUser._id}`,{
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`},
                body: JSON.stringify(inputData)})
                .then(res => res.json())
                .then(() => setUpdateUsersList(true))
                .then(()=> setMessage(true))
                .then(()=>setUpdateUsersList(true))
                .catch(e => console.log('something went wrong'))
        }
    } , [inputData])

    // admin removes user
    useEffect(()=>{
        if(deleteUser) {
            fetch(`${reqUrl}/users/${selectedUser._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
            })
                .then(res=>res.json())
                .then(()=>setSelectedUser({}))
                .then(()=> setUpdateUsersList(true))
                .then(()=>setDeleteUser(false))
                .catch(e=>console.log(e))
        }
    }, [deleteUser])

    // update list of users
    useEffect(()=>{
        fetch(`${reqUrl}/users/usersList`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
        })
            .then(res=>res.json())
            .then(data=>setUserList(data))
            .then(()=>setUpdateUsersList(false))
            .catch(e=>console.log(e))
    }, [updateUsersList])

    return(
        <div>
            <div><i className="fa fa-user-plus fa-2x "/></div>
            <div className='admin-user'>
                {userUpdateVisible?
                    <div>
                        <DropdownButton id="dropdown-item-button-admin" title={selectedUser.username?selectedUser.username:'find a user'} className='dropdown-users'>
                            {userList.map(user => <Dropdown.Item data-userID={user._id} onSelect={()=>setSelectedUser(user)}>{user.username}</Dropdown.Item>)}
                        </DropdownButton>
                        {(Object.keys(selectedUser).length === 0) ?
                            null
                            :
                            <div>
                                {updateSelectedUser ?
                                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                                        <br/>
                                        <span><i className="fa fa-user-o colored"/></span>
                                        <br/>
                                        <input name="username"
                                               value={formik.values.username}
                                               onChange={formik.handleChange}
                                               className='admin-input'
                                               defaultValue={selectedUser.username}/>
                                        {formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
                                        <br/>
                                        <span><i className="fa fa-envelope-o colored"/></span>
                                        <br/>
                                        <input  name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className='admin-input'
                                                defaultValue={selectedUser.email}/>
                                        {formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                                        <br/>
                                        <span><i className="fa fa-arrows-v colored"/></span>
                                        <br/>
                                        <input name="height"
                                               value={formik.values.height}
                                               onChange={formik.handleChange}
                                               className='admin-input'
                                               defaultValue={selectedUser.height}/>
                                        {formik.errors.height ? (<div>{formik.errors.height}</div>) : null}
                                        <br/>
                                        <span><i className="fa fa-balance-scale colored"/></span>
                                        <br/>
                                        <input name="weight"
                                               value={formik.values.weight}
                                               onChange={formik.handleChange}
                                               className='admin-input'
                                               defaultValue={selectedUser.weight}/>
                                        {formik.errors.weight ? (<div>{formik.errors.weight}</div>) : null}
                                        <br/>
                                        <span><i className="fa fa-language colored"/></span>
                                        <br/>
                                        <DropdownButton id="dropdown-item-button-admin" title={language} onClick={e=>e.preventDefault()}>
                                            <Dropdown.Item as="button" onSelect={()=> setLanguage('english')}>english</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage('italian')}>italian</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage('dutch')}>dutch</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage('serbian')}>serbian</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage('french')}>french</Dropdown.Item>
                                        </DropdownButton>
                                        {message? <span>user updated!</span>:null}
                                        <br/>
                                        <button type='submit'
                                                aria-label='confirm'
                                                className='admin-buttons'><i className="fa fa-check"/></button>
                                        <button className='admin-buttons'
                                                aria-label='close'
                                                onClick={()=> {
                                            setUpdateSelectedUser(false);
                                            setMessage(false)
                                        }}><i className="fa fa-times"/></button>
                                    </form>
                                    :
                                    <div>
                                        <br/>
                                        <span><i className="fa fa-user-o colored"/></span>
                                        <br/>
                                        <span> {selectedUser.username}</span>
                                        <br/>
                                        <span><i className="fa fa-envelope-o colored"/></span>
                                        <br/>
                                        <span> {selectedUser.email}</span>
                                        <br/>
                                        <span><i className="fa fa-language colored"/></span>
                                        <br/>
                                        <span> {selectedUser.language}</span>
                                        <br/>
                                        <span><i className="fa fa-arrows-v colored"/></span>
                                        <br/>
                                        <span> {selectedUser.height} cm</span>
                                        <br/>
                                        <span><i className="fa fa-balance-scale colored"/></span>
                                        <br/>
                                        <span> {selectedUser.weight} kg</span>
                                        <br/>
                                        <button className='admin-buttons'
                                                aria-label='update selected user'
                                                onClick={()=>setUpdateSelectedUser(true)}><i className="fa fa-pencil"/></button>
                                    </div>
                                }
                                <button className='admin-buttons'
                                        aria-label='delete user'
                                        onClick={()=>setDeleteUser(true)}><i className="fa fa-trash-o"/></button>
                            </div>
                        }
                        <button className='admin-buttons'
                                aria-label='close'
                                onClick={()=> {
                            setUserUpdateVisible(false)
                            setSelectedUser({})
                        }}><i className="fa fa-times"/></button>
                    </div>
                    :<button className='admin-buttons'
                             aria-label='update a user'
                             onClick={()=>setUserUpdateVisible(true)}>update a user</button>}
                <br/>
            </div>
        </div>
    )
}