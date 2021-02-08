import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import {Link} from "react-router-dom";

//Customized links
import IDdocs from '../Data/identification_documents.json';
import {FailureMessage, SuccessMessage} from "../FormComponents/FormSubmissionMessages";
import {CustomTextInput, CustomSelectInput, CustomPhoneInput, CustomEmailInput} from "../FormComponents/CustomFormInputs";

export default class C_CorpForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            error_submit : "standing by"
        }
    }

    render() {

        const {error_submit} = this.state;
        let message = <></>

        //Was the submission successful?
        if(error_submit === "failure"){
            message = <FailureMessage/>
        }
        else if(error_submit === "Success"){
            message = <SuccessMessage/>
        }

        //const to reset error_submit
        const resetErrorSubmit = () => {
            this.setState({error_submit: "standing by"});
        };

        return (
            <Formik
                enableReinitialize={true}

                //initial values of the form
                initialValues={{
                    corp_id_form:'',
                    corp_idDoc_form:'',
                    corp_name_form:'',
                    corp_status_form:'Activo',
                    corp_phone_form:'',
                    corp_email_form:'',
                    corp_address_form:'',
                    corp_city_form:'',
                    corp_region_form:'',
                    corp_country_form:''
                }}

                //Custom validation
                validate={(values) =>{
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};':"\\|,.<>?]/;
                    const fullFormat = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
                    const emailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    const phoneNum = /^\+?([0-9]{2})\)?[-]?([0-9]{3})[-]?([0-9]{4})?[-]?([0-9]{3})$/;

                    if(!values.corp_id_form.trim()){
                        errors.corp_id_form = "Please enter a value";
                    }
                    else if(values.corp_id_form.trim().length > 30){
                        errors.corp_id_form = "Exceeds 30 characters max length";
                    }
                    else if(format.test(values.corp_id_form)){
                        errors.corp_id_form = "Only '-' and '_' are allowed";
                    }

                    if(!values.corp_name_form.trim()){
                        errors.corp_name_form = "Please enter a value";
                    }
                    else if(values.corp_name_form.trim().length > 40){
                        errors.corp_name_form = "Exceeds 40 characters max length";
                    }
                    else if(fullFormat.test(values.corp_name_form)){
                        errors.corp_name_form = "Symbols as '@' are not valid";
                    }

                    if(!values.corp_phone_form){
                        errors.corp_phone_form = "Please enter a value";
                    }
                    else if(values.corp_phone_form.length>20){
                        errors.corp_phone_form = "Exceeds 20 characters max length";
                    }
                    else if(!phoneNum.test(values.corp_phone_form)){
                        errors.corp_phone_form = "Required Format: +XX-XXX-XXXX-XXX";
                    }

                    if(!values.corp_email_form.trim()){
                        errors.corp_email_form = "Please enter an email";
                    }
                    else if(values.corp_email_form.trim().length > 55){
                        errors.corp_email_form = "Exceeds 55 characters max length";
                    }
                    else if(!emailFormat.test(values.corp_email_form)){
                        errors.corp_email_form = "Sorry, this email is not valid";
                    }

                    return errors;
                }}

                //Validation is set to only occur during submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {

                    //Request sent to backend API to save the new corporate group
                    fetch("http://localhost:8080/api/v1/corp_group",{
                        method:'POST',
                        headers:{
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            groupID: values.corp_id_form.trim(),
                            groupName:values.corp_name_form.trim(),
                            groupAddr:values.corp_address_form,
                            groupCity:values.corp_city_form,
                            groupRegion:values.corp_region_form,
                            groupCountry:values.corp_country_form,
                            groupPhone:values.corp_phone_form,
                            email:values.corp_email_form.trim(),
                            official_id:values.corp_idDoc_form,
                            groupStatus:values.corp_status_form
                        })
                    }).then(async response =>{
                        if(response.ok){
                            this.setState({error_submit:"success"}, () =>{
                                setSubmitting(false);
                            });
                        }
                    }).catch(error=>{
                        this.setState({error_submit:"failure"}, () =>{
                            setSubmitting(false);
                        });
                    });
                }}>
                {({isSubmitting}) => (
                    <div className="App-Holder col-lg-8 col-md-11">
                        <h2 className={"head-2"}>Add a new Corporate Group</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/client-menu"}><button type="button" className="btn btn-sm btn-info">
                                Back to Menu
                            </button></Link>
                        </div>

                        <hr className={"mt-2"}/>

                        <Form noValidate={true} onChange={resetErrorSubmit}>
                            <div className={"col-12"}>
                                <p className={"form-head"}>Corporate Group Identification</p>
                            </div>
                            <div className={"form-row"}>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput id={"corp_id_form"} name={"corp_id_form"} label={"Corporate Group ID"}/>
                                </div>

                                <div className={"form-group col-6"}>
                                    <CustomSelectInput id={"corp_idDoc_form"} name={"corp_idDoc_form"}
                                    label={"Identification Document"}>
                                        {IDdocs.identification_docs.map((docs, index) => {
                                            return <option key={index}>{docs}</option>
                                        })}
                                    </CustomSelectInput>
                                </div>
                            </div>

                            <div className={"form-group pl-0 col-6"}>
                                <CustomTextInput id={"corp_name_form"} name={"corp_name_form"} label={"Corporation Name"}/>
                            </div>

                            <div className={"col-12"}>
                                <p className={"form-head"}>Corporate Status</p>
                            </div>

                            <div role="group" aria-labelledby="my-radio-group" className={"form-check-inline form-check"}>
                                <label className={"control-radio control mr-3"}>
                                    <Field type="radio" name="corp_status_form" value="Activo" className={"control control-radio"}/>
                                    <div className={"control_indicator"}></div>
                                    Active
                                </label>
                                <label className={"control-radio control"}>
                                    <Field type="radio" name="corp_status_form" value="Inactivo" className={"control control-radio"}/>
                                    <div className={"control_indicator"}></div>
                                    Inactive
                                </label>
                            </div>

                            <div className={"col-12"}>
                                <p className={"form-head"}>Contact Information</p>
                            </div>

                            <div className={"form-row"}>
                                <div className={"form-group col-6"}>
                                    <CustomPhoneInput id={"corp_phone_form"} name={"corp_phone_form"} label={"Phone Number"}
                                    placeholder={"Format: +XX-XXX-XXXX-XXX"}/>
                                </div>
                                <div className={"form-group col-6"}>
                                    <CustomEmailInput id={"corp_email_form"} name={"corp_email_form"} label={"Email"}/>
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <p className={"form-head"}>Corporate Address</p>
                            </div>

                            <div className={"form-row"}>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput id={"corp_address_form"} name={"corp_address_form"} label={"Address"}/>
                                </div>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput id={"corp_city_form"} name={"corp_city_form"} label={"City"}/>
                                </div>
                            </div>
                            <div className={"form-row"}>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput id={"corp_region_form"} name={"corp_region_form"} label={"Region"}/>
                                </div>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput id={"corp_country_form"} name={"corp_country_form"} label={"Country"}/>
                                </div>
                            </div>

                            <hr className={"mb-5 mt-2"}/>

                            {isSubmitting && error_submit === "standing by" ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                            <div className={"mt-5 text-center"}>
                                <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Add Corporate"} className={"btn btn-yellow"}/>
                                <input type={"reset"} disabled={isSubmitting} value={"Clear Form"} className={"btn btn-red ml-3"} onClick={resetErrorSubmit}/>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}
