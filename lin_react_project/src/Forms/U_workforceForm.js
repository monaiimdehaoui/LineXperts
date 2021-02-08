import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './css/form_styles.css';
import {Form, Formik} from "formik";

//Customized fields
import {
    CustomEmailInput,
    CustomPhoneInput,
    CustomSelectInput,
    CustomTextInput
} from "../FormComponents/CustomFormInputs";
import {FailureMessage, SuccessMessage} from "../FormComponents/FormSubmissionMessages";
import Worker_stat from "../Data/workforce_status.json";
export default class U_workforceForm extends Component{

    //Component fields
    constructor(props) {
        super(props);
        this.state = {
            initial_fields: {
                wrkf_id_form : "",
                wrkf_status_form: "",
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
            },
            worker_info: {},
            error_submit: "standing by",
            allow_inputs:false
        };
    }

    //Fetching actual information related to the workforce member
    componentDidMount() {
        //with dynamic values in url
        //console.log(getValue());
        // let location = useParams();
         //console.log(location);
        /*https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
        https://reactjs.org/docs/hooks-faq.html
        https://medium.com/better-programming/how-to-pass-multiple-route-parameters-in-a-react-url-path-4b919de0abbe
*/
         //Used and successful:
         //https://medium.com/officialrajdeepsingh/how-to-pass-parameters-in-react-router-dom-link-7e8289574801

        //Getting the workforce member ID form the URL
        let chosen_worker_id = this.props.match.params.id;

        fetch(`http://localhost:8080/api/v1/workforce/${chosen_worker_id}`)
            .then(response => response.json())
            .then(data => {
                if(typeof data.message !== "undefined"){
                    this.setState({error_submit:"fetch_error"});
                }
                else{
                    this.setState({worker_info: data, allow_inputs:true}, () =>{
                        this.displayCurrentValues();
                    });
                }},
                (error) => {
                    this.setState({error_submit:"fetch_error"});
                }
            );
    }

    //displaying original data related to the chosen workforce
    displayCurrentValues = () => {
        let info = this.state.worker_info;
        let fields =  this.state.initial_fields;

        fields["wrkf_id_form"] = info.wrkId;
        fields["wrkf_status_form"] = info.status;
        fields["wrkf_lastName_form"] = info.lastname;
        info.lastname2 !== null ? fields["wrkf_secLastName_form"] = info.lastname2 : fields["wrkf_secLastName_form"] = "N/A";
        fields["wrkf_firstName_form"] = info.firstname;
        info.midname !== null ? fields["wrkf_midName_form"] = info.midname : fields["wrkf_midName_form"] = "N/A";
        fields["wrkf_address_form"] = info.address;
        fields["wrkf_city_form"] = info.city;
        fields["wrkf_region_form"] = info.region;
        fields["wrkf_country_form"] = info.country;
        fields["wrkf_phone_form"] = info.phone;
        info.cellphone !== null ? fields["wrkf_cell_form"] = info.cellphone : fields["wrkf_cell_form"] = "N/A";
        fields["wrkf_email_form"] = info.email;

        //saving changes into the fields
        this.setState({initial_fields: fields});
    }

 render() {

     let {error_submit, allow_inputs} = this.state;
     let message = <></>;

     //Was the information saved?
     if(error_submit === "success") {
         message = <SuccessMessage/>;
     }
     if(error_submit === "failure" || error_submit === "fetch_error"){
         message = <FailureMessage/>;
     }

     //Extra functions
     //Validating Capital letters in names
     const handleCapChar = (s) =>{
         if(!(typeof s === "undefined") && (typeof s === 'string')){
             const capital = s.charAt(0).toUpperCase();
             if(s.charAt(0) === capital)
                 return true;
         }
         return false;
     }

     //Resetting the form's error or completely
     const handleReset = () => {
         this.setState({error_submit: "standing by"});
         this.displayCurrentValues();
     };

     const handleError = () =>{
         this.setState({error_submit: "standing by"});
     };

     return (
         <Formik
             enableReinitialize={true}
             //Setting initial values with the actual data of the workforce
             initialValues={
                 this.state.initial_fields
             }

             //Custom Validation
             validate={ (values) => {
                 const errors = {};
                 const fullFormat = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
                 const emailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                 const phoneNum = /^\+?([0-9]{2})\)?[-]?([0-9]{3})[-]?([0-9]{4})?[-]?([0-9]{3})$/;
                 const numberFormat = new RegExp(/\d/);

                 if(!values.wrkf_lastName_form.trim()){
                     errors.wrkf_lastName_form = "Please enter a value";
                 }
                 else if (values.wrkf_lastName_form.trim().length > 30) {
                     errors.wrkf_lastName_form = "Maximum of 30 characters allowed";
                 }
                 else if (fullFormat.test(values.wrkf_lastName_form)) {
                     errors.wrkf_lastName_form = "Symbols as '@' are not accepted";
                 }
                 else if(!handleCapChar(values.wrkf_lastName_form)){
                     errors.wrkf_lastName_form = "Last name should start by a capital letter";
                 }
                 else if(numberFormat.test(values.wrkf_lastName_form)){
                     errors.wrkf_lastName_form = "No numbers are accepted";
                 }

                 if(!values.wrkf_firstName_form){
                     errors.wrkf_firstName_form = "Please enter a value";
                 }
                 else if (values.wrkf_firstName_form.trim().length > 30) {
                     errors.wrkf_firstName_form = "Maximum of 30 characters allowed";
                 }
                 else if (fullFormat.test(values.wrkf_firstName_form)) {
                     errors.wrkf_firstName_form = "Symbols as '@' are not accepted";
                 }
                 else if(!handleCapChar(values.wrkf_firstName_form)){
                     errors.wrkf_firstName_form = "Name should start by a capital letter";
                 }
                 else if(numberFormat.test(values.wrkf_lastName_form)){
                     errors.wrkf_lastName_form = "No numbers are accepted";
                 }

                 if(values.wrkf_secLastName_form){
                     if (values.wrkf_secLastName_form.trim().length > 30) {
                         errors.wrkf_secLastName_form = "Maximum of 30 characters allowed";
                     }
                     else if (fullFormat.test(values.wrkf_secLastName_form)) {
                         errors.wrkf_secLastName_form = "Symbols as '@' are not accepted";
                     }
                     else if(!handleCapChar(values.wrkf_secLastName_form)){
                         errors.wrkf_secLastName_form = "Middle name should start by a capital letter";
                     }
                     else if(numberFormat.test(values.wrkf_lastName_form)){
                         errors.wrkf_lastName_form = "No numbers are accepted";
                     }
                 }

                 if(values.wrkf_midName_form ){
                     if (values.wrkf_midName_form.trim().length > 30) {
                         errors.wrkf_midName_form = "Maximum of 30 characters allowed";
                     }
                     else if (fullFormat.test(values.wrkf_midName_form)) {
                         errors.wrkf_midName_form = "Symbols as '@' are not accepted";
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
                //FOR DEVELOPMENT PURPOSE ONLY
                console.log("The form was successfully filled out");
                console.log(this.state);

                fetch(`http://localhost:8080/api/v1/workforce/${values.wrkf_id_form}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        wrkId: values.wrkf_id_form,
                        status: values.wrkf_status_form,
                        email: values.wrkf_email_form,
                        address: values.wrkf_address_form.trim(),
                        cellphone: values.wrkf_cell_form,
                        phone: values.wrkf_phone_form,
                        city: values.wrkf_city_form.trim(),
                        region: values.wrkf_region_form.trim(),
                        country: values.wrkf_country_form.trim(),
                        lastname: values.wrkf_lastName_form.trim(),
                        lastname2: values.wrkf_secLastName_form.trim(),
                        firstname: values.wrkf_firstName_form.trim(),
                        midname: values.wrkf_midName_form.trim(),
                    })
                }).then(async response => {
                    if (!response.ok || typeof response.message !== "undefined") {
                        this.setState({error_submit:"failure"}, () =>{
                            setSubmitting(false);
                        });
                    }
                    else{
                        this.setState({error_submit:"success"}, () =>{
                            setSubmitting(false);
                        });
                    }
                }).catch(error => {
                    this.setState({error_submit:"failure"}, () =>{
                        setSubmitting(false);
                    });
                });
             }}>

             {({props, values, errors, isSubmitting}) => (
                 <div className="App-Holder col-lg-8 col-md-11">
                     <h2 className={"head-2"}>Update a Workforce Resource</h2>

                     <div className={"row mt-4"}>
                         <p className={"col"}>Please fill the form with the required information and submit it.</p>
                         <Link to={"/workforce-menu"}><button type="button" className="btn btn-sm btn-info">
                             Back to Menu
                         </button></Link>
                     </div>

                     <hr className={"mt-3"}/>

                     <Form noValidate={true} disabled={isSubmitting} onChange={handleError}>
                        <fieldset disabled={!allow_inputs || isSubmitting }>//|| isValidating
                             <div className={"form-row"}>
                                 <div className={"col-6"}>
                                     <p className={"form-head"}>Workforce Identification</p>
                                     <div className={"form-group"}>
                                         <CustomTextInput label={"Workforce Id Number"} id={"wrkf_id_form"} name={"wrkf_id_form"}
                                         disabled={true}/>
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
                                     <CustomTextInput label={"Second Last Name"} id={"wrkf_secLastName_form"} name={"wrkf_secLastName_form"}
                                                      warning={errors.wrkf_secLastName_form}/>
                                 </div>
                                 <div className={"form-group col-6"}>
                                     <CustomTextInput id={"wrkf_midName_form"} name={"wrkf_midName_form"} label={"Middle Name"}
                                                      warning={errors.wrkf_midName_form}/>
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
                             <input type={"submit"} disabled={isSubmitting || error_submit!== "standing by"} value={"Update Workforce"} className={"btn btn-yellow"}/>
                             <input type={"reset"} disabled={isSubmitting || error_submit==="fetch_error"} value={"Reset Form"} className={"btn btn-red ml-3"} onClick={handleReset}/>
                         </div>
                     </Form>
                 </div>
             )}
         </Formik>
        );
    }
}

