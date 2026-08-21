import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, message, Avatar, Divider, Tag, Upload } from 'antd'
import { UserOutlined, MailOutlined, SaveOutlined, ShoppingOutlined, UploadOutlined, CameraOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'
import { getProfile } from '../services/authService'

function ProfilePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [form] = Form.useForm()

    useEffect(() => {
        if(user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || '',
            });
            // setPhotoUrl(user.profilePhoto || null);
        }
    }, [user, form]);

    // const handleImageChange = (info) => {
    //     if(info.file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setPhotoUrl(e.target.result);
    //         };
    //         reader.readAsDataURL(info.file.originFileObj);
    //         setImageFile(info.file.originFileObj);
    //     }
    //     return false;
    // };

    const onFinish = async(values) => {
        setLoading(true);
    }
    
    return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-24 md:pt-32 pb-8 sm:pb-10'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-gray-800'>
            My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className='lg:col-span-1'>
                <div className="text-center">
                    <div className="relative inline-block mb-4">
                        <Avatar 
                            size={100}
                            src=""
                            icon={<UserOutlined />}
                            className='bg-blue-500'
                        />
                        <Upload
                            showUploadList={false}
                            // beforeUpload={handleImageChange}
                            accept='image/*'
                        >
                            <Button
                                icon={<CameraOutlined />}
                                shape='circle'
                                size='small'
                                className='absolute bottom-0 right-0'
                                title='Change photo'
                            />
                        </Upload>
                    </div>
                    <h2 className='text-xl font-bold text-gray-800 mb-2'>
                        {user?.name || 'User'}
                    </h2>
                    <p className='text-gray-500 mb-4'>{user?.email || '-'}</p>
                    <Tag color={user?.role === 'Admin' ? 'red' : 'blue'} className='mb-4'>
                        {user?.role}
                    </Tag>

                    <Divider />

                    <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center">
                            <span className='text-gray-600'>Member since:</span>
                            <span className='font-semibold'>2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className='text-gray-600'>Total Orders:</span>
                            <span className='font-semibold'>0</span>
                        </div>
                    </div>

                    <Button
                        type='dashed'
                        block
                        className='mt-4'
                        icon={<ShoppingOutlined />}
                        onClick={() => window.location.href = '/products'}
                    >
                        Explore Products
                    </Button>
                </div>
            </Card>

            <Card
                title="Form Edit"
                className='lg:col-span-2'
            >
                <Form
                    form={form}
                    name='profile'
                    onFinish={onFinish}
                    layout='vertical'
                    size='large'
                >
                    <Form.Item 
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Name required',
                            },
                            {
                                min: 3,
                                message: 'Min. 3 characters',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='John Doe' />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        tooltip="Email can't changed"
                    >
                        <Input prefix={<MailOutlined />} placeholder='johndoe@gmail.com' disabled />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                    >
                        <Input prefix={<PhoneOutlined />} placeholder='0123456789' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input.TextArea rows={3} prefix={<HomeOutlined />} placeholder='Kenanga Sr. No. 7' />
                    </Form.Item>
                    <Form.Item
                        label="Photo Profile"
                    >
                        <Upload
                            showUploadList={false}
                            // beforeUpload={handleImageChange}
                            accept='image/*'
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                {/* {imageFile ? "Change Photo" : "Upload Photo"} */}
                            </Button>
                        </Upload>
                        {/* {imageFile && (
                            <p className='text-sm text-gray-500 mt-2'>
                                New photo will be uploaded after saving.
                            </p>
                        )} */}
                    </Form.Item>
                    <Form.Item>
                        <div className="flex gap-3">
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                icon={<SaveOutlined />}
                                className='flex-1'
                            >
                                Save Change
                            </Button>
                            <Button
                                // onClick={handleRefresh}
                                loading={refreshing}
                            >
                                Refresh
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                <Divider>Change Password (Optional)</Divider>

                <Form.Item
                    label="Password"
                    name="password"
                    tooltip="Optional"
                    rules={[
                        {
                            min: 6,
                            message: "Password at least 6 characters",
                        }
                    ]}
                >
                    <Input.Password placeholder='New Password (Optional)' />
                </Form.Item>
            </Card>
        </div>
    </div>
  )
}

export default ProfilePage

