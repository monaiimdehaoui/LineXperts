import React, {useState} from 'react';

export default function ClientInformationDisplay(props){

    //Since it's a function, must use React Hooks
    const [corpName, setCorpName] = useState("Not Found");
    const [corpStatus, setCorpStatus] = useState("Not Found");

    fetch(`http://localhost:8080//api/v1/clients/${props.info.clientId}/group_info`)
        .then(response => response.json())
        .then((data) =>{
            parseData(data);
        });

    //Displaying corporate group info
    function parseData(e){
        let values = e.toString().split(",");
        let corpName = values[0];
        let corpStatus = values[1];
        setCorpName(corpName);
        setCorpStatus(corpStatus);
    }

    //const for client's address
    const address = `${props.info.address || ' '} ${props.info.city || ', '} ${props.info.region || ', '} ${props.info.country}`;

    return(

        <div>
            <p className={"form-head"}>Client information</p>

            <div id="client_info">
                <p>Corporate Group: {corpName}</p>
                <p>Status: {corpStatus}</p>

                <hr/>
                <p>Client ID: {props.info.clientId}</p>
                <p>Client Name: {props.info.contactFirstName}  {props.info.contactLastName}</p>
                <p>Address: {address}</p>
                <p>Phone: {props.info.phone}</p>
                <p>Cellphone: {!props.info.cellphone? "N/A" : props.info.cellphone }</p>
                <p>Email: {!props.info.email? "N/A" : props.info.email}</p>
            </div>
        </div>
    );
}
