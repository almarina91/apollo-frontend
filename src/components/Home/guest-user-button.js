import React from 'react';
import { useHistory } from 'react-router-dom';
import { CLASS } from "../../utils/enums";

/**
 * A component that returns a button for guest user.
 */

export const GuestUserButton = () => {
    let history = useHistory()

    return (<div>
                <br/>
                <button className={CLASS.linkedText}
                        aria-label='guest user'
                        onClick={() => history.push('/plans')}>
                    skip for now
                </button>
            </div>)
}

