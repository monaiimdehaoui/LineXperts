import React, {Component} from "react";
import Tabs from "../Components/Tabs";
import {Link} from "react-router-dom";
import {Formik, Form} from 'formik';
import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import ClientCorpHandler from "../Requests/ClientCorpHandler";

export default class AddendumMngMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
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
                kind:""
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
                    search_type:"addendum",
                    clt_id_search:'',
                    clt_corp_search:''
                }}

                validate={(values) =>{
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};~':"\\|,.<>?]/;
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

                    this.setState({kind});
                    return errors;
                }}

                onSubmit={(values) =>{
                    console.log("Form submitted", values);
                    this.setState({show_results:true, search_inputs:values});
                }}>

                {({props, isSubmitting}) =>(
                    <div className={"App-Holder container col-lg-8 col-md-11"}>
                        <h2 className="head-2">Addendum Management Menu</h2>

                        <p>Search a client to view and modify its related addendums by contract</p>

                        <Form noValidate={true}>
                            <Tabs>
                                <div label={"By ID"}>
                                    <p>Search by ID</p>
                                    <div className={"col-8 p-0"}>
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
                                <Link to={"/heiufheriue"}><button className={"btn btn-yellow btn-sm ml-1 btn-info"}>View all addendum</button></Link>
                                <Link to={"/create-addendum"}><button className={"btn btn-red btn-sm ml-1 btn-info"}>Add new Addendum</button></Link>
                                <Link to={"/data-import"}><button className={"btn btn-red btn-sm ml-1 btn-info"}>Import a file</button></Link>
                            </div>
                        </div>
                        <hr/>
                        { show_results ? table_display : <></>}
                    </div>
                )}
            </Formik>
        );
    }
}
