import React, { forwardRef, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { downloadFile, removeFile } from '../actions/system/ActionFile';
import { connect } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { environments_dev } from '../../environment';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const FormAvatar = forwardRef((props, ref) => {
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    React.useEffect(() => {
        if(props.fileAttachment && props.fileAttachment.avatar && props.fileAttachment.avatar.length > 0){
            setImageUrl(`${environments_dev.URL_SERVICE_FILE}/file/avatar/image/${props.fileAttachment.avatar[0].id}`);
        }
        else{
            props.setValue(props.valueName, null);
            setImageUrl(null);
        }
    }, [props.fileAttachment]);

    React.useEffect(() => {
        props.register({ name: `${props.valueName}` }, props.validation || null); // custom register react-select
        setImageUrl(null);
    }, [props.valueName, props.validation]);

    const onChange = info => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            props.setValue(props.valueName, info.file.originFileObj);
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoading(false);
            });
            return;
        }
    };
    return (
        <div className="custom-upload">
            <p>Ảnh đại diện:</p>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={dummyRequest}
                onChange={onChange}
                beforeUpload={beforeUpload}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </div>
    );
});

FormAvatar.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAvatar);
