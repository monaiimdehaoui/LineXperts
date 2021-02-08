import React from 'react';
import {Link} from "react-router-dom";
import './css/ClientContractMngMenu.css';

//Client and Contract Main Menu - Leads to the submenus
export default function ClientContractMngMenu(){
    return(
        <div className={"App-Holder container col-lg-8 col-md-11"}>
            <h2 className={"head-2"}>Client and Contract Management</h2>

            <h3>Select a menu to proceed</h3>

            <div className={"text-left mt-5 row"}>
                <div className={"col-sm-6 col-lg-4"}>
                    <Link to={"/client-menu"}><button id={"clt_contr_cltMenu"} className={"btn btn-orange m-2"}>Client Management Menu</button></Link>
                    <Link to={"/contract-menu"}><button id={"clt_contr_ContrMenu"} className={"btn btn-red m-2"}>Contract Management Menu</button></Link>
                    <Link to={"/addendum-menu"}><button id={"clt_contr_AddMenu"} className={"btn btn-yellow m-2"}>Addendum Management Menu</button></Link>
                </div>
                <div className={"col-sm-6 col-lg-4 "}>
                    <p>Access the data involving corporate groups and their respective clients</p>
                    <p>Manage and add new contracts</p>
                    <p>Create Addendum and assign services</p>
                </div>
            </div>
        </div>
    );
}
