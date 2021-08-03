import { Header } from "../Header/Header";
import React, { Suspense } from "react";
import { usePlanContext } from "../../context/context";
import { FinishedData } from "./FinishedData";
import { AnimatePresence, motion } from 'framer-motion';
import { congrats, languageName, allowGeolocation } from "../../utils/translations";
import { variantsTitle } from "../../utils/animationVariations";
import { CLASS } from "../../utils/enums";

/**
 * A component that returns a page that shows when a training is finished.
 */

export const Finished = () => {
    const { userData } = usePlanContext()
    const language = userData.language || languageName.english;

    return (
        <div className={CLASS.mainContainer}>
            <Header />
            <Suspense fallback={<div> Calculating results... </div>}>
            <AnimatePresence>
                <motion.h1 variants={variantsTitle}
                           initial='hidden'
                           animate='visible'
                           className={CLASS.finishedText}>
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