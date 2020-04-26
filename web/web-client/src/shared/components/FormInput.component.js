import React, { forwardRef, useState } from 'react';
// import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../common';
import { DatePicker } from 'antd';
import { DateFormat } from '../common';
import moment from 'moment';

const toDay = new Date();
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
    const [value, setValue] = useState();

    React.useEffect(() => {
        props.register({ name: `${props.valueName}` }, props.validation || null); // custom register react-select 
        setValue(null);
        if (props.value && props.type === typeOfDynamicInput.DATE_TIME) {
            setValue(props.value);
            props.setValue(props.valueName, props.value.toUTCString());
        }
    }, [props.register, props.valueName, props.value, props.validation, props.type]);

    React.useEffect(() => {
        if(props.type === typeOfDynamicInput.SELECT_FILTER){
            setValue(props.valueFilter);
        }
        else if(props.type === typeOfDynamicInput.TEXT_AREA){
            setValue(props.value);
        }
    }, [props.valueFilter, props.type, props.value]);

    const onChangeDate = (ev, str) => {
        if (ev != null) {
            setValue(ev.toDate());
            props.setValue(props.valueName, ev.toDate().toUTCString());
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
                    value={value ? moment(value, DateFormat) : moment(toDay, DateFormat)}
                    disabled={props.disabled}
                    placeholder="Chọn ngày"
                    format={DateFormat} />

                <BindingError errors={props.errors} name={props.valueName}></BindingError>
            </>
        );
    }
    else if (props.type === typeOfDynamicInput.SELECT_FILTER) {
        return (
            <>
                <span className={props.labelClassName}>{props.labelName} {
                    props.validation.required && props.validation.required === true ? <span className="label-required">*</span> : ""
                }</span>
                <br />
                <select name={props.valueName} value={value? value : 0} className={props.inputClassName} disabled={props.disabled} onChange={(ev) => { setValue(ev.target.value); props.onChange ? props.onChange(ev) : void 0 }}
                    ref={props.register(props.validation)} >
                    <option>{props.placeholder}</option>
                    {props.options ? props.options.map((item, index) => (
                        <option key={index} value={item[props.dataKey]} >{item[props.optionLabel]}</option>
                    )) : <></>}
                </select>
            </>
        );
    }
    else if (props.type === typeOfDynamicInput.TEXT_AREA) {
        return (
            <>
                <span className={props.labelClassName}>{props.labelName} {
                    props.validation.required && props.validation.required === true ? <span className="label-required">*</span> : ""
                }</span>
                <br />
                <textarea name={props.valueName} value={value? value : ""} className={props.inputClassName} disabled={props.disabled}
                    onChange={ev => { setValue(ev.target.value); props.onChange ? props.onChange(ev) : void 0; }}
                    placeholder={props.placeholder}
                    ref={props.register(props.validation)} />
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
                    ref={props.register(props.validation)} disabled={props.disabled} />
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
    onChange: null,
    disabled: false,
    options: [],
    showClear: null,
    optionLabel: 'name',
    filterBy: 'name',
    dataKey: 'value',
    valueFilter: 0
};