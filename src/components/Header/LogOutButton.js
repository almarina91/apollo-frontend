import { usePlanContext } from "../../context/context";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { variantsButtons as variants } from "../../utils/animationVariations";

export const LogOutButton = () => {
    let history = useHistory();
    const { token, setUserData, setToken, setFinishedDays, reqUrl } = usePlanContext();
    const [logOut, setLogOut] = useState(false)

    const handleLogOut = () => {
        setLogOut(true)
    }

    useEffect(()=>{
        if(logOut){
            fetch(`${reqUrl}/users/logout`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
                })
                .then(() => history.push("/home"))
                .then(()=> setUserData({}))
                .then(()=>setFinishedDays([]))
                .then(()=>setToken(''))
                .catch(e => console.log(e))
        }
    }, [logOut])

    return (
        <motion.li variants={variants}
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.95 }}
                       className='icon-placeholder'
                       onClick={handleLogOut}>
                        <i className="fa fa-sign-out fa-2x"/>
        </motion.li>
    )
}