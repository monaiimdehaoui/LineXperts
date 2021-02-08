import React from 'react';
import {Link} from 'react-router-dom';

export default function ServiceDisplay(props){

    let serviceInfo;

    if(Array.isArray(props.info)){
        serviceInfo = props.info.map((service) =>{
            return(
                <tr key={service.serId}>
                    <td>
                        <Link to={`/update-service/${service.serId}`}>
                            <button className={"btn btn-yellow"}>Update</button>
                        </Link>
                    </td>
                    <td>{service.serviceName}</td>
                    <td>{service.serviceDescription}</td>
                    <td>{service.unit === null ? "N/A" : service.unit}</td>
                    <td>{service.tariff === null ? 0.00 : "$"+service.tariff.toFixed(2)}</td>
                </tr>
            )}
        );
    }
    else{
        serviceInfo = <tr key={props.info.serId}>
            <td>
                <Link to={`/update-service/${props.info.serId}`}>
                    <button className={"btn btn-yellow"}>Update</button>
                </Link>
            </td>
            <td>{props.info.serviceName}</td>
            <td>{props.info.serviceDescription}</td>
            <td>{props.info.unit === null ? "N/A" : props.info.unit}</td>
            <td>{props.info.tariff === null ? 0.00 : "$"+props.info.tariff.toFixed(2)}</td>
        </tr>
    }

    return(
        <div>
            <h3 className={"form-head"}>Service results List</h3>
            <p>Please select a service to proceed</p>
            <table className="table_results table table-hover table-bordered table-striped">
                <thead>
                <tr>
                    <th>Action</th>
                    <th>Service Name</th>
                    <th>Description</th>
                    <th>Unit Time Measure</th>
                    <th>Tarrif</th>
                </tr>
                </thead>
                <tbody>
                {serviceInfo}
                </tbody>
            </table>
        </div>
    );
}
