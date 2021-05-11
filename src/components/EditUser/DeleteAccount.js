import React, { useEffect, useState } from 'react'
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { deletingAccount } from "../../utils/translations";

export const DeleteAccount = () => {
    const { token, setUserData, userData, setFinishedDays, setToken, reqUrl } = usePlanContext();
    const history = useHistory();
    const [remove, setRemove] = useState(false);
    const [confirmButton, setConfirmButton] = useState(false);

    const deletingAccountText = `${deletingAccount[userData.language]}`

    useEffect(()=>{
        if(remove){
            fetch(`${reqUrl}/users/me`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
            })
                .then(() => history.push("/home"))
                .then(()=> setUserData({}))
                .then(()=>setFinishedDays([]))
                .then(()=>setToken(''))
                .catch(e => console.log(e))
        }
    }, [remove])
    return (
        <div className='controls'>
            {confirmButton ?
            <>
                <span>{deletingAccountText}, {userData.username}?</span>
                <br/>
                <button onClick={()=>setRemove(true)}
                        aria-label='confirm'
                        className='btn btn-edit'>
                    <i className="fa fa-check"/>
                </button>
                <button onClick={()=>setConfirmButton(false)}
                        aria-label='close'
                        className='btn btn-edit confirm'>
                    <i className="fa fa-times"/>
                </button>
            </>
            :
            <button onClick={()=>setConfirmButton(true)}
                    aria-label='delete account'
                    className='btn btn-edit'>
                <i className="fa fa-trash"/>
            </button>
            }
        </div>
    )
}