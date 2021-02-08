import React, {Component} from 'react';
import Tabs from "../Components/Tabs";
import {Link} from "react-router-dom";
import {Formik, Form, Field} from 'formik';
import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import ClientCorpHandler from '../Requests/ClientCorpHandler';

//Search Page for clients and corporate groups

export default class ClientMngMenu extends Component{
    constructor(props) {
        super(props);
        this.state={
            show_results:false,
            data:{}
        }
    }

    render(){

        const {show_results, data} = this.state;
        let table_results = <></>;
        if(show_results){
            table_results = <ClientCorpHandler data={data}/>
        }

        const handleReset = () => {
            this.setState({show_results:false});
        };

        return(
            <Formik
                enableReinitialize={true}

                //initial values
                initialValues={{
                    search_type:'client',
                    clt_id_search:'',
                    clt_corp_search:'',
                    corp_id_search:'',
                    corp_name_search:''
                }}

                //Settings so validation only happens in form submission
                validateOnBlur={false}
                validateOnChange={false}

                validate={(values) => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};':"\\|,.<>?]/;

                    //Depending the case, either the client id, corporate name,
                    //corporation id or name will be validated here
                    if(values.search_type === "client"){
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
                    }
                    else if(values.search_type==="corporate"){
                        if(!values.corp_name_search.trim()){

                            if (values.corp_id_search.trim().length > 30) {
                                errors.corp_id_search = "The ID should not be longer than 30 characters";
                            }
                            else if(!values.corp_id_search.trim()) {
                                errors.corp_id_search = "The field should not be empty";
                            }
                            else if (format.test(values.corp_id_search)){
                                errors.corp_id_search = "Symbols as '@' are not accepted";
                            }
                        }

                        if (!values.corp_id_search.trim()) {

                            if (!values.corp_name_search.trim()) {
                                errors.corp_name_search = "The field should not be empty";
                            }
                            else if (values.corp_name_search.length > 30) {
                                errors.corp_name_search = "Exceed 30 characters max.";
                            }
                            else if (format.test(values.corp_name_search)){
                                errors.corp_name_search = "Symbols as '@' are not accepted";
                            }
                        }
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    this.setState({show_results:true, data:values})
                }}>
                {({props, values, resetForm, isSubmitting}) => (
                    <div className={"App-Holder col-lg-8 col-md-11"}>
                        <h2 className={"head-2"}>Client and Corporate Group Management Menu</h2>

                        <Form className={"mt-4"} noValidate={true}>
                            <p className={"mt-4 mb-1"}>Select which category to search:</p>
                            <div role="group" aria-labelledby="my-radio-group" className={"form-check-inline form-check ml-3"} >
                                <label className={"control-radio control mr-3"}>
                                    <Field type="radio" name="search_type" value="client" className={"control control-radio"}
                                           onClick={resetForm} disabled={isSubmitting || show_results}/>
                                    <div className={"control_indicator"}></div>
                                    By Client
                                </label>
                                <label className={"control-radio control"}>
                                    <Field type="radio" name="search_type" value="corporate" className={"control control-radio"}
                                           onClick={resetForm} disabled={isSubmitting || show_results}/>
                                    <div className={"control_indicator"}></div>
                                    By Corporate
                                </label>
                            </div>

                            <p className={"mt-4"}> Search a {values.search_type} by....</p>
                            {values.search_type === "corporate" ? (
                                    <>
                                        <Tabs>
                                            <div label={"By ID"}>
                                                <p>Search By ID</p>
                                                <div className={"p-0 col-8"}>
                                                    <CustomNoLabelTextInput id={"corp_id_search"} name={"corp_id_search"}
                                                                            disabled={isSubmitting || show_results} message={"Corporate ID"}/>
                                                </div>
                                            </div>
                                            <div label={"By Name"}>
                                                <p>Search By Name</p>
                                                <div className={"col-8 p-0"}>
                                                    <CustomNoLabelTextInput id={"corp_name_search"} name={"corp_name_search"}
                                                                            disabled={isSubmitting || show_results} message={"Corporation Name"}/>
                                                </div>
                                            </div>
                                        </Tabs>
                                    </>
                                ):
                                (
                                    <>
                                        <Tabs>
                                            <div label={"By ID"}>
                                                <p>Search By ID</p>
                                                <div className={"p-0 col-8"} >
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
                                    </>
                                )}
                            <input type={"submit"} disabled={isSubmitting} className={"btn btn-sm btn-grey mr-2"} value={"Search"}/>
                            <input type={"reset"} className={"btn btn-sm btn-grey mr-2"} value={"Clear"} onClick={handleReset}/>
                        </Form>

                        <div className={"form-inline mt-5 mb-4"}>
                            <div className={"form-group"}>
                                <Link to={"/add-corporate"}><button className={"btn btn-yellow ml-1 btn-sm"}>Add a new corporate group</button></Link>
                                <Link to={"/data-import"}><button className={"btn btn-orange ml-1 btn-sm"}>Import a file</button></Link>
                            </div>
                        </div>

                        <hr className={"mb-4"}/>
                        {table_results }
                    </div>
                )}
            </Formik>
        );
    }
}
