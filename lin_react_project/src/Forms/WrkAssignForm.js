import React, {Component} from "react";

class wrkAssignForm extends Component{
    render(){
        return(
            <div className={"App-Holder col-lg-8 col-md-11"}>
               <h2 className={"head-2"}>Workforce Assignment</h2>

                <p>Information about the specific addendum and contract</p>
                <p>Table should have checkboxes to update who is assigned here</p>

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