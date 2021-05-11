import React , { useEffect, useState } from 'react'
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";

export const LogOutAllDevices = () => {
    const { token, setUserData, setFinishedDays, setToken, reqUrl } = usePlanContext();
    const [logOut, setLogOut] = useState(false)
    const history = useHistory()

    const [clicked, setClicked] = useState(false);

    const handleLogOutAll = () => {
        setLogOut(true)
    }

    useEffect(()=>{
        if(logOut){
            fetch(`${reqUrl}/users/logoutAll`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
            })
                .then(()=>setLogOut(false))
                .then(()=>history.push('/home'))
                .then(()=>setUserData({}))
                .then(()=>setFinishedDays([]))
                .then(()=>setToken(''))
                .catch(e => console.log(e))
        }
    }, [logOut])
    return (
        <div className='controls'>
            {clicked ? <div>
                    <button onClick={handleLogOutAll}
                            aria-label='log out from all places'
                            className='btn btn-edit'>
                        <i className="fa fa-globe"/>
                    </button>
                    <button onClick={()=>setClicked(false)}
                            aria-label='close'
                            className='btn btn-edit'>
                        <i className="fa fa-times"/>
                    </button>
                </div>
                :
                <button onClick={()=>setClicked(true)}
                        aria-label='log out'
                        className='btn btn-edit'>
                    <i className="fa fa-sign-out"/>
                </button>
            }
            </div>
    )
}