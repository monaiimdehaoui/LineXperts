import React, {Component} from "react";
import EmptySearchResult from "../FormComponents/EmptySearchResult";
import {Link} from "react-router-dom";

export default class WorkerAssignTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
            isLoading: true
        }
    }

    componentDidMount() {

        /*
                let head = new Headers();
                let myInit = {
                  method: "GET",
                  headers:head,
                  mode:'cors'
                };

                let myRequest = new Request("http://localhost:8080/linexpertsApp/workforceList", myInit);
        */

        //REQUEST TO BE UPDATED
        fetch("http://localhost:8080/linexpertsApp/workforceList")
            .then(response =>  response.json())
            .then(data => {
                    this.setState({workers: data, isLoading: false, result_state: false});
                },
                (error) => {
                    this.setState({
                        result_state: true,
                        error
                    });
                }
            );
    }

    componentWillUnmount() {
        this.setState({workers:[], isLoading: false, result_state:false});
    }

    render() {

        const {workers, isLoading, result_state} = this.state;
        let result = null;

        if (isLoading) {
            result = <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }

        if(result_state || workers === "null"){
            return <div className={"alert_div"}>
                <p>Sorry, there is not available workforce <wbr/> member at the moment.</p>
            </div>;
        }

        const workersList = workers.map(worker => {
                if(worker.wrk_status === 'With non-remunerated license' ||
                worker.wrk_status === 'With remunerated license')
                {
                    const address = `${worker.wrk_address || ' '} ${worker.wrk_city || ' '} ${worker.wrk_region || ' '} ${worker.wrk_country}`;
                    const id = `${worker.wrk_id}`;
                    return <tr key={id}>
                        <td>{id}</td>
                        <td>{worker.wrk_firstname}</td>
                        <td>{worker.wrkf_midname}</td>
                        <td>{worker.wrk_lastname}</td>
                        <td>{worker.wrk_sc_lastname}</td>
                        <td>{worker.wrk_phone_no}</td>
                        <td>{worker.wrk_cell_no}</td>
                        <td>{worker.wrk_corp_email}</td>
                        <td>{address}</td>
                        <td>{worker.wrk_status}</td>
                        <td>
                            <input type={"checkbox"} id={"assign_wrk_id"} name={"assign_wrk_id"} value={id} />
                        </td>
                    </tr>
                }
                return false;
            });

        if(!isLoading && !result_state)
        {
            result = <div>
                {result}
                <div className="float-right">
                </div>
                <h3 className={"form-head"}>Workforce Results</h3>
                <table className="mt-4 table_results">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Second Name</th>
                        <th>Phone Number</th>
                        <th>Cell Number</th>
                        <th>Work Email</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workersList}
                    </tbody>
                </table>
                <input type={"submit"} value={"Assign Resources"} className={"btn btn-red btn-sm"}/>
            </div>;
        }

        return (
            <>
                {result}
            </>
        );
    }
}





