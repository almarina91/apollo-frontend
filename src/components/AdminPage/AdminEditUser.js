import React, { useEffect, useState } from "react";
import { usePlanContext } from "../../context/context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useFormik } from 'formik';
import {CLASS, ICON, LANGUAGE, MESSAGE} from "../../utils/enums";

// formik validation of updated user info
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = MESSAGE.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = MESSAGE.invalidEmail;
    }
    if (!values.username) {
        errors.username = MESSAGE.required;
    }
    if (!/^\d+$/.test(values.weight)) {
        errors.weight = MESSAGE.invalidWeight;
    }
    if (!/^\d+$/.test(values.height)) {
        errors.height = MESSAGE.invalidHeight;
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
                .catch(e => console.log(MESSAGE.wrong))
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
            <div><i className={ICON.userPlus2x}/></div>
            <div className={CLASS.adminUser}>
                {userUpdateVisible?
                    <div>
                        <DropdownButton id="dropdown-item-button-admin"
                                        title={selectedUser.username ? selectedUser.username : MESSAGE.findUser}
                                        className={CLASS.dropdownUsers}>
                            {userList.map(user => <Dropdown.Item data-userID={user._id} onSelect={()=>setSelectedUser(user)}>{user.username}</Dropdown.Item>)}
                        </DropdownButton>
                        {(Object.keys(selectedUser).length === 0) ?
                            null
                            :
                            <div>
                                {updateSelectedUser ?
                                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                                        <br/>
                                        <span><i className={ICON.userO}/></span>
                                        <br/>
                                        <input name="username"
                                               value={formik.values.username}
                                               onChange={formik.handleChange}
                                               className={CLASS.adminInput}
                                               defaultValue={selectedUser.username}/>
                                        {formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
                                        <br/>
                                        <span><i className={ICON.envelope}/></span>
                                        <br/>
                                        <input  name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className={CLASS.adminInput}
                                                defaultValue={selectedUser.email}/>
                                        {formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                                        <br/>
                                        <span><i className={ICON.arrowsV}/></span>
                                        <br/>
                                        <input name="height"
                                               value={formik.values.height}
                                               onChange={formik.handleChange}
                                               className={CLASS.adminInput}
                                               defaultValue={selectedUser.height}/>
                                        {formik.errors.height ? (<div>{formik.errors.height}</div>) : null}
                                        <br/>
                                        <span><i className={ICON.scale}/></span>
                                        <br/>
                                        <input name="weight"
                                               value={formik.values.weight}
                                               onChange={formik.handleChange}
                                               className={CLASS.adminInput}
                                               defaultValue={selectedUser.weight}/>
                                        {formik.errors.weight ? (<div>{formik.errors.weight}</div>) : null}
                                        <br/>
                                        <span><i className={ICON.language}/></span>
                                        <br/>
                                        <DropdownButton id="dropdown-item-button-admin"
                                                        title={language}
                                                        onClick={e=>e.preventDefault()}>
                                            <Dropdown.Item as="button" onSelect={()=> setLanguage(LANGUAGE.eng)}>english</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage(LANGUAGE.ita)}>italian</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage(LANGUAGE.nl)}>dutch</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage(LANGUAGE.ser)}>serbian</Dropdown.Item>
                                            <Dropdown.Item as="button" onSelect={()=>setLanguage(LANGUAGE.fr)}>french</Dropdown.Item>
                                        </DropdownButton>
                                        {message? <span>user updated!</span>:null}
                                        <br/>
                                        <button type='submit'
                                                aria-label='confirm'
                                                className={CLASS.adminButtons}><i className={ICON.check}/></button>
                                        <button className={CLASS.adminButtons}
                                                aria-label='close'
                                                onClick={()=> {
                                            setUpdateSelectedUser(false);
                                            setMessage(false)
                                        }}><i className={ICON.x}/></button>
                                    </form>
                                    :
                                    <div>
                                        <br/>
                                        <span><i className={ICON.userO}/></span>
                                        <br/>
                                        <span> {selectedUser.username}</span>
                                        <br/>
                                        <span><i className={ICON.envelope}/></span>
                                        <br/>
                                        <span> {selectedUser.email}</span>
                                        <br/>
                                        <span><i className={ICON.language}/></span>
                                        <br/>
                                        <span> {selectedUser.language}</span>
                                        <br/>
                                        <span><i className={ICON.arrowsV}/></span>
                                        <br/>
                                        <span> {selectedUser.height} cm</span>
                                        <br/>
                                        <span><i className={ICON.scale}/></span>
                                        <br/>
                                        <span> {selectedUser.weight} kg</span>
                                        <br/>
                                        <button className={CLASS.adminButtons}
                                                aria-label='update selected user'
                                                onClick={()=>setUpdateSelectedUser(true)}>
                                            <i className={ICON.pencil}/>
                                        </button>
                                    </div>
                                }
                                <button className={CLASS.adminButtons}
                                        aria-label='delete user'
                                        onClick={()=>setDeleteUser(true)}>
                                    <i className={ICON.trash}/>
                                </button>
                            </div>
                        }
                        <button className={CLASS.adminButtons}
                                aria-label='close'
                                onClick={()=> {
                            setUserUpdateVisible(false)
                            setSelectedUser({})
                        }}><i className={ICON.x}/></button>
                    </div>
                    :<button className={CLASS.adminButtons}
                             aria-label='update a user'
                             onClick={()=>setUserUpdateVisible(true)}>update a user</button>}
                <br/>
            </div>
        </div>
    )
}