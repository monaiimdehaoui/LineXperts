/*
import React, {Component} from "react";
import './css/dataImport.css';
import FilesAllowed from '../Data/accepted_files.json';
import {Collapse} from "react-bootstrap";

<<<<<<< HEAD
function example3(){
    return(
        <div className="container col-lg-8 col-md-11" id="mainbody">
=======
//Data Import Page

<<<<<<< HEAD
export default function DataImport(){
    return(
        <div className="App-Holder container col-lg-8 col-md-11" id="mainbody">
>>>>>>> update_27_Dec_DB_and_React
            <h2 className="head-2">Data Import Upload</h2>
            <h5>Import your data into the system</h5>
=======
export default class DataImport extends Component{
>>>>>>> 813821ad... Saving point 22 January

    constructor(props) {
        super(props);
        this.state ={
            key:'',
            filename:'No file selected yet',
            selectFile:'',
            inputError:'',
            inputFiles:false,
            open:false,
            files : {
                client:"clients.csv",
                corporate: "corporate_groups.csv",
                service: "services.csv",
                workforce: "workforce.csv"
            }
        };
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    };

    onFileChange(e){

        let file = e.target.files;
        let filename = "No file selected yet";

        if(e.target.files[0].name !== null){
            filename = e.target.files[0].name;
        }

        this.setState({inputFiles:file}, () =>{
            this.setState({filename:filename});
            this.handleValidation();
        });
    };

    onSelectChange = (e) =>{
        let val = e.target.value;
        this.setState({selectFile:val});
    }

    handleValidation = () =>{
        let files = this.state.inputFiles;
        let selectedFile = this.state.selectFile;
        let error = "This file is valid :)";
        let isFormValid = true;

        if(!files || files.length < 1){
            error = "Please enter a file before submitting";
            isFormValid = false;
        }
        if(files.length > 1){
            error= "WARNING -- Only one file at once can be submitted";
            isFormValid = false;
        }

        if(files[0] !== selectedFile){
            error= "WARNING -- Only one file at once can be submitted";
            isFormValid = false;
        }

        this.setState({inputError:error, inputFiles:files});
        return isFormValid;
    }

    onSubmit(){
        if(this.handleValidation()){
            console.log("The form was successful", this.state.inputFiles);
        }
        else{
            console.log("error", this.state);
        }
    };

    //To display additional information about the files
    toggle(){
        this.setState({open: !this.state.open});
    }

    handleReset(){
        this.setState({inputError:"", filename:'No file selected yet'});
    }

    render(){

        const keyVal = this.state.key;
        const inputError = this.state.inputError;
        const {open} = this.state;
        const {filename} = this.state;
        const {filenames} = this.state.files;

        return(
            <div id={"test"} className="App-Holder container col-lg-8 col-md-11 col-sm-12
            p-sm-5 p-md-5 p-lg-5">
                <div className={"col-lg-10 col-12 m-auto"} >
                    <h2 className="head-2">Data Import Upload</h2>
                    <div className={"row"}>
                        <h5 className={"col"}>Import your data into the system</h5>

                        <button id={"z-anclas"} className={"btn btn-red btn-sm dropdown-toggle"} onClick={this.toggle.bind(this)}
                                data-toggle={"dropdown"}>
                            Accepted File Format

                            <Collapse in={open} id={"z-hover"} style={{wordWrap:"break-word", whiteSpace:"pre-wrap"}}>
                                    <div className={"warning_div p-2"}>
                                        <p>The file must correspond to one of the following names:</p>
                                        <ul style={{listStyleType:"circle", paddingLeft:0}}>
                                            <li>{filenames.service}</li>
                                            <li>{filenames.client}</li>
                                            <li>{filenames.corporate}</li>
                                            <li>{filenames.workforce}</li>
                                        </ul>
                                    </div>
                            </Collapse>
                        </button>
                    </div>
                </div>

                <form onSubmit={this.onSubmit} noValidate={true}>
                    <div className="form-group m-lg-5 m-md-5 m-sm-2 mt-sm-4 mb-sm-4 mb-0 border border-info border-bottom-0
                     border-right-0 p-sm-1 p-lg-3
                    p-md-3 mw-50"><br/>
                    <p>Choose a file</p>

                        <select onChange={this.onSelectChange}>
                            <option value={filenames.service}>{filenames.service}</option>
                            <option value={filenames.client}>{filenames.client}</option>
                            <option value={filenames.corporate}>{filenames.corporate}</option>
                            <option value={filenames.workforce}>{filenames.workforce}</option>
                        </select>

                        <div className={"custom-file"}>
                            <label htmlFor="updateFiles" className={"custom-file-label m-0"}>
                                <span>{filename}</span>
                            </label>
                                <input type="file" key={keyVal}
                                       id="updateFiles" name="updateFiles" className={""} onChange={this.onFileChange}/>
                        </div>

                        <br/>
                        <p style={{display:"inline", paddingLeft:"20px"}} className={"alert_message"}>{inputError}</p>
                    </div>
                    <div className="mt-3 text-center">
                        <input type="reset" value={"Cancel"} className="btn btn-yellow" id="action-control" onClick={this.handleReset}/>
                        <input type="submit" value={"Import"} className="btn btn-orange ml-4" id="other-control"/>
                    </div>
                </form>

                <hr className={"mt-4"}/>

                <div className={"col-lg-7 col-md-10 col-sm-10 m-auto text-center"}>
                    <div id="div-warn" className={"mt-5 border border-warning border-right-0 border-bottom-0 rounded-left"}>
                        <small><span className={"text-danger"}>Attention!</span> Make sure your file is of type ".csv" <br/>
                            and that it respects the following format: <code>"value, value, value"</code></small>
                    </div>
                </div>
            </div>
<<<<<<< HEAD
<<<<<<< HEAD
        </div>
    )
}

export default example3;
=======

        </div>
    )
=======
        );
    }
>>>>>>> 813821ad... Saving point 22 January
}
<<<<<<< HEAD
>>>>>>> update_27_Dec_DB_and_React
=======
*/
