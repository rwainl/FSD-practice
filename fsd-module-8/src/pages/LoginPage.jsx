
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, message, Spin } from 'antd';
import {login} from '../services/authService'
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { login: setAuthLogin } = useAuth();
    const [error, setError] = useState(false);

    if(loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                <Spin size='large' />
            </div>
        )
    }

    const from = location.state?.from?.pathname || '/';

    const onFinish = async(values) => {
        setLoading(true);
        setError(false);
        try {
            const response = await login(values.email, values.password);
            setAuthLogin(response.user, response.token);
            message.success('Login successful! Welcome ' + response.user.name);
            navigate(from, {replace: true});
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed Login.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <Card className="w-full max-w-md shadow-lg">
            <div className="text-center mb-6">
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Login</h1>
                <p className='text-gray-600'>
                    Health E-Commerce
                </p>
            </div>
            {error && (
                <Alert
                    message="Login Error"
                    description={error}
                    type="error"
                    showIcon
                    closable
                    className='mb-4'
                    onClose={() => setError(false)}
                />
            )}

            <Form
                name="Login"
                layout='vertical'
                autoComplete='off'
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email required",
                        },
                        {
                            type: "email",
                            message: "Invalid email",
                        }
                    ]}
                >
                    <Input 
                        prefix={<UserOutlined />}
                        placeholder='Email'
                        size='large'
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password required",
                        },
                    ]}
                >
                    <Input.Password 
                        prefix={<LockOutlined />}
                        placeholder='Password'
                        size='large'
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                        size="large"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
  )
}

export default LoginPage

