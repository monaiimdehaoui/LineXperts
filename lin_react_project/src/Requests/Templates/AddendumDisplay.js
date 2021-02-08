import React, {useState} from 'react';
import Collaspible from 'react-collapsible';
import {Link} from "react-router-dom";

//Display Contracts and their Addendum

const extract_data = (e) =>{
    let values = e.toString().split(",");

    return  <tr key={values[4]}>
        <td>
            <Link to={`/update-addendum/${values[4]}`}>
                <button className={"btn btn-orange btn-sm"}>Update</button>
            </Link>
        </td>
        <td>{values[4]}OMG</td>
        <td>{values[6]}</td>
        <td>{values[7] === null ? "N/A" : values[7]}</td>
        <td>{values[8]}</td>
    </tr>;
};

export default function AddendumDisplay(props){


    //Handling if a single addendum or an array was requested
    let addendumList = <></>;

    //We are getting from addendum handler
    //an array having all the addendums from all the contracts of the user
    //Its a 2-d array
    addendumList = props.info.map((con) =>{
        return con.map((ext) =>{
            extract_data(ext);
        });
    });

    /*for(let i =0; i<props.info.length; i++){
        for(let n=0;n<props.info[i].length; n++){
            addendumList.push(extract_data(props.info[i][n]));
        }
    }*/

    return(
        <div>
            <h3 className={"form-head"}>Related Addendums</h3>

            <Collaspible trigger={"Contract: "} classParentString={"collaps"}
            contentOuterClassName={"outer_collaps"}>
                <table className="table_results table table-hover table-bordered table-striped
                p-0 m-0 ml-0">
                    <thead className={"thead-dark"}>
                    <tr>
                        <th>Action</th>
                        <th>Addendum ID</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addendumList}
                    </tbody>
                </table>
            </Collaspible>
        </div>
    );
}
