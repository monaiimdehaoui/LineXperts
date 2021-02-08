import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './css/form_styles.css';
import ConStatus from '../Data/contract_status.json';
import {Form, Formik, Field} from 'formik';

//Customized fields
import {
    CustomSelectInput,
    CustomTextInput,
    CustomTextAreaInput, CustomDateInput
} from "../FormComponents/CustomFormInputs";
import {SuccessMessage, FailureMessage} from "../FormComponents/FormSubmissionMessages";
import * as Yup from "yup";

export default class c_ContractForm extends Component{

    //Component state variables
    constructor(props) {
        super(props);
        this.state = {
            error_submit: "standing by"
        };
    };

    componentDidMount() {
        //validate if this.props.match.params.id is null or not
        if(this.props.match.params.id === null || typeof this.props.match.params.id === "undefined"){
            this.setState({error_submit:"id_err"});
        }
    }

    render() {

        let {error_submit} = this.state;
        let message = <></>;

        //Was the information saved?
        if(error_submit === "success")
        {
            message = <SuccessMessage/>;
        }
        else if(error_submit === "failure" || error_submit === "id_err"){
            message = <FailureMessage/>;
        }

        const resetForm = () => {
            this.setState({error_submit: "standing by"});
        }

        const today = new Date();
        today.setHours(0,0,0,0);

        //ref
        const yesterday = new Date(Date.now() -86400000);

        return (
            <Formik
                enableReinitialize={true}

                initialValues={{
                    contr_id_form : '',
                    contr_clt_form: this.props.match.params.id,
                    contr_desc_form:'',
                    contr_status_form:'In Process',
                    contr_startDate_form:'',
                    contr_endDate_form:'',
                    contr_closure_form:'',
                    contr_sendRUP_form:false,
                    contr_dateRUP_form:''
                }}

                //For custom date validation
                validationSchema={Yup.object().shape({
                    contr_startDate_form : Yup.date()
                        .required("Please enter a date")
                        .min(today, "Date cannot be in the past"),
                    contr_endDate_form : Yup.date()
                        .min(
                            Yup.ref('contr_startDate_form'),
                            "Date must be after the start"
                        ),
                    contr_closure_form : Yup.date()
                        .min(
                            Yup.ref('contr_endDate_form'),
                            "Date must be after the end date"
                        )
                })}

                //Validation
                validate={ (values) => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};':"\\|,.<>?]/;

                    if(!values.contr_id_form.trim()){
                        errors.contr_id_form = "Please enter a value";
                    }
                    else if(values.contr_id_form.trim().length > 30){
                        errors.contr_id_form = "Exceeds 30 characters max length";
                    }
                    else if(format.test(values.contr_id_form)){
                        errors.contr_id_form = "Only '-' and '_' symbols are accepted";
                    }

                    if(values.contr_desc_form.trim().length >= 1 && values.contr_desc_form.trim().length <= 8){
                        errors.contr_desc_form = "Seems a bit short...";
                    }
                    if(values.contr_desc_form.trim().length > 300){
                        errors.contr_desc_form = "Exceeds max 300 characters length";
                    }

                    return errors;
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {
                    //FOR DEVELOPMENT PURPOSE ONLY
                    console.log("The form was successfully filled out");
                    console.log(values);

                    //PUT HERE FETCH REQUEST
                    fetch('http://localhost:8080/api/v1/ContractHeader', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            headerId: values.contr_id_form.trim(),
                            clientId: values.contr_clt_form.trim(),
                            contractDesc: values.contr_desc_form.trim(),
                            startDate: values.contr_startDate_form,
                            endDate: values.contr_endDate_form,
                            closureDate: values.contr_closure_form,
                            contractStatus: values.contr_status_form,
                            sentRUP: values.contr_sendRUP_form,
                            dateSentRUP: values.contr_dateRUP_form
                        })
                    }).then(async response => {
                        if (!response.ok) {
                            this.setState({error_submit: "failure"}, () =>{
                                setSubmitting(false);
                            });
                        } else {
                            this.setState({error_submit: "success"}, () =>{
                                setSubmitting(false);
                            });
                        }
                    });
                }}>

                {({values, isSubmitting, setFieldValue}) => (
                    <div className="App-Holder col-lg-8 col-md-11 col-sm-12">
                        <h2 className={"head-2"}>Add a New Contract</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/contract-menu"}><button type="button" className="btn btn-sm btn-info">
                                Back to Menu
                            </button></Link>
                        </div>

                        <hr className={"mt-2"}/>

                        <Form noValidate={true} onChange={resetForm}>
                            <fieldset disabled={isSubmitting || error_submit === "id_err"}>
                                <div className={"col-12"}>
                                    <p className={"form-head"}>Contract Identification</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Contract ID Number"} id={"contr_id_form"} name={"contr_id_form"}/>
                                    </div>

                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Client ID"} id={"contr_clt_form"} name={"contr_clt_form"} disabled={true}/>
                                    </div>
                                </div>

                                <div className={"form-group col-12"}>
                                    <label htmlFor={"contr_desc_form"}>Description</label>
                                    <small className={"warning_message"}>{values.contr_desc_form.length === 0 ?
                                    "  --- REMARK: The contract does not have a description yet"  : null}</small>
                                    <CustomTextAreaInput id={"contr_desc_form"} name={"contr_desc_form"}
                                    placeholder={"Describe the contract's details here..."}/>

                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Contract Specifications</p>
                                </div>

                                <div className={"form-group"}>
                                    <CustomSelectInput label={"Contract Status"} id={"contr_status_form"} name={"contr_status_form"}>
                                        {ConStatus.contract_status.map( (stat, index) => {
                                            return <option key={index}>{stat}</option>
                                        })}
                                    </CustomSelectInput>
                                </div>

                                <div className={"form-row mt-3"}>
                                    <div className={"form-group col-md-4 col-sm-6"}>
                                        <CustomDateInput label={"Start Date"} id={"contr_startDate_form"} name={"contr_startDate_form"}/>
                                    </div>
                                    <div className={"form-group col-md-4 col-sm-6"}>
                                        <CustomDateInput label={"End Date"} id={"contr_endDate_form"} name={"contr_endDate_form"} />
                                    </div>
                                    <div className={"form-group col-md-4 col-sm-6"}>
                                        <CustomDateInput label={"Closure Date"} id={"contr_closure_form"} name={"contr_closure_form"}/>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Contract Transfer</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-3 col-sm-6"}>
                                        <div role="group" aria-labelledby="checkbox-group">
                                            <label htmlFor={"contr_sendRUP_form"} style={{whiteSpace:"nowrap"}}>Send to RUP?
                                                <Field type="checkbox" id={"contr_sendRUP_form"} name={"contr_sendRUP_form"}
                                                className={"form-control"}
                                                onClick={() =>{ setFieldValue('contr_dateRUP_form', '')}}/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomDateInput label={"Date Sent"} id={"contr_dateRUP_form"} name={"contr_dateRUP_form"}
                                        disabled={!values.contr_sendRUP_form}/>
                                    </div>
                                </div>
                            </fieldset>

                            <hr className={"mb-5 mt-4"}/>
                            {isSubmitting && error_submit === "standing by" ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                            <div className={"mt-5 text-center"}>
                                <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Add Contract"} className={"btn btn-yellow"}/>
                                <input type={"reset"}  disabled={isSubmitting || error_submit === "id_err"} value={"Clear Form"} className={"btn btn-red ml-3"} onClick={resetForm}/>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}
