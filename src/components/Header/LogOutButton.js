import { usePlanContext } from "../../context/context";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { variantsButtons as variants } from "../../utils/animationVariations";
import { CLASS, ICON } from "../../utils/enums";

/**
 * A component that returns logout button.
 * @const logout - when true, enables fetch
 */

export const LogOutButton = () => {
    let history = useHistory();
    const { token, setUserData, setToken, setFinishedDays, reqUrl } = usePlanContext();
    const [logOut, setLogOut] = useState(false)

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
                       className={CLASS.icon}
                       onClick={()=>setLogOut(true)}>
                        <i className={ICON.signOut2x}/>
        </motion.li>
    )
}