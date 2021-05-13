import React, { useEffect } from "react";
import { Header } from "../Header/Header";
import { usePlanContext } from "../../context/context";
import { useHistory } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import { run, walk, languageName } from "../../utils/translations";
import { variantsArrow } from "../../utils/animationVariations";

export const Intervals = () => {
    const { currentDayId, totalIntervals, setTotalIntervals, intervals, setIntervals, userData, reqUrl } = usePlanContext()
    let history = useHistory();
    const language = userData.language || languageName.english;

    // getting intervals of a selected day
    useEffect(() => {
        fetch(`${reqUrl}/intervals/${currentDayId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        })
            .then(res=>res.json())
            .then(data=> {
                setIntervals(data)
            })
            .catch(e=>console.log(e))
    }, [])

    // calculating total time
    useEffect(()=>{
        let total = 0;
        intervals.forEach(interval=> total= total + interval.seconds)
        setTotalIntervals(total)
    }, [intervals])

    return (
        <div className='main-container'>
            <Header />
            <AnimatePresence>
                <motion.button variants={variantsArrow}
                               initial='hidden'
                               animate='visible'
                               className='start-button'
                               onClick={()=>history.push('/timer')}><i className="fa fa-arrow-circle-right"/></motion.button>
                <p className='total-intervals'>
                    <i className='fa fa-clock-o'/> {new Date(totalIntervals * 1000).toISOString().substr(14, 5)}</p>
                {intervals.map(interval=>
                    (interval.type === 'run') ?
                        <p key={interval._id}>{run[language]}, {interval.seconds}</p> :
                        <p key={interval._id}>{walk[language]}, {interval.seconds}</p>
                )}
            </AnimatePresence>
        </div>
    );
}