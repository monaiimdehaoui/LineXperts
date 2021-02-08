import React, {Component} from "react";
import {Link} from "react-router-dom";
import ConStatus from '../Data/contract_status.json';
import {Formik, Form} from 'formik';

//Customized fields
import {
    CustomSelectInput, CustomNumericInput,
    CustomTextInput, CustomDateInput
} from "../FormComponents/CustomFormInputs";
import {SuccessMessage, FailureMessage} from '../FormComponents/FormSubmissionMessages';
import * as Yup from "yup";

export default class U_AddendumForm extends Component {

    //Component state variables
    constructor(props) {
        super(props);
        this.state = {
            fields:{
                adden_contr_form: '', //this.props.match.params.id;
                adden_id_form: '',//this.props.match.params.id;
                adden_startDate_form: '',
                adden_endDate_form: '',
                adden_closure_form: '',
                adden_invcost_form: '',
                adden_total_form: ''
            },
            error_submit: "standing by"
        };
    };

    componentDidMount() {
        //put fetch request here
    }

    render() {

        let {error_submit} = this.state;
        let message = <></>;

        //Was the information saved?
        if (error_submit === "success" || error_submit == "fetch_error") {
            message = <SuccessMessage/>;
        } else if (error_submit === "failure") {
            message = <FailureMessage/>;
        }

        const resetForm = () => {
            this.setState({error_submit: "standing by"});
        }

        const resetError = () => {
            this.setState({error_submit: "standing by"});
        }

        //returning formik component
        return (
            <Formik
                enableReinitialize={true}

                //Getting fields from the component state
                initialValues={
                    this.state.fields
                }

                //For custom date validation
                validationSchema={Yup.object().shape({
                    adden_startDate_form : Yup.date()
                        .required("Please enter a date")
                        .min(today, "Date cannot be in the past"),
                    adden_endDate_form : Yup.date()
                        .min(
                            Yup.ref('adden_startDate_form'),
                            "Date must be after the start"
                        ),
                    adden_closure_form : Yup.date()
                        .min(
                            Yup.ref('adden_endDate_form'),
                            "Date must be after the end date"
                        )
                })}

                //Extra validation with custom Formik
                validate={values => {
                    const errors = {};
                    const format = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
                    const decimalValidation = /^[0-9]+(\.[0-9]{1,2})?$/;

                    if(!values.adden_id_form.trim()){
                        errors.adden_id_form = "Please enter a value";
                    }
                    else if(values.adden_id_form.trim().length > 30){
                        errors.adden_id_form = "Exceeds 30 characters max length";
                    }
                    else if(!format.test(values.adden_id_form)){
                        errors.adden_id_form = "Symbols as '@' are not allowed";
                    }

                    if(!values.adden_invcost_form.trim()){
                        errors.adden_invcost_form = "Please enter a value";
                    }
                    else if(!decimalValidation.test(values.adden_invcost_form)){
                        errors.adden_invcost_form = "Only 2 decimals are accepted";
                    }
                    else if(values.adden_invcost_form < 0){
                        errors.adden_invcost_form = "Please enter a positive number";
                    }
                    else if(values.adden_invcost_form.length > 15){
                        errors.adden_invcost_form = "Exceeds 15 digits max length";
                    }

                    return errors;
                }}

                //Settings so validation only happens in form submission
                validateOnChange={false}
                validateOnBlur={false}

                onSubmit={(values, {setSubmitting}) => {
                    console.log("The form was successfully filled out");
                    console.log(values);

                    //PUT HERE FETCH REQUEST
                }}>

                {({props, isSubmitting}) => (
                    <div className="App-Holder col-lg-8 col-md-11">
                        <h2 className={"head-2"}>Add a new Addendum</h2>

                        <div className={"row mt-4"}>
                            <p className={"col"}>Please fill the form with the required information and submit it.</p>
                            <Link to={"/addendum-menu"}>
                                <button type="button" className="btn btn-sm btn-info col">
                                    Back to Menu
                                </button>
                            </Link>
                        </div>

                        <hr className={"mt-2"}/>

                        <Form noValidate={true} onChange={resetError}>
                            <div className={"col-12"}>
                                <p className={"form-head"}>Addendum Identification</p>
                            </div>

                            <div className={"form-row"}>
                                <div className={"form-group col-6"}>
                                    <CustomTextInput label={"Parent Contract"} id={"adden_contr_form"} name={"adden_contr_form"}
                                                     disabled={true}/>
                                </div>

                                <div className={"form-group col-6"}>
                                    <CustomTextInput label={"Addendum ID Number"} id={"adden_id_form"} name={"adden_id_form"}/>
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <p className={"form-head"}>Addendum Specifications</p>
                            </div>

                            <div className={"form-row"}>
                                <div className={"form-group col-md-4 col-sm-6"}>
                                    <CustomDateInput label={"Start Date"} id={"adden_startDate_form"} name={"adden_startDate_form"}/>
                                </div>
                                <div className={"form-group col-md-4 col-sm-6"}>
                                    <CustomDateInput label={"End Date"} id={"adden_endDate_form"} name={"adden_endDate_form"}/>
                                </div>
                                <div className={"form-group col-md-4 col-sm-6"}>
                                    <CustomDateInput label={"Closure Date"} id={"adden_closure_form"} name={"adden_closure_form"}/>
                                </div>
                            </div>

                            <div className={"form-group col-12"}>
                                <CustomSelectInput label={"Addendum Status"} id={"adden_status_form"} name={"adden_status_form"}>
                                    {ConStatus.contract_status.map( (stat, index) => {
                                        return <option key={index}>{stat}</option>
                                    })}
                                </CustomSelectInput>
                            </div>

                            <div className={"row mt-3"}>
                                <div className={"form-group col-6"}>
                                    <CustomNumericInput label={"Invoiced Cost"} id={"adden_invcost_form"} name={"adden_invcost_form"}/>
                                </div>
                                <div className={"form-group col-6"}>
                                    <CustomNumericInput label={"Total Cost"} id={"adden_total_form"} name={"adden_total_form"}/>
                                </div>
                            </div>

                            <hr className={"mb-5 mt-3"}/>
                            {isSubmitting ? <p className={"alert-info"} style={{padding:10, backgroundColor: "aliceblue"}}>Loading...</p> : message}
                            <div className={"mt-5 text-center"}>
                                <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Add Workforce"} className={"btn btn-yellow"}/>
                                <input type={"reset"} disabled={isSubmitting} value={"Clear Form"} className={"btn btn-red ml-3"} onClick={resetForm}/>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        );
    }
}
