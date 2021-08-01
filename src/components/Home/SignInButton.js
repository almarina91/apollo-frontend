import React from 'react';
import { usePlanContext } from "../../context/context";
import { CLASS, ICON } from "../../utils/enums";

export const SignInButton = () => {
    const { setModalType } = usePlanContext()
    return (
        <button type="button"
                className={CLASS.buttonIntro}
                data-toggle="modal"
                data-target="#Modal"
                aria-label="sign in"
                onClick={()=>setModalType('signIn')}>
            <i className={ICON.user}/>
        </button>
)
}
