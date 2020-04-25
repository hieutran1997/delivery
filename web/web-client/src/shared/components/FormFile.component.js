import React, { forwardRef, useState } from 'react';
import { Upload, Button, Row } from 'antd';
import { UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { downloadFile, removeFile } from '../../shared/actions/system/ActionFile';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { DOWNLOAD_FILE_SUCCESS, REMOVE_FILE_SUCCESS } from '../constants/ActionTypes';
import { openNotification, message } from '../common';

const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

const mapStateToProps = state => ({
    file: state.fileReducer
});

const mapDispatchToProps = dispatch => {
    return {
      downloadFile: id => dispatch(downloadFile(id)),
      removeFile: id => dispatch(removeFile(id))
    }
}

var fileName = '';
var idFileDelete = '';

const FormFile = forwardRef((props, ref) => {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState({});
    const [listValue, setListValue] = useState([]);
    
    React.useEffect(() => {
        props.register({ name: `${props.valueName}` }, props.validation || null); // custom register react-select 
    }, [props.valueName, props.validation]);

    React.useEffect(() => {
        if(props.fileAttachment){
            setSelectedFileList([]);
            setListValue(props.fileAttachment.file);
        }
        else{
            props.setValue(props.valueName, []);
        }
    }, [props.fileAttachment, setListValue]);

    React.useEffect(() => {
        if(props.file){
            if(props.file.type === DOWNLOAD_FILE_SUCCESS){
                saveAs(props.file.data, fileName);
            }
            else if(props.file.type === REMOVE_FILE_SUCCESS){
                let listTemp = listValue.filter(item => item.id !== idFileDelete);;
                setListValue(listTemp);
                openNotification('success', 'Thành công', message.deleteSuccess);
            }
            else if(props.file.error){
                openNotification('error', 'Lỗi', message.messageError);
            }
        }
    }, [props.file]);

    const onChange = info => {
        const lstFile = selectedFileList;
        switch (info.file.status) {
            case "uploading":
                lstFile.push(info.file);
                let listFileReal = [];
                lstFile.forEach(function(item){
                    listFileReal.push(item.originFileObj);
                });
                props.setValue(props.valueName, listFileReal);
                setSelectedFileList(lstFile);
                break;
            case "done":
                setSelectedFile(info.file);
                break;
            default:
                // error or removed
                setSelectedFileList([]);
                setSelectedFile({});
                console.log('selectedFile', selectedFile);
        }
    };

    const handleRemove = fileId => {
        var fileList = selectedFileList.filter(item => item.uid !== fileId);
        props.setValue(props.valueName, fileList);
        setSelectedFileList(fileList);
    };

    const handleDownloadFile = file => {
        fileName = file.fileName;
        props.downloadFile(file.id);
    }
    
    const handleRemoveFileServer = fileId => {
        props.removeFile(fileId);
        idFileDelete = fileId;
    }

    return (
        <div className="custom-upload">
            <Upload
                showUploadList={false}
                multiple={props.multiple}
                fileList={selectedFileList}
                customRequest={dummyRequest}
                onChange={onChange}
                className='upload-list-inline'>
                <Button>
                    <UploadOutlined /> Tải lên
                </Button>
            </Upload>
            {selectedFileList.map(file => (
                <Row key={file.uid} className="file-row-data">
                    <span style={{float: "left"}}>{file.name}{" "}</span>
                    <DeleteOutlined style={{float: "right"}} onClick={() => handleRemove(file.uid)} className="icon-action icon-delete" title="Xóa"/>
                </Row>
            ))}
            {listValue ? listValue.map(file => (
                <Row key={file.id} className="file-row-data">
                    <span style={{float: "left"}}>{file.fileName}{" "}</span>
                    <DeleteOutlined style={{float: "right"}} onClick={() => handleRemoveFileServer(file.id)} className="icon-action icon-delete" title="Xóa"/>
                    <DownloadOutlined style={{float: "right"}} onClick={() => handleDownloadFile(file)} className="icon-action icon-edit" title="Tải xuống"/>
                </Row>
            )) : ""}
        </div>
    );
});

FormFile.defaultProps = {
    valueName: '',
    inputClassName: '',
    placeholder: '',
    labelClassName: '',
    labelName: '',
    setValue: null,
    value: '',
    register: null,
    validation: { required: false },
    fileAttachment: [],
    typeOf: ''
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFile);
