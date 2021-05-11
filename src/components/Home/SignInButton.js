import React from 'react';
import { usePlanContext } from "../../context/context";

export const SignInButton = () => {
    const { setModalType } = usePlanContext()
    return (
        <button type="button"
                className='btn btn-intro'
                data-toggle="modal"
                data-target="#Modal"
                aria-label="sign in"
                onClick={()=>setModalType('signIn')}>
            <i className="fa fa-user"/>
        </button>
)
}
