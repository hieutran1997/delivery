import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Card } from 'antd';

function HasNotPermission(props) {
    
    useEffect(() => {
        console.log('Bạn không có quyền truy cập!')
    });


    return (
        <div>
            <Card>
                <div style={{ color: 'red', padding: 0, textAlign: 'center' }}><b >Bạn không có quyền truy cập!</b></div>
            </Card>
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
)(HasNotPermission);
