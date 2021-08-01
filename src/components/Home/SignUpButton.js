import React from 'react';
import { usePlanContext } from "../../context/context";
import { CLASS, ICON } from "../../utils/enums";

export const SignUpButton = () => {
    const { setModalType } = usePlanContext()

    return (
        <button type="button"
                className={CLASS.buttonIntro}
                data-toggle="modal"
                data-target="#Modal"
                aria-label="sign up"
                onClick={()=> {setModalType('signUp')}}>
            <i className={ICON.userPlus}/>
        </button>
        )
}

