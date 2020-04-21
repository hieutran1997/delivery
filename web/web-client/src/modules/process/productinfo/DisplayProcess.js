import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';

function DisplayProcess(props) {
    const [code, setCode] = useState('');

    useEffect(()=>{
        if(props.productCode){
            setCode(props.productCode);
        }
    }, [props.productCode]);

    return (
        <div>
            {code}
        </div>
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayProcess);