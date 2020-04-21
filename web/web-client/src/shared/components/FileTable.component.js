import React, { forwardRef, useState } from 'react';
import { Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadFile } from '../../shared/actions/system/ActionFile';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { DOWNLOAD_FILE_SUCCESS } from '../constants/ActionTypes';

const mapStateToProps = state => ({
    file: state.fileReducer
});

const mapDispatchToProps = dispatch => {
    return {
      downloadFile: id => dispatch(downloadFile(id))
    }
}

var fileName = '';

const TableFile = forwardRef((props, ref) => {
    const [listValue, setListValue] = useState([]);

    React.useEffect(() => {
        if(props.fileAttachment){
            setListValue(props.fileAttachment.file);
        }
    }, [props.fileAttachment, setListValue]);

    React.useEffect(() => {
        if(props.file){
            if(props.file.type === DOWNLOAD_FILE_SUCCESS){
                saveAs(props.file.data, fileName);
            }
        }
    }, [props.file]);

    const handleDownloadFile = file => {
        fileName = file.fileName;
        props.downloadFile(file.id);
    }

    return (
        <>
            {listValue ? listValue.map(file => (
                <Row key={file.id} className="file-row-data">
                    <span style={{float: "left"}}>{file.fileName}{" "}</span>
                    <DownloadOutlined style={{float: "right"}} onClick={() => handleDownloadFile(file)} className="icon-action icon-edit" title="Tải xuống"/>
                </Row>
            )) : ""}
        </>
    );
});

TableFile.defaultProps = {
    valueName: '',
    inputClassName: '',
    placeholder: '',
    labelClassName: '',
    labelName: '',
    setValue: null,
    value: '',
    register: null,
    validation: { required: false },
    fileAttachment: []
};

export default connect(mapStateToProps, mapDispatchToProps)(TableFile);