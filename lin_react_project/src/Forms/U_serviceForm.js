import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

//Customized fields
import {CustomSelectInput, CustomNumericInput,
    CustomTextInput, CustomTextAreaInput} from "../FormComponents/CustomFormInputs";
import {FailureMessage, SuccessMessage} from "../FormComponents/FormSubmissionMessages";
import ServiceTimeMeasure from '../Data/unit_time_measures.json';

export default class U_serviceForm extends Component{

    //Component state variables
    constructor(props) {
        super(props);
        this.state = {
            error_submit: "standing by",
            allow_inputs:false,
            service_info:{},
            fields:{}
        };
    };

    //Fetch the actual data from the chosen service
    componentDidMount() {
        let chosen_service_id = 1;/*this.props.match.params.id;*/

        fetch(`http://localhost:8080/api/v1/service/id/${chosen_service_id}`)
            .then(response =>  response.json())
            .then(data => {
                    this.setState({service_info: data, allow_inputs:true});
                    if(typeof data.id === "undefined"){
                        this.setState({error_submit: "fetch_error"});
                    }
                }).catch((error) =>{
                this.setState({error_submit:"fetch_error"});
                }
            );
    };

    //Displaying current service's data in the form
    displayCurrentValues(){
        let {info, fields} = this.state;

        fields["ser_id_form"] = info.id;
        fields["ser_name_form"] = info.serviceName;
        info.serviceDescription !== null ? fields["ser_desc_form"] = info.serviceDescription : fields["ser_desc_form"] = "N/A";
        fields["ser_unit_form"] = info.unit;
        fields["ser_tariff_form"] = info.tariff;

        //saving changes into the fields
        this.setState({fields: fields});
    };

    render(){

        let {error_submit, allow_inputs} = this.state;
        let message = <></>;

        //Was the information saved?
        if(error_submit === "success")
        {
            message = <SuccessMessage/>;
        }
        else if(error_submit === "failure" || error_submit === "fetch_error"){
            message = <FailureMessage/>;
        }

        const resetError = () =>{
            this.setState({error_submit: "standing by"});
        }

        const resetForm = () => {
            this.setState({error_submit: "standing by"});
            this.displayCurrentValues();
        }

        return (
            <Formik
                enableReinitialize={true}

                initialValues={
                    this.state.fields
                }

                //Validating with YUP
                validationSchema={Yup.object().shape({
                    ser_name_form: Yup.string().trim()
                        .max(50, 'Exceed 50 characters max. length')
                        .required('Please enter a value')
                        .test(
                            "regex",
                            "Symbols as '@' are not accepted",
                            val => {
                                let regExp = new RegExp(
                                    /[!@#$%^&*()+_=\[\]{};':"\\|,<>?]/
                                );
                                return !regExp.test(val);
                            })
                        .min(3, "Seems a bit short..."),
                    ser_desc_form: Yup.string()
                        .max(150, 'Exceed 150 characters max. length')
                })}

                //Extra validation with custom Formik
                validate={ values => {
                    const errors = {};
                    const decimalValidation = /^[0-9]+(\.[0-9]{1,2})?$/;
                    const numberValidation = /^[0-9]{1,5}/;

                    if(values.ser_desc_form.length >= 1 && values.ser_desc_form.length <= 10)
                        errors.ser_desc_form = "Seems a bit short...";

                    if(!numberValidation.test(values.ser_id_form)){
                        errors.ser_id_form ="Only numbers are accepted";
                    }
                    else if(values.ser_id_form.toString().length > 5){
                        errors.ser_id_form ="The number must not be larger than 5 digits";
                    }
                    else if(!values.ser_id_form){
                        errors.ser_tariff_form = "Please enter a number";
                    }

                    if(!decimalValidation.test(values.ser_tariff_form)){
                        errors.ser_tariff_form = "Only 2 decimals are allowed";
                    }
                    if(values.ser_tariff_form.length > 9 ){
                        errors.ser_tariff_form = "Exceeds 9 digits max length";
                    }
                    else if(values.ser_tariff_form < 0 ){
                        errors.ser_tariff_form = "Please enter a positive number";
                    } else if(!values.ser_tariff_form){
                        errors.ser_tariff_form = "Please enter a number";
                    }

                    return errors;
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {

                    //SENDING DATA TO SPRING BACKEND
                    fetch('http://localhost:8080/api/v1/service', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            serviceDescription: values.ser_desc_form,
                            serviceName: values.ser_name_form,
                            tariff: values.ser_tariff_form,
                            unit: values.ser_unit_form,
                            id: values.ser_id_form
                        })
                    }).then(async response => {
                        if (!response.ok) {
                            this.setState({error_submit: "failure"}, () =>{
                                setSubmitting(false);
                            });
                        } else {
                            this.setState({error_submit: "success"}, () => {
                                setSubmitting(false);
                            });
                        }}).catch(error=>{
                        this.setState({error_submit: "failure"}, () =>{
                            setSubmitting(false);
                        });
                    })
                }}>

                {({props, values, errors, isSubmitting}) => (
                    <div className="App-Holder col-lg-8 col-md-11">
                        <h2 className={"head-2"}>Update a Service</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/service-menu"}><button type="button" className="btn btn-sm btn-info col">
                                Back to Menu
                            </button></Link>
                        </div>

                        <hr className={"mt-3"}/>

                        <Form noValidate={true} onChange={resetError}>
                            <fieldset disabled={!allow_inputs || isSubmitting}>
                                <div className={"col-12"}>
                                    <p className={"form-head"}>Service Description</p>
                                </div>

                                <div className={"row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomNumericInput type={"number"} label={"Service ID"}
                                                            id={"ser_id_form"} name={"ser_id_form"} disabled={true}/>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomTextInput label={"Service Name"}
                                                         id={"ser_name_form"} name={"ser_name_form"} type={"text"} disabled={true}/>
                                    </div>
                                </div>

                                <div className={"form-group col-lg-8 col-md-12"}>
                                    <label htmlFor={"ser_desc_form"}>Service Description</label>
                                    <small className={"warning_message"}>{values.ser_desc_form === null ? "  --- REMARK: the service will not have a description"  : null}</small>
                                    <CustomTextAreaInput id={"ser_desc_form"}
                                                         name={"ser_desc_form"} warning={errors.ser_desc_form}/>
                                </div>

                                <div className={"col-12"}>
                                    <p className={"form-head"}>Service Pricing</p>
                                </div>

                                <div className={"form-row"}>
                                    <div className={"form-group col-6"}>
                                        <CustomSelectInput label={"Pricing Unit Measure"} id={"ser_unit_form"} name={"ser_unit_form"}>
                                            {ServiceTimeMeasure.unit_measures.map( (stat, index) => {
                                                return <option key={index}>{stat}</option>
                                            })}
                                        </CustomSelectInput>
                                    </div>
                                    <div className={"form-group col-6"}>
                                        <CustomNumericInput type={"number"} id={"ser_tariff_form"} name={"ser_tariff_form"}
                                                            label={"tariff"} placeholder={"Enter a price"}/>
                                    </div>
                                </div>

                                <hr className={"mb-5 mt-3"}/>
                                {isSubmitting && error_submit === "standing by" ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                                <div className={"mt-5 text-center"}>
                                    <input type={"submit"} disabled={isSubmitting || error_submit !== "standing by"} value={"Update Service"} className={"btn btn-yellow"}/>
                                    <input type={"reset"} disabled={isSubmitting || error_submit === "fetch_error"} value={"Clear Form"} className={"btn btn-red ml-3"}
                                           onClick={resetForm}/>
                                </div>
                            </fieldset>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    };
}



