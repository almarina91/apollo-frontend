import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { usePlanContext } from '../../context/context'
import { useHistory } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import { variantsItems } from "../../utils/animationVariations";
import { CLASS } from "../../utils/enums";


export const Days = () => {
    const { currentPlan, token, userData, setCurrentDayId, finishedDays, reqUrl } = usePlanContext()
    const planID = currentPlan._id;
    let history = useHistory();
    const [days, setDays] = useState([])
    const languageProperty= userData.language ? `${userData.language}Name`: 'englishName';

    //getting all days of a plan
    useEffect(() => {
     fetch(`${reqUrl}/days/${planID}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
        })
         .then(res=>res.json())
         .then(data=> {
             setDays(data)
         })
         .catch(e=>console.log(e))
    }, [])

    const goToIntervals = (e) => {
        setCurrentDayId(e.target.dataset.dayid)
        history.push('./intervals')
    }

    return (
        <div className={CLASS.mainContainer}>
            <Header />
            <AnimatePresence>
                {days.map(day =>
                    <motion.button variants={variantsItems}
                            initial='hidden'
                            animate='visible'
                            key={day._id}
                            aria-label={day[languageProperty]}
                            data-dayid={day._id}
                            className={userData.language && finishedDays.has(day._id) ? CLASS.finished : CLASS.notFinished}
                            onClick={e => goToIntervals(e)}>{day[languageProperty]}</motion.button>)
                }
            </AnimatePresence>
        </div>
    );
}