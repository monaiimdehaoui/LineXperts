import React, {Component} from 'react';
import EmptySearchMessage from "../FormComponents/EmptySearchMessage";
import WorkerDisplay from "./Templates/WorkerDisplay";
import ContractDisplay from "./Templates/ContractDisplay";

//Handle Contracts requests

export default class ContractHandler extends Component{

    //Component Variables
    constructor(props) {
        super(props);
        this.state = {
            contract_info: [],
            isLoading: true,
            request_state: false
        }
    };

    //Sending request for the backend
    componentDidMount(){
        let client_id = this.props.id;
        if(client_id === null){
            this.setState({request_state: true});
        }
        else{
            fetch(`http://localhost:8080/api/v1/ContractHeader/clientid/${client_id}`)
                .then(response => response.json())
                .then(data => {
                        if(typeof data.message !== "undefined")
                            this.setState({request_state:true, isLoading:false});
                        else
                            this.setState({contract_info: data,isLoading:false});
                    },
                    (error) => {
                        this.setState({request_state: true, isLoading:false});
                    });
        }
    };

    render(){

        const {isLoading, request_state, contract_info} = this.state;
        let result = <></>;

        //LOADING DIV
        if (isLoading) {
            result = <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }

        //ERROR HANDLING - Display an error if the fetch fails
        if(request_state){
            result = <EmptySearchMessage/>
        }

        //Display the contract's information
        if(!request_state && !isLoading){
            result = <ContractDisplay info={contract_info}/>
        }

        return (
            <>{result}</>
        );
    }
}

