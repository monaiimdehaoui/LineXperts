import React, {Component} from 'react';
import {Formik, Form, Field} from 'formik';
import {Link} from "react-router-dom";

//Customized fields
import {FailureMessage, SuccessMessage} from "../FormComponents/FormSubmissionMessages";
import {CustomTextInput, CustomSelectInput, CustomPhoneInput, CustomEmailInput} from "../FormComponents/CustomFormInputs";
import IDdocs from '../Data/identification_documents.json';

//Form to update Client entities

export default class U_CorpForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            fields:{
                clt_id_form:'',
                clt_corp_form:'',
                clt_official_form:'',
                clt_commercial_form:'',
                clt_idDoc_form:'test1',
                clt_firstName_form:'',
                clt_lastName_form:'',
                clt_status_form:'Activo',
                clt_address_form:'',
                clt_city_form:'',
                clt_region_form:'',
                clt_country_form:'',
                clt_phone_form:'',
                clt_cell_form:'',
                clt_email_form:''
            },
            error_submit : "standing by",
            client_info:{},
            allow_inputs:false
        }
    }

    componentDidMount() {

        //Fetch request to the back-end
        let chosen_client_id = this.props.match.params.id;
        fetch(`http://localhost:8080/api/v1/clients/id/${chosen_client_id}`)
            .then(response=>response.json())
            .then(data =>{
               if(typeof data.message !== "undefined"){
                   this.setState({error_submit:"fetch_error"});
               }
               else{
                   this.setState({client_info:data, allow_inputs:true});
                   this.displayCurrentValues();
               }
            }).catch(error=>{
            this.setState({error_submit:"fetch_error"});
        });
    }

    //display current values in the form
    displayCurrentValues = () => {
        let {client_info, fields} = this.state;

        fields["clt_id_form"] = client_info.clientId;
        fields["clt_corp_form"] = client_info.groupId;
        fields["clt_official_form"] = client_info.officialName;
        fields["clt_commercial_form"] = client_info.commercialName;
        fields["clt_idDoc_form"] = client_info.NIT;
        fields["clt_firstName_form"] = client_info.contactFirstName;
        fields["clt_lastName_form"] = client_info.contactLastName;
        fields["clt_status_form"] = client_info.status;
        fields["clt_address_form"] = client_info.address;
        fields["clt_city_form"] = client_info.city;
        fields["clt_region_form"] = client_info.region;
        fields["clt_country_form"] = client_info.country;
        fields["clt_phone_form"] = client_info.phone;
        fields["clt_cell_form"] = client_info.cellphone === null ? '' : client_info.cellphone;
        fields["clt_email_form"] = client_info.email === null ? '' : client_info.email;

        this.setState({fields});
    }

    render() {

        const {error_submit, allow_inputs} = this.state;
        let message = <></>

        if(error_submit === "failure" || error_submit === "fetch_error"){
            message = <FailureMessage/>
        }
        else if(error_submit === "Success"){
            message = <SuccessMessage/>
        }

        //Extra functions
        const handleCapChar = (s) =>{
            if(!(typeof s === "undefined") && (typeof s === 'string')){
                const capital = s.charAt(0).toUpperCase();
                if(s.charAt(0) === capital)
                    return true;
            }
            return false;
        }

        //Custom submit
        const resetErrorSubmit = () => {
            this.setState({error_submit: "standing by"});
        };

        return (
            <Formik
                enableReinitialize={true}

                initialValues={
                    this.state.fields
                }

                validate={(values) =>{
                    const errors = {};
                    const fullFormat = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
                    const emailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                    const phoneNum = /^\+?([0-9]{2})\)?[-]?([0-9]{3})[-]?([0-9]{4})?[-]?([0-9]{3})$/;

                    if(!values.clt_firstName_form.trim()){
                        errors.clt_firstName_form = "Please enter a value";
                    }
                    else if(values.clt_firstName_form.length > 40){
                        errors.clt_firstName_form = "Exceeds 40 characters max length";
                    }
                    else if(fullFormat.test(values.clt_firstName_form)){
                        errors.clt_firstName_form = "Symbols as '@' are not valid";
                    }
                    else if(!handleCapChar(values.clt_firstName_form)){
                        errors.clt_firstName_form = "Name should start with a capital letter";
                    }

                    if(!values.clt_lastName_form.trim()){
                        errors.clt_lastName_form = "Please enter a value";
                    }
                    else if(values.clt_lastName_form.length > 40){
                        errors.clt_lastName_form = "Exceeds 40 characters max length";
                    }
                    else if(fullFormat.test(values.clt_lastName_form)){
                        errors.clt_lastName_form = "Symbols as '@' are not valid";
                    }
                    else if(!handleCapChar(values.clt_lastName_form)){
                        errors.clt_lastName_form = "Last name should start with a capital letter";
                    }

                    if(!values.clt_commercial_form.trim()){
                        errors.clt_commercial_form = "Please enter a value";
                    }
                    else if(values.clt_commercial_form.length > 40){
                        errors.clt_commercial_form = "Exceeds 40 characters max length";
                    }
                    else if(fullFormat.test(values.clt_commercial_form)){
                        errors.clt_commercial_form = "Symbols as '@' are not valid";
                    }

                    if(!values.clt_phone_form){
                        errors.clt_phone_form = "Please enter a value";
                    }
                    else if(!phoneNum.test(values.clt_phone_form)){
                        errors.clt_phone_form = "Required Format: +XX-XXX-XXXX-XXX";
                    }
                    else if(values.clt_phone_form.length > 20) {
                        errors.clt_phone_form = "Exceed 20 characters max. length";
                    }

                    if(values.clt_cell_form.length > 0) {
                        if(values.clt_cell_form.length > 20) {
                            errors.clt_cell_form = "Exceed 20 characters max. length";
                        }
                        else if(!phoneNum.test(values.clt_cell_form)){
                            errors.clt_cell_form = "Required Format: +XX-XXX-XXXX-XXX";
                        }
                    }

                    if(values.clt_email_form.trim().length > 0){
                        if(values.clt_email_form.trim().length > 55 ) {
                            errors.clt_email_form = "Maximum of 55 characters allowed";
                        }
                        else if(!emailFormat.test(values.clt_email_form)){
                            errors.clt_email_form = "Sorry, the format is not valid";
                        }
                    }

                    return errors;
                }}

                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {
                    fetch(`http://localhost:8080/api/v1/clients/id/${values.clt_id_form}`, {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                    },
                        Body: JSON.stringify({
                            clientId: values.clt_id_form,
                            groupId: values.clt_corp_form,
                            officialName: values.clt_official_form,
                            commercialName: values.clt_commercial_form.trim(),
                            NIT: values.clt_idDoc_form,
                            contactFirstName: values.clt_firstName_form.trim(),
                            contactLastName: values.clt_lastName_form.trim(),
                            status: values.clt_status_form,
                            address: values.clt_address_form,
                            city: values.clt_city_form,
                            region: values.clt_region_form,
                            country: values.clt_country_form,
                            phone: values.clt_phone_form,
                            cellphone: values.clt_cell_form,
                            email : values.clt_email_form.trim(),
                        })
                    }).then(async response =>{
                        if(!response.ok || typeof response.message !== "undefined"){
                            this.setState({error_submit:"failure"}, ()=> {
                                setSubmitting(false);
                            });
                        }
                        else {
                            this.setState({error_submit: "success"}, () => {
                                setSubmitting(false);
                            })
                        }
                    }).catch((error) => {
                        this.setState({error_submit: "failure"}, () => {
                            setSubmitting(false);
                        })
                    });
                }}>
                {({isSubmitting}) => (
                    <div className="App-Holder col-lg-8 col-md-11">
                        <h2 className={"head-2"}>Update a Client Account</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/client-menu"}><button type="button" className="btn btn-sm btn-info">
                                Back to Menu
                            </button></Link>
                        </div>

                        <hr className={"mt-5"}/>

                        <Form noValidate={true} onChange={resetErrorSubmit}>

                            <fieldset disabled={!allow_inputs || isSubmitting}>
                                <div className={"col-12"}>
                                    <p className={"form-head"}>Parent Company Information</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-lg-4 col-md-6"}>
                                        <CustomTextInput label={"Associated Corporate"} id={"clt_corp_form"} name={"clt_corp_form"} disabled={true}/>
                                    </div>
                                    <div className={"form-group col-lg-4 col-md-6"}>
                                        <CustomTextInput label={"Company official Name"} id={"clt_official_form"} name={"clt_official_form"}
                                        disabled={true}/>
                                    </div>
                                    <div className={"form-group col-lg-4 col-md-6"}>
                                        <CustomTextInput label={"Commercial Name"} id={"clt_commercial_form"} name={"clt_commercial_form"}/>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Client Identification</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Client ID"} id={"clt_id_form"} name={"clt_id_form"}
                                        disabled={true}/>
                                    </div>

                                    <div className={"form-group col-6"}>
                                        <CustomSelectInput label={"Identification Document"} name={"clt_idDoc_form"} id={"clt_idDoc_form"}
                                        disabled={true}>
                                            {IDdocs.identification_docs.map((docs, index) => {
                                                return <option key={index}>{docs}</option>
                                            })}
                                        </CustomSelectInput>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Client Status</p>
                                </div>

                                <div role="group" aria-labelledby="my-radio-group" className={"form-check-inline form-check"}>
                                    <label className={"control-radio control mr-3"}>
                                        <Field type="radio" name="clt_status_form" value="Activo" className={"control control-radio"}/>
                                        <div className={"control_indicator"}></div>
                                        Active
                                    </label>
                                    <label className={"control-radio control"}>
                                        <Field type="radio" name="clt_status_form" value="Inactivo" className={"control control-radio"}/>
                                        <div className={"control_indicator"}></div>
                                        Inactive
                                    </label>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Contact Information</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"First Name"} id={"clt_firstName_form"} name={"clt_firstName_form"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Last Name"} id={"clt_lastName_form"} name={"clt_lastName_form"} />
                                    </div>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomPhoneInput label={"Phone Number"} id={"clt_phone_form"} name={"clt_phone_form"} placeholder={"Format: +XX-XXX-XXXX-XXX"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomPhoneInput label={"Cell Number"} id={"clt_cell_form"} name={"clt_cell_form"} placeholder={"Format: +XX-XXX-XXXX-XXX"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomEmailInput label={"Email"} id={"clt_email_form"} name={"clt_email_form"}/>
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Client Address</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Address"} id={"clt_address_form"} name={"clt_address_form"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"City"} id={"clt_city_form"} name={"clt_city_form"} />
                                    </div>
                                </div>
                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Region"} id={"clt_region_form"} name={"clt_region_form"}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Country"} id={"clt_country_form"} name={"clt_country_form"}/>
                                    </div>
                                </div>
                            </fieldset>

                            <hr className={"mb-5"}/>

                            {isSubmitting && error_submit === "standing by" ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                            <div className={"mt-5 text-center"}>
                                <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Add Client"} className={"btn btn-yellow"}/>
                                <input type={"reset"} disabled={isSubmitting || error_submit === "fetch_error"} value={"Clear Form"} className={"btn btn-red ml-3"} onClick={resetErrorSubmit}/>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}
