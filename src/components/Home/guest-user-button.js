import React from 'react';
import { useHistory } from 'react-router-dom';
import { CLASS } from "../../utils/enums";

export const GuestUserButton = () => {
    let history = useHistory()
    const goToPlans = () => history.push('/plans');

    return (<div>
                <br/>
                <button className={CLASS.linkedText}
                        aria-label='guest user'
                        onClick={ goToPlans }>
                    skip for now
                </button>
            </div>)
}

