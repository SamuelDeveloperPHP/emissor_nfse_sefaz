import React from "react";

export default function InputError({ message, className = '', ...props }:any) {
    return message ? (
        <React.Fragment>
        <p {...props} className={'invalid-feedback ' + className}>
            {message}
        </p>
        </React.Fragment>
    ) : null;
}
