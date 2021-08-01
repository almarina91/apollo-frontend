import React, { useState } from "react";
import { Header } from "../Header/Header";
import { AdminEditUser } from "./AdminEditUser";
import { AdminAddsPlan } from "./AdminAddsPlan";
import { AdminUpdatesPlan } from "./AdminUpdatesPlan";
import { CLASS, ICON } from "../../utils/enums";


export const AdminPage = () => {

    const [addPlan, setAddPlan] = useState(false);
    const [adminUpdatesPlan, setAdminUpdatesPlan]= useState(false)

    return(
        <div className={CLASS.adminPage}>
            <Header/>
            <h4 className={CLASS.adminTitle}><i className={ICON.lock}/></h4>
            <div>
                <AdminEditUser />
            </div>
            <div><i className={ICON.list}/></div>
            <div className={CLASS.adminPlans}>
                {addPlan ?
                    <div>
                        <AdminAddsPlan />
                        <button className={CLASS.adminButtons}
                                onClick={() => setAddPlan(false)}>
                            <i className={ICON.x}aria-hidden="true"/>
                        </button>
                    </div>
                    :
                    <button className={CLASS.adminButtons}
                            aria-label='add a new plan'
                            onClick={() => setAddPlan(true)}>
                        add a new plan
                    </button>
                    }
                <br/>
                {adminUpdatesPlan ?
                    <div>
                        <AdminUpdatesPlan />
                        <button className={CLASS.adminButtons}
                                aria-label='close'
                                onClick={() => setAdminUpdatesPlan(false)}>
                            <i className={ICON.x} aria-hidden="true"/>
                        </button>
                    </div>
                    :
                    <button className={CLASS.adminButtons}
                            aria-label='update a plan'
                            onClick={() => setAdminUpdatesPlan(true)}>
                        update a plan
                    </button>
                }
            </div>
        </div>
    )
}