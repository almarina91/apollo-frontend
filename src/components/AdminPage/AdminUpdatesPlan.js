import { usePlanContext } from "../../context/context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { CLASS, MESSAGE } from "../../utils/enums";


export const AdminUpdatesPlan = () => {
    const { plans, token, setFetchPlansAgain, reqUrl } = usePlanContext();
    const [selectedPlan, setSelectedPlan] = useState({});
    const [remove, setRemove]  = useState(false);
    const [message, setMessage]= useState(false)

    useEffect(()=>{
        if (remove){
            fetch(`${reqUrl}/plans/${selectedPlan._id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}
            })
                .then(res=>res.json())
                .then(()=>setRemove(false))
                .then(()=>setMessage(true))
                .then(()=> setFetchPlansAgain(true))
                .catch(e=>console.log(e))
        }
    }, [remove])

    return(
        <div>
            <DropdownButton id='dropdown-btn-admin-plan'
                            title={selectedPlan.englishName ? selectedPlan.englishName : MESSAGE.findPlan}>
                {plans.map(plan =>
                    <Dropdown.Item data-planID={plan._id}
                                   onSelect={()=>setSelectedPlan(plan)}>
                        {plan.englishName}
                    </Dropdown.Item>)}
            </DropdownButton>
            <br/>
            {message ? <span>plan removed</span> : null}
            <button className={CLASS.adminButtons}
                    onClick={()=>setRemove(true)}>
                remove selected plan
            </button>
        </div>
    )
}