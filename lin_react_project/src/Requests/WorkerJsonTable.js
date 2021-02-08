import React, {Component} from "react";
import EmptySearchResult from "../FormComponents/EmptySearchResult";
import WorkerDisplay from "./Templates/WorkerDisplay";
import "../App.css";

//Table displaying the search results and redirecting to update form
export default class WorkerJsonTable extends Component{

    //Component Variables
    constructor(props) {
        super(props);
        this.state = {
            worker_info: [],
            isLoading: true,
            request_state: false
        }
    };

    //Fetching data when the component is called to be used -- VERIFY CORS FROM SERVER_SIDE IF ERROR OCCURS
    componentDidMount() {

        let request_state = this.state.request_state;
        let kind = this.props.kind;
        let url;
        let search_id = "";
        let search_lastname = "";

        if(!kind || typeof kind === "undefined" || this.props === "undefined"){
            this.setState({request_state:true});
        }
        else {
            if (kind === "ID") {
                search_id = this.props.search_id;
                url = `http://localhost:8080/api/v1/workforce/${search_id}`;
            } else {
                search_lastname = this.props.search_lastName;
                url = `http://localhost:8080/api/v1/workforce/${search_lastname}`;
            }

            //Sending request to back-end - based on criterias used
            fetch(url)
                .then(response => response.json())
                .then(data => {
                        this.setState({worker_info: data}, ()=> {
                            if(typeof data.message !== "undefined")
                                request_state = true;

                            this.setState({isLoading:false, request_state:request_state});
                        });
                    },
                    (error) => {
                        this.setState({request_state: true});
                    });
        }
    }

    //resetting values when the component is "deleted"
    componentWillUnmount() {
        this.setState({worker_info:[], isLoading: false, result_state:false});
    }

    //Displaying result
    render() {

        const {isLoading, request_state, worker_info} = this.state;
        let result = <></>;

        //LOADING DIV
        if (isLoading) {
            result = <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }

        //ERROR DISPLAY
        if(request_state){
            if(this.props.search_id!== ""){
                result = <EmptySearchResult entry={this.props.search_id} searchEntity={"Workforce Member"}/>;
            }else{
                result = <EmptySearchResult entry={this.props.search_name +" "+ this.props.search_lastName} searchEntity={"Workforce Member"}/>;
            }
        }

        if(!isLoading && !request_state){
            result = <WorkerDisplay info={worker_info}/>
        }

        return (
            <>{result}</>
        );
    }
}
