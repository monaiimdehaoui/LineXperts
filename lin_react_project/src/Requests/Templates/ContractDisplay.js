import React from 'react';
import {Link} from 'react-router-dom';

export default function ContractDisplay(props){

    let contractList;

    if(props.info.length < 1 || props.info === null){
        contractList = <td colSpan={9} style={{textAlign:"center"}} key={14}>
            The client has no contracts yet
        </td>
    }
    else if(Array.isArray(props.info)) {
        contractList = props.info.map((contract) => {
            return <tr key={contract.headerId}>
                <td>
                    <Link to={`/update-contract/${contract.headerId}`}>
                        <button className={"btn btn-yellow"}
                                disabled={props.info.contractStatus === "Closed"}>
                            Update
                        </button>
                    </Link>
                </td>
                <td>{contract.headerId}</td>
                <td>{contract.contractStatus}</td>
                <td>{contract.startDate}</td>
                <td>{contract.endDate === null ? "N/A" : contract.endDate}</td>
                <td>{contract.closureDate === null ? "N/A" : contract.closureDate}</td>
                <td>{!contract.sentRUP ? "No" : "Yes"}</td>
                <td>{contract.dateSentRUP === null ? "N/A" : contract.dateSentRUP}</td>
                <td style={{textAlign: "center"}}>
                    {contract.description ? props.info.description :
                        "Not described yet"}
                </td>
            </tr>;
        });
    }
    else{
        contractList =
            <tr key={props.info.headerId}>
                <td>
                    <Link to={`/update-contract/${props.info.headerId}`}>
                        <button className={"btn btn-yellow"}
                        disabled={props.info.contractStatus === "Closed"}>
                            Update
                        </button>
                    </Link>
                </td>
                <td>{props.info.headerId}</td>
                <td>{props.info.contractStatus}</td>
                <td>{props.info.startDate}</td>
                <td>{props.info.endDate === null ? "N/A" : props.info.endDate}</td>
                <td>{props.info.closureDate === null ? "N/A" : props.info.closureDate}</td>
                <td>{!props.info.sentRUP ? "No" : "Yes"}</td>
                <td>{props.info.dateSentRUP === null ? "N/A" : props.info.dateSentRUP}</td>
                <td style={{textAlign:"center"}}>
                    {props.info.description ? props.info.description:
                        "Not described yet"}
                </td>
            </tr>;
    }

    return(
        <div>
            <h3 className={"form-head"}>Contract Results</h3>
            <table className="table_results scrollbar table table-hover table-bordered table-striped">
                <thead className={"thead-dark"}>
                    <tr>
                        <th>Action</th>
                        <th>Contract ID</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Closure Date</th>
                        <th style={{wordWrap:"break-word", whiteSpace:"nowrap"}}>Send to RUP?</th>
                        <th style={{wordWrap:"break-word", whiteSpace:"nowrap"}}>Date sent to RUP</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                {contractList}
                </tbody>
            </table>
        </div>
    );
}
