import React, { forwardRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

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

export const FormAutoComplete = forwardRef((props, ref) => {
    const [value, setValue] = useState({});

    React.useEffect(() => {
        props.register({ name: `${props.valueName}` }, props.validation || null); // custom register react-select 
    }, [props.register, props.valueName, props.validation]);

    React.useEffect(() => {
        if(props.value !== null){
            let dataSelected = props.options.find(x=>x[props.dataKey] === props.value);
            setValue(dataSelected);
        }
    }, [props.value, props.options, props.dataKey, setValue]);
    
    const changeValue = (ev) => {
        setValue(ev.value);
        if (props.onChange) {
            props.onChange(ev)
        }
        if (ev.value) {
            props.setValue(props.valueName, ev.value[props.dataKey]);
        } else {
            props.setValue(props.valueName, null);
        }
    }
    return (
        <>
            <span className={props.labelClassName}>{props.labelName} {
                props.validation.required && props.validation.required === true ? <span className="label-required">*</span> : ""
            }</span>
            <Dropdown
                className={props.inputClassName}
                name={props.valueName}
                value={value}
                dataKey={props.dataKey}
                options={props.options}
                optionLabel={props.optionLabel}
                onChange={changeValue}
                filter={props.filter}
                filterPlaceholder={props.filterPlaceholder}
                filterBy={props.filterBy}
                showClear={props.showClear}
                width="100%"
            />
            <BindingError errors={props.errors} name={props.valueName}></BindingError>

        </>
    );
});

FormAutoComplete.defaultProps = {
    valueName: '',
    inputClassName: '',
    labelClassName: '',
    labelName: '',
    setValue: null,
    register: null,
    validation: { required: false },
    id: '',
    name: '',
    value: null,
    options: [],
    optionLabel: '',
    style: {},
    className: '',
    autoWidth: false,
    scrollHeight: '',
    filter: false,
    filterBy: '',
    filterPlaceholder: '',
    editable: false,
    placeholder: '',
    required: false,
    disabled: false,
    appendTo: null,
    tabIndex: null,
    autoFocus: false,
    filterInputAutoFocus: false,
    lazy: false,
    panelClassName: '',
    panelStyle: {},
    dataKey: '',
    inputId: '',
    showClear: false,
    maxLength: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabel: '',
    ariaLabelledBy: '',
    itemTemplate: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null,
};