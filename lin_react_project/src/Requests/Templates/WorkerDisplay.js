import React from 'react';
import {Link} from "react-router-dom";

export default function WorkerDisplay(props){

    //Validating if the input is an array or a single object
    let workerList;

    if(Array.isArray(props.info)){
        workerList = props.info.map((worker)=>{
            const address = `${worker.address || ' '} ${worker.city || ', '} ${worker.region || ', '} ${worker.country}`;
            const id = `${worker.wrkId}`;

            return <tr key={id}>
                <td>
                    <Link to={`/update-worker/${id}`}>
                        <button className={"btn btn-yellow btn-sm"}>Update</button>
                    </Link>
                </td>
                <td>{worker.wrkId}</td>
                <td>{worker.status}</td>
                <td>{worker.firstname + " " + (worker.midname === null? '' : worker.midname) + ", "+
                    worker.lastname + " " + (worker.lastname2 === null ? '' : worker.lastname2)}</td>
                <td>{worker.phone}</td>
                <td>{worker.cellphone === null ? "N/A" : worker.cellphone}</td>
                <td>{worker.email}</td>
                <td><p>{address}</p></td>
            </tr>
        });
    }
    else{
        const address = `${props.info.address || ' '} ${props.info.city || ', '} ${props.info.region || ', '} ${props.info.country}`;
        const id = `${props.info.wrkId}`;

        workerList = <tr key={id}>
            <td>
                <Link to={`/update-worker/${id}`}>
                    <button className={"btn btn-yellow btn-sm"}>Update</button>
                </Link>
            </td>
            <td>{props.info.wrkId}</td>
            <td>{props.info.status}</td>
            <td>{props.info.lastname + " " + (props.info.lastname2 === null ? '' : props.info.lastname2) + ", "+
                props.info.firstname + " " + (props.info.midname === null? '' : props.info.midname)}</td>
            <td>{props.info.phone}</td>
            <td>{props.info.cellphone === null ? "N/A" : props.info.cellphone}</td>
            <td>{props.info.email}</td>
            <td><p>{address}</p></td>
        </tr>;
    }

    return(
        <div>
            <h3 className={"form-head"}>Workforce Results</h3>
            <p>Please select a workforce member to proceed</p>
                <table className="table_results table table-hover table-bordered table-striped">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th>Action</th>
                        <th>Workforce ID</th>
                        <th>Status</th>
                        <th>Worker Name</th>
                        <th>Phone Number</th>
                        <th>Cell Number</th>
                        <th>Work Email</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workerList}
                    </tbody>
                </table>
        </div>
    );
}
