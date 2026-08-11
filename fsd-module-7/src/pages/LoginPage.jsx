// TODO: Import useState
// TODO: Import Form, Input, Button, Card dari antd
// TODO: Import useNavigate dari react-router-dom
// TODO: Import api
import { useState } from "react";
import { Form, Input, Button, Card, Spin, Alert } from "antd";
import {login} from "../services/api";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";


function LoginPage() {
  // TODO: State untuk form (email, password)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // TODO: State untuk loading
  if(loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Spin size="large" tip="Loading product details..." />
      </div>
    )
  }

  // TODO: Handle submit:
  // - Call API login
  // - Save token ke localStorage
  // - Navigate ke /products
  const onFinish = async(values) => {
    setLoading(true);
    setError(false);
    try {
      const response = await login(values);
      if(response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/products');
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // TODO: Create form dengan Ant Design Form component

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <p className="text-gray-600">Health E-commerce</p>
        </div>
        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            closable
            className="mb-4"
            onClose={() => setError(false)}
          />
        )}

        <Form
          name="Login"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {required: true, message: 'Email required'},
              {type: "email", message: "Invalid Email"},
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {required: true, message: 'Password required'},
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
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
  );
}

export default LoginPage;
