import * as React from "react";
import { motion } from "framer-motion";
import { LogOutButton } from "../LogOutButton";
import { usePlanContext } from "../../../context/context";
import { useHistory } from "react-router-dom";
import { variantsButtons } from "../../../utils/animationVariations";
import { salutation, languageName } from "../../../utils/translations";
import {CLASS, ICON, ROLE} from "../../../utils/enums";

export const Navigation = () => {
    const { userData } = usePlanContext();
    let history = useHistory();
    const language = userData.language || languageName.english;

    return (
        <motion.ul>
            {userData.username ?
                <motion.li variants={variantsButtons}
                           className={CLASS.iconTitle}>{salutation[language]}, {userData.username}</motion.li>
                :
                <motion.li className={CLASS.iconTitle}
                           variants={variantsButtons}>Hello, user</motion.li>}
            {userData.username ?
                <>
                    {(userData.role === ROLE.admin) ?
                        <motion.li variants={variantsButtons}
                                       whileHover={{ scale: 1.1 }}
                                       whileTap={{ scale: 0.95 }}
                                       className={CLASS.icon}
                                       onClick={() => history.push('/admin')}>
                            <i className={ICON.lock2x}/></motion.li>
                        : null
                    }
                    <motion.li variants={variantsButtons}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.95 }}
                                   className={CLASS.icon}
                                   onClick={() => history.push('/plans')}>
                        <i className={ICON.listTh}/></motion.li>
                    <motion.li variants={variantsButtons}
                                   whileHover={{ scale: 1.1 }}
                                   whileTap={{ scale: 0.95 }}
                                   className={CLASS.icon}
                                   onClick={() => history.push('/editUser')}>
                        <i className={ICON.cogs2x}/></motion.li>
                    <LogOutButton/>
                </>
                : <motion.li variants={variantsButtons}
                                 whileHover={{ scale: 1.1 }}
                                 whileTap={{ scale: 0.95 }}
                                 className={CLASS.icon}
                                 onClick={()=>history.push('/home')}>
                    <i className={ICON.userPlus2x}/></motion.li>
            }
        </motion.ul>
    )
}
