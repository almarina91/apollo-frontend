import React from 'react';
import { usePlanContext } from '../../context/context';
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from './SignInForm';

const type = {
    signIn: 'signIn',
    signUp: 'signUp'
}

export const Modal = () => {
    const { modalType } = usePlanContext();
    return (
        <div className="modal fade" id="Modal" tabIndex="-1" role="dialog"
             aria-labelledby="signInModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {modalType === type.signIn ?
                            <h5 className="modal-title" id="signInModalLongTitle">welcome back</h5>
                            :
                            <h5 className="modal-title" id="signInModalLongTitle">create an account</h5>}
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <br/>
                        <br/>
                        {modalType === type.signIn ? <SignInForm /> : <SignUpForm />}
                    </div>
                </div>
            </div>
        </div>
    )
}

