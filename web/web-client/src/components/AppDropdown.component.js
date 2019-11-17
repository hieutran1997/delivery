import React, {forwardRef, useState} from 'react';
import {Dropdown} from 'primereact/dropdown';

export const AppDropdown = forwardRef((props, ref) =>{
    const [seleted, setSelected] = useState('');
    
    const setValue = (e) => {
        props.setValue(e.value);
        setSelected(e.value);
    }

    return(
        <Dropdown
                value={seleted}
                dataKey={props.dataKey}
                ref={ref}
                options={props.options} 
                onChange={setValue} 
                filter={true} 
                filterPlaceholder= {props.placeholder} 
                filterBy= {props.filterBy}
                showClear={props.showClear}
                optionLabel={props.optionLabel}
        />
    );
});

AppDropdown.defaultProps = {
    dataKey: 'value',
    options: [],
    onChange: null,
    filter: false,
    filterPlaceholder: '',
    filterBy: [],
    showClear: false,
};