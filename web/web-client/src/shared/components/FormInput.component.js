import React, { forwardRef } from 'react';
// import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../common';
 
export const FormInputComponent = forwardRef((props, ref) => {
    if(props.type === typeOfDynamicInput.INPUT){
        return (
            <>
                <span className={ props.labelClassName }>{props.labelName}</span>
                <input name={props.valueName} className={props.inputClassName} placeholder={props.placeholder} ref={ref} />
            </>
        );
    }
    else{
        return (
            <>
                <span className={ props.labelClassName }>{props.labelName}</span>
                <input name={props.valueName} className={props.inputClassName} placeholder={props.placeholder} ref={ref} />
            </>
        );
    }
    
});

FormInputComponent.defaultProps = {
    valueName: '',
    inputClassName: '',
    placeholder: '',
    labelClassName: '',
    labelName: '',
    type: typeOfDynamicInput.INPUT
};