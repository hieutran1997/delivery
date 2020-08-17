import React, { forwardRef, useState } from 'react';
import { Row, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadFile } from '../../shared/actions/system/ActionFile';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import { DOWNLOAD_FILE_SUCCESS } from '../constants/ActionTypes';
import { environments_dev } from '../../environment';

const mapStateToProps = state => ({
    file: state.fileReducer
});

const mapDispatchToProps = dispatch => {
    return {
        downloadFile: id => dispatch(downloadFile(id))
    }
}

var fileName = '';
var firstDownload = 0;
const TableFile = forwardRef((props, ref) => {
    const [listValue, setListValue] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    React.useEffect(() => {
        if (props.fileAttachment) {
            setListValue(props.fileAttachment.file);
        }
    }, [props.fileAttachment, setListValue]);

    React.useEffect(() => {
        if (props.file) {
            if (props.file.type === DOWNLOAD_FILE_SUCCESS) {
                if (fileName !== '' && firstDownload === 1) {
                    firstDownload = 0;
                    saveAs(props.file.data, fileName);
                }

            }
        }
    }, [props.file]);

    const handleDownloadFile = file => {
        fileName = file.fileName;
        firstDownload = 1;
        props.downloadFile(file.id);
    }

    const checkFile = fileName => {
        let indexJpg = fileName.indexOf("jpg");
        let indexPng = fileName.indexOf("png");
        let indexJpeg = fileName.indexOf("jpeg");
        if (indexJpg >= 0 || indexPng >= 0 || indexJpeg>=0) {
            return 'image';
        }
        return 'file'
    }

    if (props.type !== 'image') {
        return (
            <>
                {listValue ? listValue.map(file => (
                    <Row key={file.id} className="file-row-data">
                        <span style={{ float: "left" }}>{file.fileName}{" "}</span>
                        <DownloadOutlined style={{ float: "right" }} onClick={() => handleDownloadFile(file)} className="icon-action icon-edit" title="Tải xuống" />
                    </Row>
                )) : ""}
            </>
        );
    }
    else {
        return (
            <>
                <div className="col-image-data">
                    {listValue ? listValue.map(file => (
                        <div key={file.id} style={{ display: 'inline-table' }}>
                            {checkFile(file.fileName) === 'image' ?
                                <div className="file-image-data" onClick={() => { setPreviewVisible(true); setPreviewImage(`${environments_dev.URL_SERVICE_FILE}/file/avatar/image/${file.id}`) }}>
                                    <img className="image-show" src={`${environments_dev.URL_SERVICE_FILE}/file/avatar/image/${file.id}`} alt={`${file.fileName}`} />
                                </div> :
                                <div style={{
                                    display: 'flex',
                                    margin: '10px'
                                }}>
                                    <Row className="file-row-data">
                                        <span style={{ float: "left" }}>{file.fileName}{" "}</span>
                                        <DownloadOutlined style={{ float: "right", marginLeft: '10px' }} onClick={() => handleDownloadFile(file)} className="icon-action icon-edit" title="Tải xuống" />
                                    </Row>
                                    <br />
                                </div>}

                        </div>
                    )) : ""}
                </div>
                <Modal visible={previewVisible} footer={null} onCancel={() => { setPreviewVisible(false) }}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
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