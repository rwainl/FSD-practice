import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, Card, message, Divider } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/authService'

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState('false');
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const userData = {
                name: values.name,
                email: values.email,
                password: values.password,
                role: 'User',
            };

            const response = await register(userData);

            login(response.user, response.token);

            message.success('Registration success.');
            navigate('/', { replace: true });
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-12'>
        <Card
            className='w-full max-w-md shadow-xl'
            style={{ borderRadius: '12px' }}
        >
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserOutlined className='text-3xl text-green-600' />
                </div>
                <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                    Register
                </h1>
                <p className='text-gray-500'>
                    Create account to start buying.
                </p>
            </div>

            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                autoComplete='off'
                layout='vertical'
                size='large'
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true, message: 'Name required.'
                        },
                        {
                            min: 3, message: 'Min. 3 characters.'
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder='John Doe' autoComplete='name' />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true, message: 'Email required.'
                        },
                        {
                            type: 'email', message: 'Invalid format email.'
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder='johndoe@example.com' autoComplete='email' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true, message: 'Password required.'
                        },
                        {
                            min: 6, message: 'Min. 6 characters.'
                        },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Password must have uppercase, lowercase, and number.'
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='password' autoComplete='new-password' />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true, message: 'Confirm password required.'
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if(!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Password not correct'));
                            }
                        })
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='password' autoComplete='new-password' />
                </Form.Item>
                <Form.Item className='mb-4'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block
                        loading={loading}
                        icon={<UserOutlined />}
                        className='!h-12 !text-base font-semibold'
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </div>
  )
}

export default RegisterPage