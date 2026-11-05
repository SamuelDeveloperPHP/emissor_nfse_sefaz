import React, { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }:any, ref) {
    const input:any = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <React.Fragment>
        <input
            {...props}
            type={type}
            className={
                'form-control ' +
                className
            }
            ref={input}
        />
        </React.Fragment>
    );
});
