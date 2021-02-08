import React, {Component} from "react";

class wrkAssignForm extends Component{
    render(){
        return(
            <div className={"App-Holder container"}>
               <h1>Workforce Assignment</h1>

                <p>Information about the specific addendum and contract</p>
                <p>Table shoul dhave checkboxes to update who is assigned here</p>

                <form>

                <table>

                </table>

                    <input type={"submit"} className={"btn btn-info"} value={"Save Changes"}/>

                </form>
            </div>
        )
    }
}
export default wrkAssignForm;