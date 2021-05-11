import React from 'react';
import { Header } from "../Header/Header";
import { PasswordChange } from "./PasswordChange";
import { LogOutAllDevices } from "./LogOutAllDevices";
import { DeleteAccount } from "./DeleteAccount";
import { EditUserData } from "./EditUserData";

export const EditUser = () => {
    return (
        <div className='editing'>
            <Header />
            <div className='edit-user'>
                <i className="fa fa-user fa-4x"/>
                <EditUserData />
            </div>
            <div>
                <div className='settings'>
                    <div><i className="fa fa-cog fa-4x"/></div>
                    <PasswordChange />
                    <LogOutAllDevices />
                    <DeleteAccount />
                </div>

            </div>
        </div>
    )
}

