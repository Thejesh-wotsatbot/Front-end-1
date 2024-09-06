import { useState, useEffect, useMemo } from 'react';
import { Collapse, Typography, Space, Button, notification, Spin, Alert } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FolderOutlined, FolderOpenOutlined, EditOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TreeViewComponent = () => {
  const [data, setData] = useState({ epics: [], stories: [], tasks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const epicsResponse = await axios.get('https://agilebackendtest-ig6zd90q.b4a.run//api/epics');
        const storiesResponse = await axios.get('https://agilebackendtest-ig6zd90q.b4a.run//api/stories');
        const tasksResponse = await axios.get('https://agilebackendtest-ig6zd90q.b4a.run//api/tasks');
        setData({
          epics: epicsResponse.data,
          stories: storiesResponse.data,
          tasks: tasksResponse.data,
        });
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        notification.error({
          message: 'Data Fetch Error',
          description: 'Failed to fetch data. Please refresh the page or try again later.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTasksForStory = (storyId) => data.tasks.filter((task) => task.storyId === storyId);

  const storyItems = useMemo(() => (epicId) => {
    return data.stories
      .filter((story) => story.epicId === epicId)
      .map((story) => ({
        key: story._id,
        label: (
          <span><FolderOutlined /> {story.storyName || "Unnamed Story"}</span>
        ),
        children: (
          <>
            <Text>{story.description || "No description available."}</Text>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <Text type="secondary">User Group: {story.userGroup || "Not assigned"}</Text>
            </div>
            {getTasksForStory(story._id).length === 0 ? (
              <p>No tasks assigned to this story.</p>
            ) : (
              getTasksForStory(story._id).map((task, index) => (
                <div key={task._id} className="bg-green-50 p-3 rounded mb-2">
                  <h4 className="font-semibold">Task {index + 1}: {task.taskName}</h4>
                  <p>{task.description}</p>
                </div>
              ))
            )}
          </>
        ),
        extra: (
          <Space>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(`/story/edit/${story._id}`)}
            >
              Edit
            </Button>
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/task/${story._id}`, { state: { storyId: story._id } })}
            >
              Add Task
            </Button>
          </Space>
        ),
        style: { background: '#d2f6ff' },
      }));
  }, [data.stories, data.tasks]);

  const epicItems = useMemo(() => {
    return data.epics.map((epic) => {
      const epicStories = data.stories.filter((story) => story.epicId === epic._id);
      const hasMissingStoriesOrTasks = epicStories.some(
        (story) => data.tasks.filter((task) => task.storyId === story._id).length === 0
      ) || epicStories.length === 0;

      return {
        key: epic._id,
        label: (
          <span>
            <FolderOpenOutlined /> {epic.epicName || "Unnamed Epic"}
            {hasMissingStoriesOrTasks && (
              <ExclamationCircleOutlined
                style={{ color: 'red', marginLeft: 8 }}
                title={epicStories.length === 0 ? 'No stories in this epic' : 'Some stories have no tasks'}
              />
            )}
          </span>
        ),
        children: <Collapse accordion items={storyItems(epic._id)} />,
        extra: (
          <Space>
            <Button
              style={{ color: 'black' }}
              type="link"
              icon={<EditOutlined />}
              onClick={() => navigate(`/epic/edit/${epic._id}`)}
            >
              Edit
            </Button>
            <Button
              style={{ color: 'black' }}
              type="link"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/add-story`, { state: { epicId: epic._id } })}
            >
              Add Story
            </Button>
          </Space>
        ),
        style: { marginBottom: 24, background: '#8de8ff' },
      };
    });
  }, [data.epics, data.stories, data.tasks, navigate, storyItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ minHeight: '200px' }}>
        <Spin tip="Loading data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: '20px' }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (data.epics.length === 0) {
    return (
      <div>
        <Text>No epics available.</Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/add-epic')}
        >
          Add Epic
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Agile Management</h2>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Collapse accordion items={epicItems} />
      </Space>
    </div>
  );
};

export default TreeViewComponent;
