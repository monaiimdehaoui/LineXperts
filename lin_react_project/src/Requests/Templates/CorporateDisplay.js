import React from 'react';
import {Link} from 'react-router-dom';

export default function CorporateDisplay(props){

    //Validating if the props are an array or a single object
    let corporate_list;

    if(Array.isArray(props.info)){

        corporate_list = props.info.map(((corp) => {
            const address = `${corp.groupAddr || ' '} ${corp.groupCity || ' '} ${corp.groupRegion || ' '}
            ${corp.groupCountry}`;

            return <tr key={corp.groupID}>
                <td>
                    <Link to={`/update-corporate/${corp.groupID}`}>
                        <button className={"btn btn-yellow btn-sm"}>Update</button>
                    </Link>
                </td>
                <td>
                    <Link to={`/add-client/${corp.groupID}`}>
                        <button disabled={corp.groupStatus === "Inactivo"} className={"btn btn-yellow btn-sm"}>Add Client</button>
                    </Link>
                </td>
                <td><u>{corp.official_id}</u>: {corp.groupID}</td>
                <td>{corp.groupName}</td>
                <td>{corp.groupStatus === null? 'N/A' : corp.groupStatus}</td>
                <td>{corp.groupPhone}</td>
                <td>{corp.email}</td>
                <td><p>{address}</p></td>
            </tr>;
        }));
    }
    else{
        const address = `${props.info.groupAddr || ' '} ${props.info.groupCity || ' '} ${props.info.groupRegion || ' '}
            ${props.info.groupCountry}`;
        const id = `${props.info.groupID}`;

        corporate_list = <tr key={id}>
            <td>
                <Link to={`/update-corporate/${id}`}>
                    <button className={"btn btn-yellow btn-sm"}>Update</button>
                </Link>
            </td>
            <td>
                <Link to={`/add-client/${id}`}>
                    <button disabled={props.info.groupStatus === "inactive"} className={"btn btn-yellow btn-sm"}>Add Client</button>
                </Link>
            </td>
            <td><u>{props.info.official_id}</u>: {id}</td>
            <td>{props.info.groupName}</td>
            <td>{props.info.groupStatus === null? 'N/A' : props.info.groupStatus}</td>
            <td>{props.info.groupPhone}</td>
            <td>{props.info.email}</td>
            <td><p>{address}</p></td>
        </tr>;
    }

    return(
        <div>
            <h3 className={"form-head"}>Corporate Search Results</h3>
            <p>Please select a Corporate to proceed</p>
            <table className="table_results table table-hover table-bordered table-striped">
                <thead className={"thead-dark"}>
                <tr>
                    <th>Action</th>
                    <th>Action</th>
                    <th>Corporate ID</th>
                    <th>Corporate Name</th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {corporate_list}
                </tbody>
            </table>
        </div>
    );
}
