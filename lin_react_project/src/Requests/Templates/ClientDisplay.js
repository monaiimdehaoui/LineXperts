import React from 'react';
import {Link} from "react-router-dom";

//Table displaying client's information

export default function ClientDisplay(props){

    //Defining a different link depending which menu did the request
    let link;
    let text = "View";

    //Displaying single objects and arrays
    let clientList;

    console.log(props.type);


    if(Array.isArray(props.info)){
        clientList = props.info.map((client)=>{
            const address = `${client.address || ' '} ${client.city || ', '} ${client.region || ', '}
             ${client.country}`;

            if(props.type === "contract"){
                link = `/view/contract/${client.clientId}`;
            }
            else if(props.type === "addendum"){
                link = `/view/addendum/${client.clientId}`;
            }
            else{
                link = `/update-client/${client.clientId}`;
                text = "Update";
            }

            return <tr key={client.clientId}>
                <td>
                    <Link to={link}>
                        <button className={"btn btn-yellow btn-sm"}>{text}</button>
                    </Link>
                </td>
                <td><u>{client.nit}</u>: {client.clientId}</td>
                <td>{client.groupId}</td>
                <td>update this</td>
                <td>{client.contactFirstName + " " + client.contactLastName}</td>
                <td>{client.status}</td>
                <td>{client.officialName}</td>
                <td>{client.commercialName}</td>
                <td>{client.email  === null ? "N/A" : client.email}</td>
                <td>{client.phone}</td>
                <td>{client.cellphone === null ? "N/A": client.cellphone}</td>
                <td>{address}</td>
            </tr>;
        });

    }
    else{
        const address = `${props.info.address || ' '} ${props.info.city || ', '} ${props.info.region || ', '} ${props.info.country}`;
        const id = props.info.clientId;

        if(props.type === "contract"){
            link = `/view/contract/${id}`;
        }
        else if(props.type === "addendum"){
            link = `/view/addendum/${id}`;
        }
        else{
            link = `/update-client/${id}`;
            text = "Update";
        }

        clientList = <tr>
            <td>
                <Link to={link}>
                    <button className={"btn btn-yellow btn-sm"}>{text}</button>
                </Link>
            </td>
            <td><u>{props.info.nit}</u> : {id}</td>
            <td>{props.info.groupId}</td>
            <td>Update this</td>
            <td>{props.info.contactFirstName + ' ' + props.info.contactLastName}</td>
            <td>{props.info.status}</td>
            <td>{props.info.officialName}</td>
            <td>{props.info.commercialName}</td>
            <td>{props.info.email === null ? "N/A" : props.info.email}</td>
            <td>{props.info.phone}</td>
            <td>{props.info.cellphone === null ? "N/A": props.info.cellphone}</td>
            <td>{address}</td>
        </tr>;
    }

    return(
        <div>
            <h3 className={"form-head"}>Client Search Results</h3>
            <p>Please select a client to proceed</p>
            <table className="table table-hover table-bordered table-striped table_results">
                <thead className={"thead-dark"}>
                <tr>
                    <th>Action</th>
                    <th>Client ID</th>
                    <th>Corporate ID</th>
                    <th>Corporate Name</th>
                    <th>Client Name</th>
                    <th>Client Status</th>
                    <th>Company Official Name</th>
                    <th>Company Commercial Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Cellphone</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {clientList}
                </tbody>
            </table>
        </div>
    );
}
