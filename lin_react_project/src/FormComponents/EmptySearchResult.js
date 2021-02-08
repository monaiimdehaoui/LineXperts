import React from "react";

//Returns error message when no results are found in a search
export default function EmptySearchResult(props) {
    return(
        <div className={"m-4"}>
            <div className={"p-2 w-50 no_result_div"}>
                <p><b>Sorry, we couldn't find any matches for "<i>{props.entry}</i>"</b></p>
                <p className={"pt-1"}>We suggest you to review your search for typo errors or <wbr/>
                create a new "{props.searchEntity}"</p>
            </div>
        </div>
    );
}
