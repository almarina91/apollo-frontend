import { Header } from "../Header/Header";
import React, { Suspense } from "react";
import { usePlanContext } from "../../context/context";
import { FinishedData } from "./FinishedData";
import { AnimatePresence, motion } from 'framer-motion';
import { congrats, languageName, allowGeolocation } from "../../utils/translations";
import { variantsTitle } from "../../utils/animationVariations";

const Map = React.lazy(()=> import ('./Map'))

export const Finished = () => {
    const { userData } = usePlanContext()
    const language = userData.language || languageName.english;

    return (
        <div>
            <Header />
            <Suspense fallback={<div> Calculating results... </div>}>
            <AnimatePresence>
                {navigator.geolocation ?
                    <Map/>
                    :
                    <p>location not allowed!</p>
                }
                <motion.h1 variants={variantsTitle}
                           initial='hidden'
                           animate='visible'
                           className='finished-text'>
                    {congrats[language]}{userData.username ? `, ${userData.username}!` : `!`}
                </motion.h1>
                {navigator.geolocation
                    ?
                    <FinishedData />
                    :
                    <p>{allowGeolocation[language]}</p>
                }
            </AnimatePresence>
            </Suspense>
            </div>
    )
}