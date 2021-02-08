import React, {Component} from 'react';
import EmptySearchMessage from "../FormComponents/EmptySearchMessage";
import AddendumDisplay from "./Templates/AddendumDisplay";

//Will deliver the client's addendum
export default class AddendumHandler extends Component{

    //Component Variables
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            request_state:false,
            no_result:false,
            contract_list:[],
            contract_ids:[],
            contract_names:[],
            addendum_data:[]
        }
    };

    //sending initial fetch request to get list of contracts
    componentDidMount() {
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
                        else{
                            //this.getContractList(data)
                            this.setState({contract_list:data}, () =>{
                                this.fetchAddendums();
                            });
                        }
                    },
                    (error) => {
                        this.setState({request_state: true, isLoading:false});
                    });
        }
    };

    fetchAddendums = () =>{
        const {contract_list, addendum_data} = this.state;

        const getAdds = contract_list.map((con) =>{
            fetch(`http://localhost:8080/api/v1/ContractHeader/contractAddendum/${con.headerId}`)
                .then(response => response.json())
                .then(data =>{
                    addendum_data.push(data);
                })

                .catch(error => {
                this.setState({isLoading:false, request_state:true});
            });
        });
        this.setState({addendum_data, isLoading:false});
        console.log(addendum_data);
    };

    render(){

        const {isLoading, request_state, no_result, addendum_data} = this.state;
        let result = <></>;

        //LOADING DIV
        if (isLoading) {
            result = <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }

        if(request_state){
            result = <EmptySearchMessage/>;
        }

        if(no_result){
            result = <p>Sorry, the client has currently no contracts // add link for contract management page</p>;
        }

        //The display will handle the arrays
        if(!isLoading && !request_state){
            result = <AddendumDisplay info={addendum_data}/>;
        }

        return(
            <>{result}</>
        );
    };

}

