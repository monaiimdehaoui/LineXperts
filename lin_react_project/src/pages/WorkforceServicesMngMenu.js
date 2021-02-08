import React from 'react';
import {Link} from "react-router-dom";

//Workforce and Service Main Menu
export default function WorkforceServicesMngMenu(){
    return(
        <div className={"App-Holder container col-lg-8 col-md-11"}>
            <h2 className={"head-2"}>Workforce and Services Management</h2>
            <h4 className={"mt-4"}>Select a menu to proceed</h4>

            <div className={"text-left mt-5 row"}>
                <div className={"col-sm-6 col-lg-4"}>
                    <Link to={"/workforce-menu"}>
                        <button id={"wrk_ser_wrkMenu"}
                                className={"btn col-10 col-md-12 col-sm-12 btn-orange m-2"}>Workforce Management Menu
                        </button>
                    </Link>
                    <Link to={"/workforce-assign"}>
                        <button id={"wrk_ser_assignMenu"}
                                className={"btn col-10 col-md-12 col-sm-12 btn-red m-2"}>Assign Workforce to contracts &
                            addendum
                        </button>
                    </Link>
                    <Link to={"/service-menu"}>
                        <button id={"wrk_ser_serMenu"}
                                className={"btn col-10 col-md-12 col-sm-12 btn-yellow m-2"}>Service Management Menu
                        </button>
                    </Link>
                </div>
                <div className={"col-sm-6 col-lg-4"}>
                    <p className={"center"}></p>

                    <p>Add and view LineXperts workforce members information</p>
                    <p>Assign workforce members to contracts and addendum</p>
                    <p>View and modify LineXperts offered services</p>
                </div>
            </div>
        </div>
    );
}
