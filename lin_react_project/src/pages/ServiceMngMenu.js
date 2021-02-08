import React, {Component} from "react";
import {Link} from "react-router-dom";

import {Formik, Form} from 'formik';
import {CustomNoLabelTextInput} from "../FormComponents/CustomFormInputs";
import ServiceJsonTable from "../Requests/ServiceJsonTable";

//Service Management Sub-Menu
export default class ServiceMngMenu extends Component{

    //Component state variables
    constructor(props) {
        super(props);
        this.state = {
            data:'',
            show_results: false
        };
    }

    //Resetting error messages and input values
    handleReset = () => {
        this.setState({show_results: false});
    };

    render(){
        const show_results = this.state.show_results;
        let table_display = <></>;

        //Displaying results
        if(show_results){
            table_display = <ServiceJsonTable entry={this.state.data}/>;
        }

        return(
            <Formik
                initialValues={{
                    ser_name_search:''
                }}

                validate={ values =>{
                    const errors={};
                    const formatName = /[!@#$%^&*()+_=\[\]{};:"\\|,.<>?]/;

                    if(!values.ser_name_search.trim()){
                        errors.ser_name_search = "Please enter a name";
                    }
                    else if(values.ser_name_search.trim().length > 50) {
                        errors.ser_name_search = "Exceed 50 characters max.";
                    }
                    else if (formatName.test(values.ser_name_search)){
                        errors.ser_name_search = "Symbols as '@' are not accepted";
                    }

                    return errors;
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values) =>{
                    this.setState({data:values.ser_name_search.trim(), show_results:true});
                }}>

                {(props, isSubmitting) =>(
                    <div className={"App-Holder col-lg-8 col-md-11"}>
                        <h2 className={"head-2"}>Service Management Menu</h2>

                        <p className={"mt-4"}>Search for a service by name here. Once found, the service can be updated</p>

                        <Form className={"mt-4 "} noValidate={true}>
                            <div className={"form-group col-6 p-0"}>
                                <CustomNoLabelTextInput message={"Service Name"} id={"ser_name_search"} name={"ser_name_search"}
                                disabled={isSubmitting || show_results}/>
                            </div>
                            <input type={"submit"} className={"btn btn-grey"} value={"Search"} disabled={isSubmitting || show_results}/>
                            <input type={"reset"} className={"btn btn-grey ml-2"} value={"Clear"} onClick={this.handleReset}/>
                        </Form>

                        <div className={"form-inline mt-5 mb-4"}>
                            <Link to={"/add-service"}><button className={"btn btn-yellow ml-1 btn-sm"}>Add new Service</button></Link>
                            <Link to={"/data-import"}><button className={"btn btn-orange ml-1 btn-sm"}>Import a file</button></Link>
                            <Link to={"/workforce-menu"}><button className={"btn btn-yellow ml-1 btn-sm"}>Got to Workforce Management</button></Link>
                        </div>
                        <hr/>
                        {table_display}
                    </div>
                )}
            </Formik>
        );
    };
}
