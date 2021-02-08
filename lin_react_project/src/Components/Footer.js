import React from 'react';
import './css/component_style.css';
import {Link} from "react-router-dom";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="container">
                <ul className="list-group list-group-flush list-group-horizontal text-left" id="footerOpt">
                    <li className="text-right"><Link to={"/home"}>Home</Link></li>
                    <li className="text-right" style={{color:"whitesmoke"}}>Log Out</li>
                </ul>
            </div>
        </footer>
    );
}
