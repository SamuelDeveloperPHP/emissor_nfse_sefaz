import React from "react";

export default function PrimaryButton({ className = '', disabled, children, ...props }:any) {
    return (
        <React.Fragment>
        <button
            {...props}
            className={
                `btn btn-success w-100'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
        </React.Fragment>
    );
}
