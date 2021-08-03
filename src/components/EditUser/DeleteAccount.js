import React, { useEffect, useState } from 'react'
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { deletingAccount } from "../../utils/translations";
import { CLASS, ICON } from "../../utils/enums";


/**
 * A component that returns deletes an account.
 * @const remove - when true, the fetch is enabled and account is actually deleted
 * @const confirm button - when true, the button to confirm removal is displayed
 * @const deletingAccountText - contains text in the chosen language
 */

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
        <div className={CLASS.controls}>
            {confirmButton ?
            <>
                <span>{deletingAccountText}, {userData.username}?</span>
                <br/>
                <button onClick={()=>setRemove(true)}
                        aria-label='confirm'
                        className={CLASS.button}>
                    <i className={ICON.check}/>
                </button>
                <button onClick={()=>setConfirmButton(false)}
                        aria-label='close'
                        className={CLASS.buttonConfirm}>
                    <i className={ICON.x}/>
                </button>
            </>
            :
            <button onClick={()=>setConfirmButton(true)}
                    aria-label='delete account'
                    className={CLASS.button}>
                <i className={ICON.trashFull}/>
            </button>
            }
        </div>
    )
}