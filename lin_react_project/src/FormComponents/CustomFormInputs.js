import React from "react";
import {useField, Field} from "formik";

/*Custom fields including labels and custom error messages to use in the application form's
* only work within Formik tags*/

export const CustomNoLabelTextInput = ({message, ...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <input type={"text"} className={"form-control"} {...fields} {...props} placeholder={message}/>
            <p className={"alert_message mb-3"}>{meta.error? meta.error : null}</p>
        </>
    );
}

export const CustomPhoneInput = ({label, ...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.id||props.name}>{label}</label>
            <input className={"form-control"} {...fields} {...props} placeholder={props.placeholder}/>
            <p className={"alert_message mb-3"}>{meta.error ? meta.error :null}</p>
        </>
    );
};

export const CustomEmailInput = ({label, ...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.id||props.name}>{label}</label>
            <input type={"email"} className={"form-control"} {...fields} {...props}/>
            <p className={"alert_message mb-3"}>{meta.error ? meta.error :null}</p>
        </>
    );
}

export const CustomSelectInput = ({label, ...props}) => {
    const [fields] = useField(props);

    return(
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <Field as={"select"} className={"form-control"} {...fields} {...props} />
        </>
    );
};

export const CustomTextInput = ({label, ...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <label style={{whiteSpace:"nowrap"}} htmlFor={props.id || props.name}>{label}</label>
            <input className={"text form-control" } {...fields} {...props}/>
            <p className={"alert_message mb-3"}>{meta.error ? meta.error :null}</p>
        </>
    );
};

export const CustomNumericInput = ({label, ...props}) => {
    const [fields, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={"number form-control" } {...fields} {...props}
                   placeholder={props.placeholder} pattern={'[0-9]{0,5}'}/>
            <p className={"alert_message mb-3"}> {meta.error ? meta.error :null}</p>
        </>
    );
}

export const CustomTextAreaInput = ({label, warning, ...props}) => {
    const [fields, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id||props.name}>{label}</label>
            <textarea className={"form-control"} {...fields} {...props} rows={"5"}
                      cols={"20"} placeholder={props.placeholder}/>
            <p className={"alert_message mb-3"}> {meta.error ? meta.error :null}</p>
        </>
    );
}

export const CustomDateInput = ({label, ...props}) => {
    const [fields, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id||props.name}>{label}</label>
            <input type={"date"} className={"form-control"} {...fields} {...props}/>
            <p className={"alert_message mb-3"}> {meta.error ? meta.error :null}</p>
        </>
    );
}
