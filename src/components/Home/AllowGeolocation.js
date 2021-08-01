import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePlanContext } from "../../context/context";
import { CLASS, ICON } from "../../utils/enums";

const Switch = ({ isOn, ...rest }) => {
    const customClassName =
        `toggleSwitch ${isOn ? "on" : "off"}`;

    return (
        <div className={CLASS.geolocation}>
            <br/>
            <span className={CLASS.geolocationText}>allow location data</span>
            <motion.div animate className=
                {customClassName} {...rest}>
                <motion.div animate>
                    <i className={ICON.circle}/>
                </motion.div>
            </motion.div>
        </div>
    );
};

export const AllowGeolocation = () => {
    const [isOn, setIsOn] = useState(false);
    const { setStartingLat, setStartingLng } = usePlanContext();
    const [message, setMessage] = useState(false)

    useEffect(() => {
        // gets the first coordinate if geolocation allowed
        if (isOn){
            navigator.geolocation ?
                navigator.geolocation.getCurrentPosition(position => {
                setStartingLat(position.coords.latitude);
                setStartingLng(position.coords.longitude);})
            :
                setMessage(true)
        }
    }, [isOn]);

    return (
        <div>
            <Switch isOn={isOn}
                   onClick={() => setIsOn(!isOn)} />
            {message ? <div>geolocation not supported by your browser</div>: null}
        </div>);
};