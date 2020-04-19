import React, { forwardRef, useState } from 'react';
// import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../common';
import { DatePicker } from 'antd';
import { DateFormat } from '../common';
import { Dropdown } from 'primereact/dropdown';
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
    }, [props.valueName, props.value, props.validation, props]);

    React.useEffect(() => {
        if (props.value !== null) {
            let dataSelected = props.options.find(x => x[props.dataKey] === props.value);
            setValue(dataSelected);
        }
    }, [props.value, props.options, props.dataKey, setValue]);

    return (
        <>
            <div>aaaa</div>
        </>
    );

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
    dataKey: 'value'
};