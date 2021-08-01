import React from "react";
import { usePlanContext } from "../../context/context";
import getPathLength from 'geolib/es/getPathLength';
import { CLASS, ICON } from "../../utils/enums";

export const FinishedData = () => {
    const { totalIntervals, userData, coordinatesObject} = usePlanContext()

    const userWeightInKG = userData.weight || 70;

    const path = getPathLength(coordinatesObject);
    const caloriesBurned = path/1000 * userWeightInKG * 1.036;
    return (
        <div>
            <div className={CLASS.finishedIcons}>
                <i className={ICON.clock2x}/>
            </div>
            <p> {new Date(totalIntervals * 1000).toISOString().substr(14, 5)}</p>
            <div className={CLASS.finishedIcons}><i className={ICON.arrowH}/></div>
            <p>{path/1000} km</p>
            <div className={CLASS.finishedIcons}><i className={ICON.scale2x}/></div>
            <p>{caloriesBurned} kcal</p>
        </div>
    )
}