import React from 'react';
import { Space, Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';

const MemberManagement: React.FC = () => {
  const columns = [
    {
      title: 'Member ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: unknown, record: unknown) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Member Management</h1>
      <ProTable
        columns={columns}
        request={async () => {
          // API logic to fetch data
          return {
            data: [
              {
                id: 1,
                name: 'John Doe',
                email: 'johndoe@example.com',
                registrationDate: '2023-01-01',
              },
              // ... more data
            ],
            success: true,
          };
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" type="primary">
            Add Member
          </Button>,
        ]}
      />
    </div>
  );
};

export default MemberManagement;
