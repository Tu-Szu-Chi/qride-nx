import React from 'react';
import { Table, Button, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { TableRowSelection } from 'antd/es/table/interface';
import { PostEntity } from '@org/types'

interface PostTableProps {
  posts: PostEntity[];
  loading: boolean;
  totalPosts: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (post: PostEntity) => void;
  rowSelection: TableRowSelection<PostEntity>;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'News':
      return '#1890ff';
    case 'Promo':
      return '#52c41a';
    case 'Event':
      return '#faad14';
    default:
      return '#d9d9d9';
  }
};

const PostTable: React.FC<PostTableProps> = ({
  posts,
  loading,
  totalPosts,
  currentPage,
  pageSize,
  onPageChange,
  onEdit,
  rowSelection,
}) => {
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag
          color={getCategoryColor(category)}
          style={{ color: 'white', fontWeight: 'bold' }}
        >
          {category.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (isActive ? 'Active' : 'Inactive'),
    },
    {
      title: 'Publish Date Range',
      key: 'publishDateRange',
      render: (_: unknown, record: PostEntity) =>
        `${dayjs(record.publishStartDate).format('YYYY-MM-DD')} - ${dayjs(
          record.publishEndDate
        ).format('YYYY-MM-DD')}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: PostEntity) => (
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={posts}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalPosts,
        onChange: onPageChange,
      }}
      rowKey={(record) => record.id.toString()}
    />
  );
};

export default PostTable;
