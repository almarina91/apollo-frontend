import * as React from "react";
import { motion } from "framer-motion";
import { LogOutButton } from "../LogOutButton";
import { usePlanContext } from "../../../context/context";
import { useHistory } from "react-router-dom";
import { variantsButtons } from "../../../utils/animationVariations";
import { salutation, languageName } from "../../../utils/translations";

export const Navigation = () => {
    const { userData } = usePlanContext();
    let history = useHistory();
    const language = userData.language || languageName.english;

    return (
        <motion.ul>
            {userData.username ?
                <motion.li variants={variantsButtons}
                           className='icon-placeholder-title'>{salutation[language]}, {userData.username}</motion.li>
                :
                <motion.li className='icon-placeholder-title'
                           variants={variantsButtons}>Hello, user</motion.li>}
            {userData.username ?
                <>
                    {(userData.role === 'admin') ?
                        <motion.li variants={variantsButtons}
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.95 }}
                                       className='icon-placeholder'
                                       onClick={() => history.push('/admin')}>
                            <i className="fa fa-lock fa-2x"/></motion.li>
                        : null
                    }
                    <motion.li variants={variantsButtons}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.95 }}
                                   className='icon-placeholder'
                                   onClick={() => history.push('/plans')}>
                        <i className="fa fa-th-list fa-2x"/></motion.li>
                    <motion.li variants={variantsButtons}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.95 }}
                                   className='icon-placeholder'
                                   onClick={() => history.push('/editUser')}>
                        <i className="fa fa-cogs fa-2x"/></motion.li>
                    <LogOutButton/>
                </>
                : <motion.li variants={variantsButtons}
                                 whileHover={{ scale: 1.1 }}
                                 whileTap={{ scale: 0.95 }}
                                 className='icon-placeholder'
                                 onClick={()=>history.push('/home')}>
                    <i className="fa fa-user-plus fa-2x"/></motion.li>
            }
        </motion.ul>
    )
}
