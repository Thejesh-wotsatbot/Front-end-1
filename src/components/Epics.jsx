import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, notification, Row, Col, Spin, Modal } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;
const { confirm } = Modal;

const colors = [
  { name: 'Red', value: 'Red' },
  { name: 'Blue', value: 'Blue' },
  { name: 'Green', value: 'Green' },
];

const EpicComponent = () => {
  const { id } = useParams(); // Get epic ID from URL if present
  const [form] = Form.useForm();
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const isEditMode = !!id;

  useEffect(() => {
    const fetchOwners = async () => {
      const response = await axios.get('https://agilebackendtest-ig6zd90q.b4a.run//api/owners');
      return response.data;
    };

    const fetchEpic = async () => {
      const response = await axios.get(`https://agilebackendtest-ig6zd90q.b4a.run//api/epics/${id}`);
      return response.data;
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        // Run both API calls concurrently
        if (isEditMode) {
          const [ownersData, epicData] = await Promise.all([fetchOwners(), fetchEpic()]);

          setOwners(ownersData);
          form.setFieldsValue(epicData); // Pre-fill form with epic data
        } else {
          const ownersData = await fetchOwners();
          setOwners(ownersData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch data. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form, isEditMode]);

  const onFinish = async (values) => {
    try {
      if (isEditMode) {
        await axios.put(`https://agilebackendtest-ig6zd90q.b4a.run//api/epics/${id}`, values);
        notificationApi.success({
          message: 'Epic Updated',
          description: 'Epic has been updated successfully!',
        });

        setTimeout(() => {
          navigate('/tree');
        }, 1500); // Delay to allow the notification to be seen
      } else {
        const response = await axios.post('https://agilebackendtest-ig6zd90q.b4a.run//api/epics', values);
        notificationApi.success({
          message: 'Epic Saved',
          description: 'Epic has been saved successfully!',
        });
        form.resetFields(); // Reset form fields after successful submission
        navigate(`/story/${response.data._id}`, {
          state: {
            epicId: response.data._id,
            epicName: values.epicName,
          },
        });
      }
    } catch (error) {
      console.error('There was an error saving the epic!', error);
      notificationApi.error({
        message: 'Error',
        description: 'There was an error saving the epic.',
      });
    }
  };

  // Show confirmation modal on "Back to Tree View" button click
  const showBackConfirm = () => {
    confirm({
      title: 'Are you sure you want to go back?',
      content: 'Any unsaved changes will be lost. Do you want to continue?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        navigate('/tree'); // Navigate to Tree View if the user confirms
      },
      onCancel() {
        console.log('Stay on the current page');
      },
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {contextHolder} {/* Make sure this is included */}
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        {isEditMode ? 'Edit Epic' : 'Create Epic'}
      </h2>
      <Card
        hoverable
        style={{ transition: 'transform 0.1s ease-in-out', border: '1px solid #ddd' }}
      >
        <Spin spinning={loading}> {/* Add Spin here */}
          <div style={{ padding: '20px' }}>
            <Form form={form} layout="vertical" name="epicForm" onFinish={onFinish}>
              <Form.Item
                label="Epic Name"
                name="epicName"
                rules={[{ required: true, message: 'Please input the epic name!' }]}
              >
                <Input placeholder="Enter Epic Name" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description!' }]}
              >
                <Input.TextArea rows={4} placeholder="Enter Description" style={{ resize: 'none' }} />
              </Form.Item>

              <Form.Item
                label="Owner"
                name="owner"
                rules={[{ required: true, message: 'Please select an owner!' }]}
              >
                <Select placeholder="Select Owner" loading={loading} disabled={loading}>
                  <Option value="" disabled>
                    Select Owner
                  </Option>
                  {owners.map((owner) => (
                    <Option key={owner._id} value={owner._id}>
                      {owner.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true, message: 'Please select a color!' }]}
              >
                <Select placeholder="Select a color">
                  {colors.map((color) => (
                    <Option key={color.value} value={color.value}>
                      {color.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Align the buttons in the same row */}
              <Form.Item>
                <Row gutter={16} justify="space-between">
                  <Col span={12}>
                    {isEditMode && (
                      <Button
                        type="default"
                        style={{ width: '100%' }}
                        onClick={showBackConfirm} // Show confirmation popup
                      >
                        Back to Tree View
                      </Button>
                    )}
                  </Col>
                  <Col span={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%' }}
                    >
                      {isEditMode ? 'Update Epic' : 'Submit'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default EpicComponent;
