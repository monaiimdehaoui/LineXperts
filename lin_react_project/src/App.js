import React, {Component} from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Navigation from './Components/Navigation';
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './Components/css/component_style.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Links to redirect to different pages of the application

import Home from './pages/HomePage';
import DataImport from './pages/DataImport';

import ClientContractMngMenu from "./pages/ClientContractMngMenu";
import ClientMngMenu from "./pages/ClientMngMenu";
import ContractMngMenu from "./pages/ContractMngMenu";
import AddendumMngMenu from "./pages/AddendumMngMenu";

import U_ClientForm from "./Forms/U_ClientForm";
import C_ClientForm from "./Forms/C_ClientForm";
import C_CorpForm from "./Forms/C_CorpForm";
import U_CorpForm from "./Forms/U_CorpForm";
import C_ContractForm from "./Forms/C_ContractForm";
import U_ContractForm from "./Forms/U_ContractForm";
import C_AddendumForm from "./Forms/C_AddendumForm";

import ClientResultPageCon from "./pages/Search_pages/ClientResultPageCon";
import ClientResultPageAdd from "./pages/Search_pages/ClientResultPageAdd";

import C_workforceForm from "./Forms/C_workforceForm";
import U_workforceForm from "./Forms/U_workforceForm";
import C_serviceForm from "./Forms/C_serviceForm";
import U_serviceForm from "./Forms/U_serviceForm";

import WorkforceServicesMngMenu from "./pages/WorkforceServicesMngMenu";
import WorkforceMng from "./pages/WorkforceMng";
import WorkforceAssignMenu from "./pages/WorkforceAssignMenu";
import ServiceMngMenu from "./pages/ServiceMngMenu";

import ReportMainMenu from "./pages/ReportMainMenu";

import PageNotFound from "./pages/PageNotFound";

import testAPI from './Requests/testAPI';
import ReportRouter from "./pages/Routers/ReportRouter";

/*TUTORIEL -- https://developer.okta.com/blog/2018/07/19/simple-crud-react-and-spring-boot
* Advanced logic in React Router: https://reactrouter.com/web/example/url-params*/

//React Routes (all links) are implemented here
export default class App extends Component{
    render() {
        return (
            <div className="holder">
                <Header/>
                <Router>
                    <Navigation/>
                    <Switch>
                        <Route path={"/home"} component={Home}/>
                        <Route exact path={"/"} component={Home}/>
                        <Route path={"/data-import"} component={DataImport}/>

                        <Route path={"/client-contract-menu"} component={ClientContractMngMenu}/>

                        <Route path={"/client-menu"} component={ClientMngMenu}/>
                        <Route path={"/contract-menu"} component={ContractMngMenu}/>
                        <Route path={"/addendum-menu"} component={AddendumMngMenu}/>

                        <Route path={"/view/contract/:id"} component={ClientResultPageCon}/>
                        <Route path={"/view/addendum/:id"} component={ClientResultPageAdd}/>

                        <Route path={"/add-client/:corp_id"} component={C_ClientForm}/>
                        <Route path={"/update-client/:id"} component={U_ClientForm}/>
                        <Route path={"/add-corporate"} component={C_CorpForm}/>
                        <Route path={"/update-corporate/:id"} component={U_CorpForm}/>

                        <Route path={"/add-contract/1"} component={C_ContractForm}/>
                        <Route path={"/update-contract/:id"} component={U_ContractForm}/>
                        <Route path={"/add-addendum/:id"} component={C_AddendumForm}/>
                        <Route path={"/update-addendum/:id"} component={C_AddendumForm}/>

                        <Route path={"/wrk-ser-menu"} component={WorkforceServicesMngMenu}/>

                        <Route path={"/workforce-menu"} component={WorkforceMng}/>
                        <Route path={"/workforce-assign"} component={WorkforceAssignMenu}/>
                        <Route path={"/service-menu"} component={ServiceMngMenu}/>

                        <Route path={"/add-worker"} component={C_workforceForm}/>
                        <Route path={"/update-worker/:id"} component={U_workforceForm}/>
                        <Route path={"/add-service"} component={C_serviceForm}/>
                        <Route path={"/update-service/:id"} component={U_serviceForm}/>

                        <Route path={"/report"} component={ReportRouter}/>

                        <Route path={"/test-api"} component={testAPI}/>

                        <Route component={PageNotFound}/>

                    </Switch>
                    <Footer/>
                </Router>
            </div>
        );
    }
}

/*
* <Route path={"/report-menu"} component={ReportMainMenu}/>*/
