import React from 'react';
import { Header } from "../Header/Header";
import { PasswordChange } from "./PasswordChange";
import { LogOutAllDevices } from "./LogOutAllDevices";
import { DeleteAccount } from "./DeleteAccount";
import { EditUserData } from "./EditUserData";
import { CLASS, ICON } from "../../utils/enums";

export const EditUser = () => {
    return (
        <div className={CLASS.edit}>
            <Header />
            <div className={CLASS.editUser}>
                <i className={ICON.user4x}/>
                <EditUserData />
            </div>
            <div>
                <div className={CLASS.settings}>
                    <div><i className={ICON.settings}/></div>
                    <PasswordChange />
                    <LogOutAllDevices />
                    <DeleteAccount />
                </div>

            </div>
        </div>
    )
}

