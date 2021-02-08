import React, {Component} from "react";
import Tabs from "../Components/Tabs";
import {Link} from "react-router-dom";
import {Formik, Form} from 'formik';
import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import ClientCorpHandler from "../Requests/ClientCorpHandler";

export default class ContractMngMenu extends Component{
    constructor(props) {
        super(props);
        this.state={
            show_results:false,
            search_inputs:{}
        }
    }

    render(){

        //Handle capital letter validation in names
        const handleCapChar = (s) =>{
            let capital;
            if(!(typeof s === "undefined") && (typeof s === 'string')){
                capital = s.charAt(0).toUpperCase();
                if(s.charAt(0) === capital)
                    return true
            }
            return false;
        }

        //Resetting all variables
        const handleReset = () => {
            this.setState({
                show_results:false,
                search_inputs:{}
            });
        };

        //getting error messages from the state
        const {show_results, search_inputs} = this.state;
        let table_display = <></>;
        if(show_results){
            table_display = <ClientCorpHandler data = {search_inputs}/>
        }

        return(

            <Formik
                enableReinitialize={true}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                initialValues={{
                    search_type:"contract",
                    clt_id_search:'',
                    clt_corp_search:''
                }}

                validate ={(values) => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};~':"\\|,.<>?]/;
                    const formatName = /[!@#$%^&*()+_=\[\]{};':"\\|,.<>?]/;
                    const numberFormat = new RegExp(/\d/);
                    let kind = "";

                    if (!values.clt_id_search.trim()){

                        if (!values.clt_corp_search.trim()) {
                            errors.clt_corp_search = "The field should not be empty";
                        }
                        else if (values.clt_corp_search.length > 40) {
                            errors.clt_corp_search = "Exceed 40 characters max.";
                        }
                        else if (format.test(values.clt_corp_search)){
                            errors.clt_corp_search = "Symbols as '@' are not accepted";
                        }
                    }

                    if (!values.clt_corp_search.trim()){

                        if (values.clt_id_search.trim().length > 30) {
                            errors.clt_id_search = "The ID should not be longer than 30 characters";
                        }
                        else if(!values.clt_id_search.trim()) {
                            errors.clt_id_search = "The field should not be empty";
                        }
                        else if (format.test(values.clt_id_search)){
                            errors.clt_id_search = "Symbols as '@' are not accepted";
                        }
                    }
                    this.setState({kind:kind});
                    return errors;
                }}

                onSubmit={(values)=>{
                    console.log("SUBMITTED", values);
                    this.setState({show_results:true, search_inputs:values});
                }}>

                {(props, values, isSubmitting) => (
                    <div className={"App-Holder col-lg-8 col-md-11"}>
                        <h2 className={"head-2"}>Contract Management Menu</h2>
                        <br/>
                        <p>Manage the clients' contracts here. You must search a client before adding or modifying the required contract.</p>

                        <Form noValidate={true}>
                            <Tabs>
                                <div label={"By ID"}>
                                    <p>Search by ID</p>
                                    <div className={"col-8 m-0 p-0"}>
                                        <CustomNoLabelTextInput id={"clt_id_search"} name={"clt_id_search"} message={"Client ID"}
                                                                disabled={isSubmitting || show_results}/>
                                    </div>
                                </div>
                                <div label={"By Name"}>
                                    <p>Search By Corporate Group Name</p>
                                    <div className={"col-8 p-0"}>
                                        <CustomNoLabelTextInput id={"clt_corp_search"} name={"clt_corp_search"} message={"Affiliate Corporation Name"}
                                                                disabled={isSubmitting || show_results}/>
                                    </div>
                                </div>
                            </Tabs>
                            <input type={"submit"} className={"btn btn-sm btn-grey "} value={"Search"} disabled={isSubmitting || show_results}/>
                            <input type={"reset"} className={"btn btn-sm btn-grey ml-2"} value={"Clear"} onClick={handleReset}/>
                        </Form>

                        <div className={"form-inline mt-5 mb-4"}>
                            <div className={"form-group"}>
                                <Link to={"/client-menu"}><button className={"btn btn-red ml-1 btn-sm"}>Add a New Client</button></Link>
                                <Link to={"/data-import"}><button className={"btn btn-orange ml-1 btn-sm"}>Import a file</button></Link>
                            </div>
                        </div>
                        <hr/>
                        {show_results ? table_display : <></>}
                    </div>
                )}
            </Formik>
        );
    }
}
