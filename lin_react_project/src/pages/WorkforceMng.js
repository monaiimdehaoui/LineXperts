import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Formik, Form} from 'formik';

import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import WorkerJsonTable from '../Requests/WorkerJsonTable';
import Tabs from "../Components/Tabs";

//Workforce Management Sub-Menu
export default class WorkforceMng extends Component{

    //Component variables
    constructor(props) {
        super(props);
        this.state= {
            data:{},
            show_results: false,
            kind: ""
        };
    };

    render(){

        //getting error messages from the state
        const {show_results, data} = this.state;
        let table_display = <></>;

        //Displaying search results
        if(show_results){
            table_display = <WorkerJsonTable search_id={data.wrkf_id_search}
                                             search_name= {data.wrkf_name_search}
                                             search_lastName= {data.wrkf_lastName_search}
                                             kind={this.state.kind}/>
        }

        //Handle capital letter validation in names
        const handleCapChar = (s) =>{
            let capital;
            if(!(typeof s === "undefined") && (typeof s === 'string')){
                capital = s.charAt(0).toUpperCase();
                if(s.charAt(0) === capital)
                    return true
            }
            return false;
        };

        //Resetting all variables
        const handleReset = () => {
            this.setState({
                show_results:false,
                kind:""
            });
        };

        return(
            <Formik
                enableReinitialize={true}

                //initial values
                initialValues={{
                    wrkf_id_search: '',
                    wrkf_name_search: '',
                    wrkf_lastName_search: '',
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                //Extra validation with custom Formik
                validate={ values => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};~':"\\|,.<>?]/;
                    const formatName = /[!@#$%^&*()+_=\[\]{};':"\\|,.<>?]/;

                    let kind = "";

                    if (!values.wrkf_id_search) {

                        if(!values.wrkf_lastName_search){
                            errors.wrkf_lastName_search = "Please enter a value";
                        }
                        else if (!handleCapChar(values.wrkf_lastName_search)) {
                            errors.wrkf_lastName_search = "The first letter should be capital";
                        }
                        else if(values.wrkf_lastName_search.length > 30) {
                            errors.wrkf_lastName_search = "Exceed 30 characters max.";
                        }
                        else if (formatName.test(values.wrkf_lastName_search)){
                            errors.wrkf_lastName_search = "Symbols as '@' are not valid";
                        }

                        if(!values.wrkf_name_search) {
                            errors.wrkf_name_search = "Please enter a value";
                        }
                        else if (!handleCapChar(values.wrkf_name_search)) {
                            errors.wrkf_name_search = "The first letter should be capital";
                        }
                        else if (values.wrkf_name_search.length > 30) {
                            errors.wrkf_name_search = "Exceed 30 characters max.";
                        }
                        else if (formatName.test(values.wrkf_name_search)){
                            errors.wrkf_name_search = "Symbols as '@' are not valid";
                        }
                        kind = "name";
                    }

                    if (!values.wrkf_name_search && !values.wrkf_lastName_search) {
                        if(!values.wrkf_id_search) {
                            errors.wrkf_id_search = "Please enter a value";
                        }
                        else if (values.wrkf_id_search.length > 30) {
                            errors.wrkf_id_search = "The ID should not be longer than 30 characters";
                        }
                        if (format.test(values.wrkf_id_search)){
                            errors.wrkf_id_search = "Only '-' and '_' special chars. are tolerated";
                        }
                        kind = "ID";
                    }
                    this.setState({kind});
                    return errors;
                }}

                onSubmit={(values) => {
                    this.setState({data:values},
                        () => this.setState({show_results:true}));
                }}>

                {({props, isSubmitting}) => (
                    <div className={"App-Holder col-lg-8 col-md-11"}>
                        <h2 className={"head-2"}>Workforce Management Menu</h2>

                        <p className={"mb-2"}>View a workforce member searching...</p>
                        <Form className={"mt-4"} noValidate>
                            <Tabs>
                                <div label={"By ID"}>
                                    <p>Search By ID</p>
                                    <div className={"w-50"}>
                                        <CustomNoLabelTextInput id={"wrkf_id_search"} name={"wrkf_id_search"} message={"Workforce ID"}
                                                                disabled={isSubmitting}/>
                                    </div>
                                </div>
                                <div label={"By Name"}>
                                    <p>Search By Name</p>

                                    <div className={"row"}>
                                        <div className={"col"}>
                                            <CustomNoLabelTextInput id={"wrkf_name_search"} name={"wrkf_name_search"}  message={"Workforce Name"} disabled={isSubmitting}/>
                                        </div>
                                        <div className={"col"}>
                                            <CustomNoLabelTextInput id={"wrkf_lastName_search"} name={"wrkf_lastName_search"} message={"Workforce Last Name"}
                                                                    disabled={isSubmitting}/>
                                        </div>
                                    </div>
                                </div>
                            </Tabs>

                            <input type={"submit"} disabled={isSubmitting} className={"btn btn-sm btn-grey mr-2 ml-2"} value={"Search"}/>
                            <input type={"reset"} className={"btn btn-sm btn-grey mr-2"} value={"Clear"} onClick={handleReset}/>
                        </Form>

                        <div className={"form-inline mt-5 mb-4"}>
                            <div className={"form-group"}>
                                <Link to={"/add-worker"}><button className={"btn btn-orange btn-sm"}>Add a New Workforce Member</button></Link>
                                <Link to={"/data-import"}><button className={"btn btn-red btn-sm ml-2"}>Import a file</button></Link>
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
