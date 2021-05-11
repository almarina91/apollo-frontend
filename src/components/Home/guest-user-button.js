import React from 'react';
import { useHistory } from 'react-router-dom';

export const GuestUserButton = () => {
    let history = useHistory()
    const goToPlans = () => history.push('/plans');

    return (<div>
                <br/>
                <button className='linked-text'
                        aria-label='guest user'
                        onClick={ goToPlans }>
                    skip for now
                </button>
            </div>)
}

