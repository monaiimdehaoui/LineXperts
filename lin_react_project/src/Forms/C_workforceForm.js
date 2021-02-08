import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './css/form_styles.css';
import {Form, Formik} from 'formik';

//Customized fields
import {CustomSelectInput, CustomTextInput,  CustomPhoneInput, CustomEmailInput} from "../FormComponents/CustomFormInputs";
import {SuccessMessage, FailureMessage} from "../FormComponents/FormSubmissionMessages";
import Worker_stat from '../Data/workforce_status.json';

//Add Workforce members form

export default class C_workforceForm extends Component {

    //Component state variables
    constructor(props) {
        super(props);
        this.state = {
            error_submit: "standing by"
        };
    };

    render() {

        let error_submit = this.state.error_submit;
        let message = <></>;

        //Was the information saved?
        if(error_submit === "success") {
            message = <SuccessMessage/>;
        }
        if(error_submit === "failure"){
            message = <FailureMessage/>;
        }

        //Extra functions
        //Validating capital letters for names
        const handleCapChar = (s) =>{
            if(!(typeof s === "undefined") && (typeof s === 'string')){
                const capital = s.charAt(0).toUpperCase();
                if(s.charAt(0) === capital)
                    return true;
            }
            return false;
        };

        //Rsetting the form's error message
        const handleReset = () => {
            this.setState({error_submit: "standing by"});
        };

        return (
            <Formik
                enableReinitialize={true}

                initialValues={{
                    wrkf_id_form : "",
                    wrkf_status_form: "En Labor",
                    wrkf_lastName_form: "",
                    wrkf_secLastName_form: "",
                    wrkf_firstName_form: "",
                    wrkf_midName_form: "",
                    wrkf_address_form: "",
                    wrkf_city_form: "",
                    wrkf_region_form: "",
                    wrkf_country_form: "",
                    wrkf_phone_form: "",
                    wrkf_cell_form: "",
                    wrkf_email_form: ""
                }}

                //Validation
                validate={ (values, props) => {
                    const errors = {};
                    const format = /[!@#$%^&*()+=\[\]{};':"\\|,.<>?]/;
                    const fullFormat = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
                    const emailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    const phoneNum = /^\+?([0-9]{2})\)?[-]?([0-9]{3})[-]?([0-9]{4})?[-]?([0-9]{3})$/;
                    const numberFormat = new RegExp(/\d/);

                    if(!values.wrkf_id_form.trim()){
                        errors.wrkf_id_form = "Please enter a value";
                    }
                    else if (values.wrkf_id_form.trim().length > 30) {
                        errors.wrkf_id_form = "Maximum of 30 characters allowed";
                    }
                    else if (format.test(values.wrkf_id_form)){
                        errors.wrkf_id_form = "Only '-' and '_' symbols are accepted";
                    }

                    if(!values.wrkf_lastName_form.trim()){
                        errors.wrkf_lastName_form = "Please enter a value";
                    }
                    else if (values.wrkf_lastName_form.trim().length > 30) {
                        errors.wrkf_lastName_form = "Maximum of 30 characters allowed";
                    }
                    else if (fullFormat.test(values.wrkf_lastName_form)) {
                        errors.wrkf_lastName_form = "Symbols as '@' are not valid";
                    }
                    else if(!handleCapChar(values.wrkf_lastName_form)){
                        errors.wrkf_lastName_form = "Last name should start by a capital letter";
                    }
                    else if(numberFormat.test(values.wrkf_lastName_form)){
                        errors.wrkf_lastName_form = "No numbers are accepted";
                    }

                    if(!values.wrkf_firstName_form.trim()){
                        errors.wrkf_firstName_form = "Please enter a value";
                    }
                    else if (values.wrkf_firstName_form.trim().length > 30) {
                        errors.wrkf_firstName_form = "Maximum of 30 characters allowed";
                    }
                    else if (fullFormat.test(values.wrkf_firstName_form)) {
                        errors.wrkf_firstName_form = "Symbols as '@' are not valid";
                    }
                    else if(!handleCapChar(values.wrkf_firstName_form)){
                        errors.wrkf_firstName_form = "Name should start by a capital letter";
                    }
                    else if(numberFormat.test(values.wrkf_lastName_form)){
                        errors.wrkf_lastName_form = "No numbers are accepted";
                    }

                    if(values.wrkf_secLastName_form.trim()){
                        if (values.wrkf_secLastName_form.trim().length > 30) {
                            errors.wrkf_secLastName_form = "Maximum of 30 characters allowed";
                        }
                        else if (fullFormat.test(values.wrkf_secLastName_form)) {
                            errors.wrkf_secLastName_form = "Symbols as '@' are not valid";
                        }
                        else if(!handleCapChar(values.wrkf_secLastName_form)){
                            errors.wrkf_secLastName_form = "Middle name should start by a capital letter";
                        }
                        else if(numberFormat.test(values.wrkf_lastName_form)){
                            errors.wrkf_lastName_form = "No numbers are accepted";
                        }
                    }

                    if(values.wrkf_midName_form.trim()){
                        if (values.wrkf_midName_form.trim().length > 30) {
                            errors.wrkf_midName_form = "Maximum of 30 characters allowed";
                        }
                        else if (fullFormat.test(values.wrkf_midName_form)) {
                            errors.wrkf_midName_form = "Symbols as '@' are not valid";
                        }
                        else if(!handleCapChar(values.wrkf_midName_form)){
                            errors.wrkf_midName_form = "Last name should start by a capital letter";
                        }
                        else if(numberFormat.test(values.wrkf_lastName_form)){
                            errors.wrkf_lastName_form = "No numbers are accepted";
                        }
                    }

                    if(!values.wrkf_phone_form){
                        errors.wrkf_phone_form = "Please enter a value";
                    }
                    else if(!phoneNum.test(values.wrkf_phone_form)){
                        errors.wrkf_phone_form = "Required Format: +XX-XXX-XXXX-XXX";
                    }
                    else if(values.wrkf_phone_form.length > 20) {
                        errors.wrkf_phone_form = "Exceed 20 characters max. length";
                    }

                    if(values.wrkf_cell_form.length > 0) {
                        if(values.wrkf_cell_form.length > 20) {
                            errors.wrkf_cell_form = "Exceed 20 characters max. length";
                        }
                        else if(!phoneNum.test(values.wrkf_cell_form)){
                            errors.wrkf_cell_form = "Required Format: +XX-XXX-XXXX-XXX";
                        }
                    }

                    if(!values.wrkf_email_form){
                        errors.wrkf_email_form = "Please enter a value";
                    }
                    else if(values.wrkf_email_form.trim().length > 55 ) {
                        errors.wrkf_email_form = "Maximum of 55 characters allowed";
                    }
                    else if(!emailFormat.test(values.wrkf_email_form)){
                        errors.wrkf_email_form = "Sorry, the format is not valid";
                    }

                    return errors;
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {

                        //SENDING DATA TO SPRING BACKEND
                        fetch('http://localhost:8080/api/v1/workforce', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                wrkId: values.wrkf_id_form.trim(),
                                lastname: values.wrkf_lastName_form.trim(),
                                lastname2: values.wrkf_secLastName_form.trim(),
                                firstname: values.wrkf_firstName_form.trim(),
                                midname: values.wrkf_midName_form.trim(),
                                phone: values.wrkf_phone_form.trim(),
                                cellphone: values.wrkf_cell_form.trim(),
                                email: values.wrkf_email_form.trim(),
                                status: values.wrkf_status_form,
                                address: values.wrkf_address_form.trim(),
                                city: values.wrkf_city_form.trim(),
                                region: values.wrkf_region_form.trim(),
                                country: values.wrkf_country_form.trim()
                            })
                        }).then(async response => {
                            if(response.ok){
                                this.setState({error_submit: "success"}, () => {
                                    setSubmitting(false);
                                });
                            }
                            else{
                                this.setState({error_submit: "failure"}, () => {
                                    setSubmitting(false);
                                });
                            }
                        }).catch(error => {
                            console.log("There was an error!", error);
                            this.setState({error_submit: "failure"}, () => {
                                setSubmitting(false);
                            });
                        });
                }}>

                {({props, errors, isSubmitting}) => (
                    <div className="App-Holder col-lg-8 col-md-11">
                        <h2 className={"head-2"}>Add a new Workforce Resource</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/workforce-menu"}><button type="button" className="btn btn-sm btn-info">
                                Back to Menu
                            </button></Link>
                        </div>

                        <hr className={"mt-3"}/>

                        <Form noValidate={true} disabled={isSubmitting} onChange={handleReset}>

                            <fieldset disabled={isSubmitting}>
                                <div className={"form-row"}>
                                    <div className={"col-6"}>
                                        <p className={"form-head"}>Workforce Identification</p>
                                        <div className={"form-group"}>
                                            <CustomTextInput label={"Workforce Id Number"} id={"wrkf_id_form"} name={"wrkf_id_form"}/>
                                        </div>
                                    </div>

                                    <div className={"col-6"}>
                                        <p className={"form-head"}>Status</p>
                                        <div className={"form-group"}>
                                            <CustomSelectInput id={"wrkf_status_form"} name={"wrkf_status_form"} label={"Workforce Current Status"}>
                                                {Worker_stat.wrk_status.map( (stat, index) => {
                                                    return <option key={index}>{stat}</option>
                                                })}
                                            </CustomSelectInput>
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_lastName_form"} name={"wrkf_lastName_form"} label={"Last Name"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_firstName_form"} name={"wrkf_firstName_form"} label={"First Name"}/>
                                    </div>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Second Last Name"} id={"wrkf_secLastName_form"} name={"wrkf_secLastName_form"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_midName_form"} name={"wrkf_midName_form"} label={"Middle Name"}/>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Workforce Resource Address</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_address_form"} name={"wrkf_address_form"} label={"Address"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_city_form"} name={"wrkf_city_form"} label={"City"}/>
                                    </div>
                                </div>
                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_region_form"} name={"wrkf_region_form"} label={"Region"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput id={"wrkf_country_form"} name={"wrkf_country_form"} label={"Country"}/>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Contact Information</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomPhoneInput label={"Phone Number"} id={"wrkf_phone_form"} name={"wrkf_phone_form"} placeholder={"Format: +XX-XXX-XXXX-XXX"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomPhoneInput id={"wrkf_cell_form"} name={"wrkf_cell_form"} label={"Cellphone Number"} placeholder={"Format: +XX-XXX-XXXX-XXX"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomEmailInput id={"wrkf_email_form"} name={"wrkf_email_form"} label={"Corporation Email"}/>
                                    </div>
                                </div>
                            </fieldset>

                            <hr className={"mb-5"}/>
                            {isSubmitting && error_submit === "standing by" ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                            <div className={"text-center"}>
                                <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Add Workforce"} className={"btn btn-yellow"}/>
                                <input type={"reset"} disabled={isSubmitting} value={"Clear Form"} className={"btn btn-red ml-3"} onClick={handleReset}/>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}
