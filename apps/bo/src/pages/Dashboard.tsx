import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShopOutlined, DollarOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  console.log('Dashboard component rendered'); // 添加這行來檢查組件是否被渲染
  return (
    <div>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Members"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Dealers"
              value={93}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={234567}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
