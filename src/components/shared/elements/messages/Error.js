////////////////////
//// Build
import React from 'react'
import { ErrorMessage } from "../Text";

////////////////////
//// Environmental

////////////////////
//// External

export default function Error({text, ...props}) {

    return (
        <ErrorMessage {...props}>
            {text}
        </ErrorMessage>
    )
}



/** Created by ownwindows on 04-01-22 **/
