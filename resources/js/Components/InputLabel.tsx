import React from "react";

export default function InputLabel({ value, className = '', children, ...props }:any) {
    return (
        <React.Fragment>
        <label {...props} className={`form-label ` + className}>
            {value ? value : children}
        </label>
        </React.Fragment>
    );
}
