import React from 'react';
import {Link} from 'react-router-dom';

//Report Generation Main Menu
export default function ReportMainMenu(){
    return(
        <div className={"App-Holder container"}>
            <h2 className={"head-2"}>Report Generation Menu</h2>

            <h3>Select a menu to proceed</h3>

            <div className={" text-left mt-5 row"}>
                <div className={"col-sm-6 col-lg-4"}>
                    <Link to={"/report/transac"}>
                        <button className={"btn btn-yellow"}>Transactional Reports</button>
                    </Link>
                    <button className={"btn btn-orange"}>Service & Workforce Reports</button>
                    <button className={"btn btn-red"}>Performance & KPI Reports</button>
                </div>
                <div className={"col-sm-6 col-lg-4"}>
                    <p>Example</p>
                    <p>View the performance of the resource workforce members and services popularity.</p>
                    <p>view the performance</p>
                </div>
            </div>
        </div>
    );
}
