import React from 'react';
import { Table, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

interface Report {
  key: string;
  name: string;
  description: string;
}

const ReportData: React.FC = () => {
  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: unknown, record: Report) => (
        <Space size="middle">
          <Button icon={<DownloadOutlined />}>Download</Button>
        </Space>
      ),
    },
  ];

  const data: Report[] = [
    {
      key: '1',
      name: 'Monthly Sales Report',
      description: 'Shows sales data and trends for the current month',
    },
    {
      key: '2',
      name: 'User Activity Report',
      description: 'Analyzes user engagement and usage frequency',
    },
    {
      key: '3',
      name: 'Dealer Performance Report',
      description: 'Sales performance and rankings of each dealer',
    },
  ];

  return (
    <div>
      <h1>Report Data</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ReportData;
