import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Form, Icon, Input, Button, Checkbox, Spin  } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import { login } from '../shared/actions/system/ActionAuth';
import { openNotification, getCurrentUser } from '../shared/common';

const homePage = {
    pathname: '/admin',
    state: { firstPage: true }
}

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Login extends React.Component {
    state = { loading: false };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                this.props.onLogin(values.username, values.password);
            }
        });
    };

    componentDidMount(){
        var currentUser = getCurrentUser();
        if(currentUser !== null && currentUser !== undefined){
            this.props.history.replace(homePage);
        }
    }

    reload(){
        window.location.reload();
    }

    componentWillReceiveProps(newProps) {
        const { authRecieve } = newProps;
        if(authRecieve){
            if(!authRecieve.unauthorized){
                this.setState({ loading: false });
                if(authRecieve.error){
                    openNotification('error', 'Thất bại', 'Đăng nhập không thành công!');
                }else if(getCurrentUser()){
                    openNotification('success', 'Thành công', 'Đăng nhập thành công!');
                    this.props.history.replace(homePage);
                }
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="formLogin">
                    <Row gutter={16}>
                        <Col span={7} offset={9}>
                            <Card style={{ width: '100%' }} title="Đăng nhập">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="Tên đăng nhập"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input.Password
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Mật khẩu"
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item className="class-loadding">
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(<Checkbox>Ghi nhớ</Checkbox>)}
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Đăng nhập
                                        </Button>
                                    </Form.Item>
                                    <Form.Item className="class-loadding">
                                        <Spin spinning={this.state.loading} indicator={antIcon} tip="Đang đăng nhập..."></Spin>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
            </div>

        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

const mapDispatchToProps = dispatch => ({
    onLogin: (username, password) => dispatch(login(username, password)),
});

const mapStateToProps = state => {
    return {
        authRecieve: state.authReducer
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(WrappedNormalLoginForm);
