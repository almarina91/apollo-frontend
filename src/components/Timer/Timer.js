import React, { useState, useEffect } from 'react';
import { Header } from "../Header/Header";
import { usePlanContext } from "../../context/context";
import { ProgressBar } from "react-bootstrap";
import useSound from 'use-sound';
import workoutCountdown from '../../assets/workout_countdown_haptic.mp3';
import { useHistory } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { variantsItems } from "../../utils/animationVariations";
import { run, walk, languageName } from "../../utils/translations";

export const Timer = ()=> {
    const [shouldPlay, setShouldPlay] = useState(false)
    const { totalIntervals,
        intervals,
        userData,
        currentDayId,
        token,
        coordinatesArray,
        setCoordinatesArray,
        coordinatesObject,
        setCoordinatesObject,
        reqUrl
        } = usePlanContext()

    const [timeLeft, setTimeLeft] = useState(totalIntervals)
    const totalTimePercentage = Math.floor((totalIntervals-timeLeft)/totalIntervals*100)

    const [currentInterval, setCurrentInterval] = useState(intervals[0])
    const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
    const [currentIntervalTime, setCurrentIntervalTime] = useState(currentInterval.seconds)
    const intervalPercentage = Math.floor(((currentInterval.seconds - currentIntervalTime)/currentInterval.seconds *100))
    const language = userData.language || languageName.english;
    const [play]= useSound(workoutCountdown)
    let history = useHistory();

    useEffect(()=>{
        // reduces time that is left for 1 sec each sec
        if(shouldPlay && timeLeft > 0){
            setTimeout(() => {
                    setTimeLeft(timeLeft - 1)
                },
                1000)
        // when time is up, if there is user, saves in db finished day
        } else if ( timeLeft === 0) {
            fetch(`${reqUrl}/users/finishedDay/${currentDayId}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
                .then(res => res.json())
                .then(()=> history.push('/finishedDay'))
                .catch(e => console.log(e))
        }
        if (timeLeft%10 === 0) {
            navigator.geolocation.getCurrentPosition(position => {
                let currentArray=[position.coords.longitude, position.coords.latitude];

                let currentObject = {latitude: position.coords.latitude, longitude: position.coords.longitude};

                let newArray = coordinatesArray
                newArray.push(currentArray)
                setCoordinatesArray(newArray)

                let temp = coordinatesObject
                temp.push(currentObject)
                setCoordinatesObject(temp);
            })
        }
        },[shouldPlay, timeLeft])

    useEffect(()=>{
        // reduces the time of a current interval
        if(shouldPlay && currentIntervalTime > 0){
            setTimeout(() => {
                    setCurrentIntervalTime(currentIntervalTime - 1)
                },
                1000)
        // when interval is finished, goes to next interval
        } else if (shouldPlay && currentIntervalTime === 0 ){
            setCurrentIntervalIndex(currentIntervalIndex+1)
        }
        // plays tone on last 3 seconds
        if(currentIntervalTime === 3){
            play()
        }
    }, [shouldPlay, currentIntervalTime])


    useEffect(() => {
        // changes current interval
        if (shouldPlay && currentIntervalIndex < intervals.length){
            setCurrentInterval(intervals[currentIntervalIndex])
            setCurrentIntervalTime(intervals[currentIntervalIndex].seconds)
        }
    }, [currentIntervalIndex])

    return(
        <div>
            <Header />
            <div className='timer'>
                <AnimatePresence>
                {(currentInterval.type === 'run') ?
                    <motion.h2  variants={variantsItems}
                                 initial='hidden'
                                 animate='visible'
                                 className='interval-type'>{run[language]}</motion.h2> :
                    <motion.h2  variants={variantsItems}
                                 initial='hidden'
                                 animate='visible'
                                 className='interval-type'>{walk[language]}</motion.h2>}
                </AnimatePresence>
                <div className="time">{new Date(currentIntervalTime * 1000).toISOString().substr(14, 5)}</div>
                <div>
                    <button className='timer-button'
                            aria-label='play pause'
                            onClick={()=>setShouldPlay(!shouldPlay)}>
                        {shouldPlay?<i className="fa fa-pause"/>:<i className="fa fa-play"/>}
                    </button>
                </div>
                <p className='timer-intervals'>{currentIntervalIndex+1}/{intervals.length}</p>
                <ProgressBar striped variant="warning" now={intervalPercentage} />
                <br/>
                <span className='timer-intervals'><i className='fa fa-clock-o'/> {new Date(timeLeft * 1000).toISOString().substr(14, 5)}</span>
                <ProgressBar  striped animated variant='success' now={totalTimePercentage}/>
            </div>
        </div>
    )
}