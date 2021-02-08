import React from 'react';
import {Link, useLocation} from "react-router-dom";

//404 page error
export default function PageNotFound(){
    let location = useLocation();

    return(
        <div className="App-Holder col-lg-8 col-md-11" style={{textAlign:"center"}}>
            <h2 className={"head-2"} style={{textAlign:"center"}}>--
                <span style={{color:"darkred"}}> 404 </span>
                -- Page not Found!</h2>

            <p style={{marginTop:"60px"}}>
                Seems the page you were searching: <code>{location.pathname}</code> is not available <wbr/>
                at the moment
            </p>

            <Link to={"/home"}>
                <button className={"btn btn-orange"} style={{marginTop:"30px"}}>
                    Return to Home Page
                </button>
            </Link>
        </div>
    );
}



