import React from 'react';

export default function EmptySearchMessage(props){
    return(
        <div className={"m-4"}>
            <div className={"p-2 w-50 no_result_div"}>
                <p>Sorry, an error happened in the server. Please try again later.</p>
            </div>
        </div>
    );
}
