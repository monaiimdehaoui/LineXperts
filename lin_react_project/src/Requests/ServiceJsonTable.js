import React, {Component} from "react";
import EmptySearchResult from "../FormComponents/EmptySearchResult";
import ServiceDisplay from "./Templates/ServiceDisplay";

//Handling Service search request and error handling

export default class ServiceJsonTable extends Component{

    //Table Component state variables
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            isLoading: true,
            request_state: false,
            selected_id: null
        }
    }

    //Fetching services search result by name
    componentDidMount() {
        const service_name = this.props.entry;
        let {request_state} = this.state;

        fetch(`http://localhost:8080/api/v1/service/name/${service_name}`)
            .then(response =>  response.json())
            .then(data => {
                console.log("Data length", data.length);
                console.log("Data Null?", data === null);

                   if(data.length < 1 || data === null)
                      request_state = false;
                   else
                       request_state = true;

                    console.log("Fetching Data", data);
                    this.setState({services: data, isLoading: false, request_state: request_state});
                },
                (error) => {
                    this.setState({
                        result_state: false,
                        error
                    });
                }
            );
    };

    //resetting values when the component is "deleted"
    componentWillUnmount() {
        this.setState({services:[], isLoading: false, result_state:false});
    }

    render() {
        const {services, isLoading, request_state} = this.state;
        let result = <></>;

        if (isLoading) {
            result = <p className={"alert-info"} style={{padding: 10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }

        if (request_state) {
            result = <EmptySearchResult entry={this.props.entry} searchEntity={"Service"}/>
        }

        if (!isLoading && !request_state) {
            result = <ServiceDisplay info={services}/>;
        }
        return (
            <>
                {result}
            </>
        );
    }
}





