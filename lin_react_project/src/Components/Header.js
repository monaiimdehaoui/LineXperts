import React from 'react';
import './css/component_style.css';
import logo from './logoLinexperts.png';

export default function Header(){
    return(
        <header className={"p-2 float-right"}>
            <div className={"text-center col-lg-11 col-md-12 m-auto"}>
                <div className="page-header">
                    <img src={logo} id={"lin_logo"} className={"float-left ml-5"} alt={"LineXperts Logo"}/>
                    <ul className="list-group list-group-flush list-group-horizontal float-right" id="headerOpt">
                        <li className="text-right first-li">Welcome, <a href="#">John Smith</a></li>
                        <li className="text-right"><a href="#">Log Out</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
