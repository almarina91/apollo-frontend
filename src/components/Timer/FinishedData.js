import React from "react";
import { usePlanContext } from "../../context/context";
import getPathLength from 'geolib/es/getPathLength';

export const FinishedData = () => {
    const { totalIntervals, userData, coordinatesObject} = usePlanContext()

    const userWeightInKG = userData.weight || 70;

    const path = getPathLength(coordinatesObject);
    const caloriesBurned = path/1000 * userWeightInKG * 1.036;
    return (
        <div>
            <div className='finished-icons'><i className='fa fa-clock-o fa-2x'/></div>
            <p> {new Date(totalIntervals * 1000).toISOString().substr(14, 5)}</p>
            <div className='finished-icons'><i className='fa fa-arrows-h fa-2x'/></div>
            <p>{path/1000} km</p>
            <div className='finished-icons'><i className='fa fa-balance-scale fa-2x'/></div>
            <p>{caloriesBurned} kcal</p>
        </div>
    )
}