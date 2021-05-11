import React, { useState } from "react";
import { Header } from "../Header/Header";
import { AdminEditUser } from "./AdminEditUser";
import { AdminAddsPlan } from "./AdminAddsPlan";
import { AdminUpdatesPlan } from "./AdminUpdatesPlan";


export const AdminPage = () => {

    const [addPlan, setAddPlan] = useState(false);
    const [adminUpdatesPlan, setAdminUpdatesPlan]= useState(false)

    return(
        <div className='admin-page'>
            <Header/>
            <h4 className='admin-title'><i className="fa fa-lock fa-3x"/></h4>
            <div>
                <AdminEditUser />
            </div>
            <div><i className="fa fa-list fa-2x "/></div>
            <div className='admin-plans'>
                {addPlan ?
                    <div>
                        <AdminAddsPlan />
                        <button className='admin-buttons'
                                onClick={() => setAddPlan(false)}>
                            <i className="fa fa-times" aria-hidden="true"/>
                        </button>
                    </div>
                    :
                    <button className='admin-buttons'
                            aria-label='add a new plan'
                            onClick={() => setAddPlan(true)}>
                        add a new plan
                    </button>
                    }
                <br/>
                {adminUpdatesPlan ?
                    <div>
                        <AdminUpdatesPlan />
                        <button className='admin-buttons'
                                aria-label='close'
                                onClick={() => setAdminUpdatesPlan(false)}>
                            <i className="fa fa-times" aria-hidden="true"/>
                        </button>
                    </div>
                    :
                    <button className='admin-buttons'
                            aria-label='update a plan'
                            onClick={() => setAdminUpdatesPlan(true)}>
                        update a plan
                    </button>
                }
            </div>
        </div>
    )
}