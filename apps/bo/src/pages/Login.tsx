import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    // 模擬 API 請求
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'password') {
        localStorage.setItem(
          'user',
          JSON.stringify({ username: 'admin', role: 'admin' })
        );
        navigate('/');
      } else if (values.username === 'user' && values.password === 'password') {
        localStorage.setItem(
          'user',
          JSON.stringify({ username: 'user', role: 'user' })
        );
        navigate('/');
      } else {
        message.error('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto' }}>
      <h1>Login</h1>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: '100%' }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
