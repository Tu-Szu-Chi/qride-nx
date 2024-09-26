import React from 'react';
import { Space, Button, Modal } from 'antd';
import { ProTable } from '@ant-design/pro-components';

interface Dealer {
  id: number;
  name: string;
  status: string;
}

const DealerManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [currentDealer, setCurrentDealer] = React.useState<Dealer | null>(null);

  const showModal = (dealer: Dealer) => {
    setCurrentDealer(dealer);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle accept logic
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Handle reject logic
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Dealer ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: unknown, record: Dealer) => (
        <Space size="middle">
          <Button onClick={() => showModal(record)}>Review</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Dealer Management</h1>
      <ProTable<Dealer>
        columns={columns}
        request={async () => {
          // Logic to fetch data from API
          return {
            data: [
              {
                id: 1,
                name: 'Dealer A',
                status: 'Pending',
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
      />
      <Modal
        title="Review Dealer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="reject" onClick={handleCancel}>
            Reject
          </Button>,
          <Button key="accept" type="primary" onClick={handleOk}>
            Accept
          </Button>,
        ]}
      >
        {currentDealer && (
          <div>
            <p>Dealer Name: {currentDealer.name}</p>
            {/* Display more dealer information */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DealerManagement;
