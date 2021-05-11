import React, { createContext, useContext, useState, useEffect} from 'react';

export const PlanContext = createContext();

export const usePlanContext = () => useContext(PlanContext);

export function PlanProvider({children}) {
    // sign up or sign in modal
    const [modalType, setModalType] = useState('');

    // workouts data
    const [plans, setPlans] = useState([]);
    const [currentPlan, setCurrentPlan]= useState('');
    const [currentDayId, setCurrentDayId]= useState('');
    const [intervals, setIntervals] = useState([])
    const [totalIntervals, setTotalIntervals] = useState(0);

    // when admin updates plans
    const [fetchPlansAgain, setFetchPlansAgain] = useState(false)

    const [userData, setUserData] = useState({});
    const [finishedDays, setFinishedDays]= useState({});
    const [token, setToken] = useState('');

    // map data
    const [startingLng, setStartingLng] = useState(0);
    const [startingLat, setStartingLat] = useState(0);
    const [coordinatesArray, setCoordinatesArray]= useState([]);
    const [coordinatesObject, setCoordinatesObject]= useState([]);

    const requestUrl = process.env.NODE_ENV === 'development' ?
        'http://localhost:3001' :
        'https://almarina91-apollo-backend.herokuapp.com';

    // set request url (dev or production)
    const [reqUrl, setReqUrl] = useState(requestUrl)

    useEffect(() => {
        fetch(`${reqUrl}/plans`)
            .then(res => res.json())
            .then(data => setPlans(data))
            .catch(e => console.log(e))
        }, []);

    return (
        <PlanContext.Provider value={
            {plans,
            setPlans,
            currentPlan,
            setCurrentPlan,
            currentDayId,
            setCurrentDayId,
            userData,
            setUserData,
            modalType,
            setModalType,
            token,
            setToken,
            totalIntervals,
            setTotalIntervals,
            intervals,
            setIntervals,
            startingLat,
            setStartingLat,
            startingLng,
            setStartingLng,
            coordinatesArray,
            setCoordinatesArray,
            finishedDays,
            setFinishedDays,
            coordinatesObject,
            setCoordinatesObject,
            fetchPlansAgain,
            setFetchPlansAgain,
            reqUrl,
            setReqUrl
            }
        }>
            {children}
        </PlanContext.Provider>
    )
}