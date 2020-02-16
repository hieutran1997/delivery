import React, { forwardRef, useState } from 'react';
// import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../common';
import { DatePicker } from 'antd';
import { DateFormat } from '../common';
import moment from 'moment';

const BindingError = (props) => {
    return (
        <p className="label-error">
            {
                props.errors[props.name] &&
                props.errors[props.name].type === "required" &&
                `Không được để trống`
            }
            {
                props.errors[props.name] &&
                props.errors[props.name].type === "maxLength" &&
                `Không vượt quá ${props.errors[props.name].ref.size} ký tự`
            }
        </p>
    );
}

export const FormInput = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);

    React.useEffect(() => {
        props.register({ name: `${props.valueName}` }, props.validation || null); // custom register react-select 
        if (props.value) {
            props.setValue(props.valueName, moment(props.value, DateFormat));
        }
    }, [props]);

    const onChangeDate = (ev, str) => {
        if (ev != null) {
            setValue(ev.toDate());
            props.setValue(props.valueName, ev.toDate());
        }
        if (props.onChange) {
            props.onChange(ev);
        }
    }

    if (props.type === typeOfDynamicInput.DATE_TIME) {
        return (
            <>
                <span className={props.labelClassName}>{props.labelName} {
                    props.validation.required && props.validation.required === true ? <span className="label-required">*</span> : ""
                }</span>
                <br />
                <DatePicker
                    className={props.inputClassName}
                    onChange={onChangeDate}
                    defaultValue={props.value ? moment(props.value, DateFormat):null}
                    format={DateFormat} />

                <BindingError errors={props.errors} name={props.valueName}></BindingError>
            </>
        );
    }
    else if (props.type === typeOfDynamicInput.TEXT_AREA) {
        return (
            <>
                <span className={props.labelClassName}>{props.labelName}</span>
                <textarea name={props.valueName} value={value} className={props.inputClassName}
                    onChange={ev => { props.setValue(props.valueName, ev.target.value); setValue(ev.target.value); props.onChange ? props.onChange(ev) : void 0; }}
                    placeholder={props.placeholder}
                    ref={props.register} />
                <BindingError errors={props.errors} name={props.valueName}></BindingError>
            </>

        );
    } else {
        return (
            <>
                <span className={props.labelClassName}>{props.labelName} {
                    props.validation.required && props.validation.required === true ? <span className="label-required">*</span> : ""
                }</span>
                <input name={props.valueName}
                    className={props.inputClassName}
                    placeholder={props.placeholder}
                    onChange={(ev) => { props.onChange ? props.onChange(ev) : void 0 }}
                    ref={props.register(props.validation)} />
                <BindingError errors={props.errors} name={props.valueName}></BindingError>

            </>
        );
    }

});

FormInput.defaultProps = {
    valueName: '',
    inputClassName: '',
    placeholder: '',
    labelClassName: '',
    labelName: '',
    type: typeOfDynamicInput.INPUT,
    setValue: null,
    value: '',
    register: null,
    validation: { required: false },
    onChange: null
};