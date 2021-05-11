import React from 'react';
import { usePlanContext } from "../../context/context";

export const SignUpButton = () => {
    const { setModalType } = usePlanContext()

    return (
        <button type="button"
                className="btn btn-intro"
                data-toggle="modal"
                data-target="#Modal"
                aria-label="sign up"
                onClick={()=> {setModalType('signUp')}}>
            <i className="fa fa-user-plus"/>
        </button>
        )
}

