import React, {Component} from 'react';
import EmptySearchResult from "../FormComponents/EmptySearchResult";
import CorporateDisplay from './Templates/CorporateDisplay';
import ClientDisplay from './Templates/ClientDisplay';

export default class ClientCorpHandler extends Component{

    constructor(props) {
        super(props);
        this.state = {
            search_data: {},
            isLoading: true,
            request_state: false
        }
    }

    //Fetching results from the backend
    componentDidMount() {
        let url = "";
        const data = this.props.data;

        if(data.search_type === "client" || data.search_type === "contract" || data.search_type === "addendum"){
            if(data.clt_id_search !== "")
                url =`http://localhost:8080/api/v1/clients/id/${data.clt_id_search}`;
            else
                url =`http://localhost:8080/api/v1/clients/name/${data.clt_corp_search}`;
        }
        else if(data.search_type === "corporate"){
            if(data.corp_id_search !== "")
                url = `http://localhost:8080/api/v1/corp_group/id/${data.corp_id_search}`;
            else
                url =`http://localhost:8080/api/v1/corp_group/name/${data.corp_name_search}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data=>{
                if(data === null || typeof data.message !== "undefined" || data.length === 0){
                    this.setState({isLoading:false, request_state:true});
                }
                else{
                   this.setState({isLoading:false, search_data:data});
                }
            })
            .catch((error) =>{
                this.setState({isLoading:false, request_state:true});
            });
    }
    render(){

        const data = this.props.data;
        const search_type = this.props.data.search_type;
        const {isLoading, request_state, search_data} = this.state;
        let result = <></>;

        //Loading results
        if(isLoading){
            result = <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p>;
        }
        //If an error happens ->  handle it depending the search source
        if(request_state){
            if(search_type === "client"){
                result = <EmptySearchResult entry={data.clt_id_search === null ?
                    data.clt_corp_search : data.clt_id_search} searchEntity={"Client"}/>;
            }
            else if(search_type === "contract" || search_type === "addendum"){
                result = <EmptySearchResult entry={data.clt_id_search === null ?
                    data.clt_corp_search : data.clt_id_search} searchEntity={"Client"}/>;
            }
            else{
                result = <EmptySearchResult entry={data.corp_id_search === "" ?
                    data.corp_name_search : data.corp_id_search} searchEntity={"Corporate Group"}/>
            }
        }

        //If everything is fine
        if(!isLoading && !request_state){
            if(search_type === "client" || search_type === "contract" || search_type === "addendum")
                result = <ClientDisplay info={search_data} type={search_type}/>
            else
                result = <CorporateDisplay info={search_data}/>
        }

        //return the result
        return(
            <>{result}</>
        );
    }
}
