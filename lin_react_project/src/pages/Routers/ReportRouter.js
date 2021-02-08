import React from 'react';
import {Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";

import ReportMainMenu from "../ReportMainMenu";
import TransactionalReports from "../TransactionalReports";

export default function ReportRouter(props){
    let {path, url} = useRouteMatch();

    return(
        <>
            <Switch>
                <Route exact path={path} component={ReportMainMenu}/>
                <Route path={`${url}/report-menu`} component={ReportMainMenu}/>
                <Route path={`${url}/transac`} component={TransactionalReports}/>
            </Switch>
        </>
    );
}
