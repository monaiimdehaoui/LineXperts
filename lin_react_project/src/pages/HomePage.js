import React from "react";
import {Link} from "react-router-dom";
import './css/HomePage.css';

//Code for the home page
export default function Home(){

    return(
        <div className="App-Holder col-lg-8 col-md-11">

            <div className="jumbotron jumbotron-fluid w-100 p-4" id={"menu-jumbo"}>
                <div className="container">
                    <h1 id={'appTitle'}>LineXperts Contract & Client Management Application</h1>
                    <p className="mt-3 lead">Please proceed to one of the following menus:</p>
                </div>
            </div>
            <div className={"pt-5 text-center"}>
                <Link to={"/client-contract-menu"}>
                    <button type="button" className="btn btn-yellow m-2" id="cltMainMenubtn">
                        Client and Contract<br/>Management Menu
                    </button>
                </Link>
                <Link to={"/report/report-menu"}>
                    <button className="btn btn-red m-2 ml-lg-5" id="reportMainMenuBtn">
                        Report Generation <br/> Menu
                    </button>
                </Link>
                <Link to={"/wrk-ser-menu"}><button type="button" className="btn btn-orange m-2 ml-lg-5" id="wrkMainMenuBtn">
                    Workforce and Service <br/> Management Menu
                </button>
                </Link>
            </div>
        </div>
    );
}
