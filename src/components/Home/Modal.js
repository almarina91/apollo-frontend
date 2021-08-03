import React from 'react';
import { usePlanContext } from '../../context/context';
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from './SignInForm';
import { CLASS, MODAL_TYPE } from "../../utils/enums";

/**
 * A component that returns a form for sign up or sign in.
 */

export const Modal = () => {
    const { modalType } = usePlanContext();
    return (
        <div className={CLASS.modalFade}
             id="Modal" tabIndex="-1"
             role="dialog"
             aria-labelledby="signInModal"
             aria-hidden="true">
            <div className={CLASS.modalDialog}
                 role="document">
                <div className={CLASS.modalContent}>
                    <div className={CLASS.modalBody}>
                        {modalType === MODAL_TYPE.signIn ?
                            <h5 className={CLASS.modalTitle} id="signInModalLongTitle">welcome back</h5>
                            :
                            <h5 className={CLASS.modalTitle} id="signInModalLongTitle">create an account</h5>}
                        <button type="button" className={CLASS.close} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br/>
                        <br/>
                        {modalType === MODAL_TYPE.signIn ? <SignInForm /> : <SignUpForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

