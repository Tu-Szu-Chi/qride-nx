import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';

import {
  Button,
  Table,
  Select,
  Upload,
  DatePicker,
  Switch,
  message,
  Form,
  Input,
  Row,
  Col,
  Card,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  MinusOutlined,
  EditOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import ImageResize from 'quill-image-resize-module-react';
import moment from 'moment';

ReactQuill.Quill.register('modules/imageResize', ImageResize);

const { Option } = Select;
const { RangePicker } = DatePicker;

interface Post {
  id: string;
  title: string;
  category: string;
  content: string;
  coverImage: string;
  isActive: boolean;
  publishStartDate: string;
  publishEndDate: string;
}

const PostManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [content, setContent] = useState('');
  const quillRef = useRef<ReactQuill>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const fetchPosts = async () => {
    // Implement fetching posts from API
    // For now, we'll use dummy data
    setPosts([
      {
        id: '1',
        title: 'Sample Post',
        category: 'News',
        content: 'This is a sample post content.',
        coverImage: '',
        isActive: true,
        publishStartDate: '2023-05-01',
        publishEndDate: '2023-05-02',
      },
    ]);
  };

  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];

        // const imageUrl = await uploadImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', e.target?.result as string); // imageUrl
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }, []);

  const handleCoverImageUpload = async (
    info: UploadChangeParam<UploadFile<any>>
  ) => {
    const { file } = info;
    if (file.originFileObj) {
      try {
        const imageUrl = URL.createObjectURL(file.originFileObj);
        setPreviewImage(imageUrl);
        setCoverImageUrl(imageUrl);
      } catch (error) {
        message.error('Upload failed');
      }
    } else {
      message.error(`Can't handle ${file.name}.`);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsFormVisible(true);
    form.setFieldsValue({
      title: post.title,
      category: post.category,
      isActive: post.isActive,
      publishDateRange: [
        moment(post.publishStartDate),
        moment(post.publishEndDate),
      ],
    });
    setContent(post.content);
    setCoverImageUrl(post.coverImage);
    setPreviewImage(post.coverImage);
  };

  const handleSubmit = (values: any) => {
    try {
      const [publishStartDate, publishEndDate] = values.publishDateRange;
      const postData = {
        ...values,
        content,
        coverImageUrl: coverImageUrl,
        publishStartDate: publishStartDate.toISOString(),
        publishEndDate: publishEndDate.toISOString(),
        id: editingPost ? editingPost.id : undefined,
      };
      console.log('🚀 ~ handleSubmit ~ postData:', postData);

      // if (editingPost) {
      //   await updatePost(postData);
      // } else {
      //   await createPost(postData);
      // }

      message.success(
        `Post ${editingPost ? 'updated' : 'submitted'} successfully`
      );
      resetForm();
      fetchPosts();
    } catch (error) {
      message.error(`Failed to ${editingPost ? 'update' : 'submit'} post`);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setPreviewImage(null);
    setCoverImageUrl(null);
    // setFileList([]);
    setContent('');
    setEditingPost(null);
  };

  const handleDelete = async () => {
    // Implement delete logic here
    console.log('Deleting posts:', selectedPosts);
    message.success('Selected posts deleted successfully');
    setSelectedPosts([]);
    fetchPosts();
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (isActive ? 'Active' : 'Inactive'),
    },
    {
      title: 'Publish Date Range',
      key: 'publishDateRange',
      render: (_:unknown, record: Post) =>
        `${record.publishStartDate} - ${record.publishEndDate}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Post) => (
        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
      imageResize: {
        parchment: ReactQuill.Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [handleImageUpload]
  );

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Post Management</h1>

      <Button
        type="primary"
        icon={isFormVisible ? <MinusOutlined /> : <PlusOutlined />}
        onClick={() => {
          setIsFormVisible(!isFormVisible);
          if (!isFormVisible) {
            resetForm();
          }
        }}
        style={{ marginBottom: '16px' }}
      >
        {isFormVisible ? 'Hide Form' : 'Add Post'}
      </Button>

      {isFormVisible && (
        <Card style={{ marginBottom: '16px' }}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select Category">
                    <Option value="News">News</Option>
                    <Option value="Promo">Promo</Option>
                    <Option value="Event">Event</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="coverImage" label="Cover Image">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false} // Prevent default upload behavior
                onChange={handleCoverImageUpload}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="cover"
                    style={{ width: '100%' }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item label="Content" rules={[{ required: true }]}>
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                theme="snow"
                style={{ height: '300px', marginBottom: '50px' }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="isActive"
                  label="Status"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="publishDateRange" label="Publish Date Range">
                  <RangePicker />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingPost ? 'Update' : 'Submit'}
              </Button>
              {editingPost && (
                <Button style={{ marginLeft: '8px' }} onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      )}

      <div style={{ marginBottom: '16px', marginTop: '32px' }}>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          disabled={selectedPosts.length === 0}
          style={{ marginRight: '8px' }}
        >
          Delete Selected
        </Button>
      </div>

      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => setSelectedPosts(selectedRowKeys),
        }}
        columns={columns}
        dataSource={posts}
      />
    </div>
  );
};

export default PostManagement;
