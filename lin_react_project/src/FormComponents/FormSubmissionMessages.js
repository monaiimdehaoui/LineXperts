import React from 'react';

/*Customized messages displayed for form submissions*/
export const SuccessMessage = () => {
    return (
        <div className={"m-3"}>
            <div className={"success_div"}>
                <b>Record has been created successfully</b>
            </div>
        </div>
    );
}

export const FailureMessage = () => {
    return (
        <div className={"m-3"}>
            <div className={"alert_div"}>
            An error happened. Please try again later, review your form or
                contact your administrator.
            </div>
        </div>
    );
}
