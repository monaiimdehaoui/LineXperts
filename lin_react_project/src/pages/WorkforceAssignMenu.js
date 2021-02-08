import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Formik, Form} from 'formik';

import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import Tabs from "../Components/Tabs";
import ClientCorpHandler from "../Requests/ClientCorpHandler";

export default class WorkforceAssignMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show_results:false,
            data:{}
        };
    };

    render(){

        //constants
        const {show_results, data} = this.state;

        //Displaying results
        let table_results = <></>;
        if(show_results){
            table_results = <ClientCorpHandler data={data}/>
        }

        //Validating Capital letters in names
        const handleCapChar = (s) =>{
            let valid = false;
            if(!(typeof s === "undefined") && (typeof s === 'string')){
                const capital = s.charAt(0).toUpperCase();
                if(s.charAt(0) === capital){
                    valid = true;
                }
            }
            return valid;
        };

        //Erasing results when resetting search
        const handleReset = () => {
            this.setState({show_results:false});
        };

        return(
            <Formik
                enableReinitialize={true}

                initialValues={{
                    search_type:'contract',
                    clt_id_search:'',
                    clt_corp_search:''
                }}

                //Settings so validation only happens in form submission
                validateOnBlur={false}
                validateOnChange={false}

                //Custom Validation
                validate={(values) => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};':"\\|,.<>?]/;

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
                    return errors;
                }}

                onSubmit={(values) => {
                    this.setState({show_results:true, data:values})
                }}>

                {({props, isSubmitting}) => (
                    <div className={"App-Holder col-lg-8 col-md-11"}>
                    <h2 className={"head-2"}>Workforce Assignment Menu</h2>

                    <Form className={"mt-4"} noValidate={true}>
                        <Tabs>
                            <div label={"By ID"}>
                                <p>Search By ID</p>
                                <CustomNoLabelTextInput id={"clt_id_search"} name={"clt_id_search"} message={"Client ID"}
                                                        disabled={isSubmitting || show_results}/>
                            </div>

                            <div label={"By Name"}>
                                <p>Search By Corporate Group Name</p>
                                <div className={"col-8 p-0"}>
                                    <CustomNoLabelTextInput id={"clt_corp_search"} name={"clt_corp_search"} message={"Affiliate Corporation Name"}
                                                            disabled={isSubmitting || show_results}/>
                                </div>
                            </div>
                        </Tabs>
                        <input type={"submit"} className={"btn btn-sm btn-grey mr-2"} value={"Search"} disabled={isSubmitting || show_results}/>
                        <input type={"reset"} className={"btn btn-sm btn-grey mr-2"} value={"Clear"} onClick={handleReset}/>
                    </Form>

                    <div className={"form-inline mt-5 mb-4"}>
                        <div className={"form-group"}>
                            <Link to={"/workforce-menu"}><button className={"btn btn-sm btn-yellow"}>Go to Workforce Management</button></Link>
                            <Link to={"/data-import"}><button className={"btn btn-orange btn-sm ml-2"}>Import a file</button></Link>
                        </div>
                    </div>

                    <hr className={"mb-4"}/>
                        {table_results}
                </div>
            )}
            </Formik>
        );
    }
}

