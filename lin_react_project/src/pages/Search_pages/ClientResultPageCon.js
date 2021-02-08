import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {trackPromise} from "react-promise-tracker";
import ContractHandler from "../../Requests/ContractHandler";
import ClientInformationDisplay from "./ClientInformationDisplay";

//Page presenting client's information and contracts

export default class ClientResultPageCon extends Component{
    constructor(props) {
        super(props);
        this.state ={
            client_data:{},
            error_submit:"standing by"
        }
    };

    //Fetching request to get the client's name and information
    componentDidMount(){
        let chosen_client_id = this.props.match.params.id;

        trackPromise(
            fetch(`http://localhost:8080/api/v1/clients/id/${chosen_client_id}`)
                .then(response => response.json())
                .then(data => {
                    if (typeof data.message !== "undefined") {
                        this.setState({error_submit: "error"});
                    } else {
                        this.setState({client_data: data, error_submit:"success"});
                    }
                }).catch(error => {
                this.setState({error_submit: "error"});
            }));
    }

    render(){
        let {client_data, error_submit} = this.state;

        return(
            <div className="App-Holder col-lg-8 col-md-11">
                <h2 className={"head-2 mb-4"}>{client_data.contactFirstName ? client_data.contactFirstName
                : "Default"} {client_data.contactLastName ? client_data.contactLastName : "Name"}'s current contracts</h2>

                <ClientInformationDisplay info={client_data}/>

                {error_submit === "success" &&
                    <ContractHandler id={client_data.clientId}/>}

                    <div className={"row mt-5"}>
                        <Link to={`/add-contract/${client_data.clientId}`}>
                            <button className={"btn btn-sm ml-3 btn-red"}
                                    disabled={error_submit === "error" || error_submit === "standing by"}>
                                Add a New Contract
                            </button>
                        </Link>
                        <Link to={`/contract-menu`}>
                            <button className={"btn btn-sm ml-3 btn-orange"}>
                                Go Back to Menu
                            </button>
                        </Link>
                    </div>
                <hr className={"mt-3"}/>
            </div>
        );
    }
}
