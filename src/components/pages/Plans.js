import { usePlanContext } from '../../context/context'
import { Header } from "../Header/Header";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { variantsItems } from "../../utils/animationVariations";
import {CLASS} from "../../utils/enums";

export const Plans = () => {
    const {plans, userData, setCurrentPlan, token, setFinishedDays, fetchPlansAgain, setFetchPlansAgain, reqUrl } = usePlanContext();
    let history = useHistory();
    const languageProperty= userData.language? `${userData.language}Name`: 'englishName';
    const goToDays = (e) => {
        setCurrentPlan(plans[e.target.dataset.planIndex])
        history.push('./days')
    }
    useEffect(() => {
        //getting all finished days for a user
        fetch(`${reqUrl}/users/finishedDays`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` }
        })
            .then(res=>res.json())
            .then(data=> setFinishedDays(new Map(data.map(i => [i.dayID, i.userID]))))
            //fetching the plans again if admin updates them on admin page
            .then(()=>setFetchPlansAgain(false))
            .catch(e=>console.log(e))
    }, [fetchPlansAgain])
    return (
        <div className={CLASS.mainContainer}>
            <Header />
            <AnimatePresence>
                {plans.map((plan, index)=>
                    <motion.button variants={variantsItems}
                                   initial='hidden'
                                   animate='visible'
                                   aria-label={plan[languageProperty]}
                                   data-plan-index={index}
                                   className={CLASS.notFinished}
                                   onClick={e=>goToDays(e)}>{plan[languageProperty]}</motion.button>)}
            </AnimatePresence>
            </div>
    );
}