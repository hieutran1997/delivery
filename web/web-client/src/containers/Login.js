import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Form, Icon, Input, Button, Checkbox  } from 'antd';
import 'antd/dist/antd.css';
import './Login.css';
import { login } from '../actions';
import { Route } from 'react-router-dom'; 
import { openNotification } from '../common';

const homePage = {
    pathname: '/',
    state: { firstPage: true }
}

class Login extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLogin(values.username, values.password);
            }
        });
    };

    componentWillReceiveProps(newProps) {
        const { authRecieve } = newProps;
        if(authRecieve){
            if(!authRecieve.unauthorized){
                if(authRecieve.error){
                    openNotification('error', 'Thất bại', 'Đăng nhập không thành công!');
                }else{
                    openNotification('success', 'Thành công', 'Đăng nhập thành công!');
                    this.props.history.push(homePage);
                    this.props.history.replace(homePage);
                }
            }
        }
    }

    // openNotification(type, message, description) {
    //     const args = {
    //       message: message,
    //       description: description,
    //       duration: 0,
    //     };
    //     if(type === 'error'){
    //         notification.error(args);
    //     }
    //     else{
    //         notification.success(args);
    //     }
    //   };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="formLogin">
                <Row gutter={16}>
                    <Col span={10} offset={7}>
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
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Mật khẩu"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Ghi nhớ</Checkbox>)}
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Đăng nhập
                                    </Button>
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

const LoginLayout = ({ children }) => (                         
    <div> 
      {children}                                       
    </div>  
  );  

const LoginLayoutRoute = ({component: Component, ...rest}) => {  
    return (  
      <Route {...rest} render={matchProps => (  
        <LoginLayout>  
            <Component {...matchProps} />  
        </LoginLayout>  
      )} />  
    )  
  };  

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

export {LoginLayoutRoute};
