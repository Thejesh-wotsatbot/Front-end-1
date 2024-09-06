import { Layout, Row, Col, Typography, Button, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link
import FooterComponent from '../components/Footer'; // Assuming FooterComponent is correctly imported

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <>
      <Layout>
        <Content className="py-12 bg-gray-100">
          {/* Hero Section */}
          <section className="bg-blue-400 text-white py-20 px-6 text-center md:text-left">
            <div className="container mx-auto">
              <div className="md:flex md:items-center">
                <div className="md:w-1/2">
                  <Title level={1} className="text-4xl md:text-5xl font-bold leading-tight">
                    Streamline Your Agile Workflow
                  </Title>
                  <Paragraph className="mt-4 text-lg md:text-xl">
                    Empower your team with our comprehensive Agile Management tool. Manage epics, stories, and tasks efficiently with real-time collaboration and automated workflows.
                  </Paragraph>
                  <Link to="/epic"> 
                    <Button
                      type="primary"
                      size="large"
                      aria-label="Get Started"
                      className="mt-6 bg-white text-blue-600 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                  <img src="/PMbot2.jpg" alt="Agile Workflow Illustration" className="w-11/12 rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="mb-12 px-6">
            <Title level={2} className="text-center mb-8">Our Solution</Title>
            <Row gutter={[24, 24]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <div className="relative p-6 bg-purple-500 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <Title level={4}>Epic Management</Title>
                  <Paragraph>
                    Organize and prioritize your epics effortlessly. Track progress and ensure alignment with your goals.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="relative p-6 bg-pink-500 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <Title level={4}>Story Tracking</Title>
                  <Paragraph>
                    Create and manage user stories, ensuring that your team is focused on only delivering value that is required.
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className="relative p-6 bg-green-500 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <Title level={4}>Task Management</Title>
                  <Paragraph>
                    Assign tasks, set deadlines, and monitor progress. Keep everyone on the same page with clear task tracking.
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </section>

          {/* Brief Working Section */}
          <section className="mb-12 px-4 md:px-8 lg:px-16 xl:px-32">
            <Title level={2} className="text-center text-gray-800 mb-12">How It Works</Title>
            <div className="max-w-6xl mx-auto">
              <Timeline
                mode="alternate"
                className="bg-white p-6 rounded-lg shadow-lg"
                items={[
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: '20px', color: '#36cfc9' }} />,
                    children: (
                      <div className="hover:shadow-md hover:bg-lightcyan transition-all duration-300 ease-in-out p-6 rounded-lg">
                        <Title level={4} className="text-teal-600">Step 1: Create Epics</Title>
                        <Paragraph className="text-gray-600">
                          Start by creating epics to define the major goals and initiatives of your project.
                        </Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: '20px', color: '#9254de' }} />,
                    children: (
                      <div className="hover:shadow-md hover:bg-lightpurple transition-all duration-300 ease-in-out p-6 rounded-lg">
                        <Title level={4} className="text-purple-600">Step 2: Break Down into Stories</Title>
                        <Paragraph className="text-gray-600">
                          Decompose epics into user stories that can be managed and tracked individually.
                        </Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: '20px', color: '#ffec3d' }} />,
                    children: (
                      <div className="hover:shadow-md hover:bg-lightyellow transition-all duration-300 ease-in-out p-6 rounded-lg">
                        <Title level={4} className="text-yellow-600">Step 3: Assign Tasks</Title>
                        <Paragraph className="text-gray-600">
                          Assign specific tasks to team members, set priorities, and define deadlines.
                        </Paragraph>
                      </div>
                    ),
                  },
                  {
                    dot: <ClockCircleOutlined style={{ fontSize: '20px', color: '#40a9ff' }} />,
                    children: (
                      <div className="hover:shadow-md hover:bg-lightcyan transition-all duration-300 ease-in-out p-6 rounded-lg">
                        <Title level={4} className="text-blue-600">Step 4: Track Progress</Title>
                        <Paragraph className="text-gray-600">
                          Monitor progress in real-time and make adjustments to stay on track with your project timelines.
                        </Paragraph>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>
        </Content>
      </Layout>
      <FooterComponent /> {/* Footer is reused */}
    </>
  );
};

export default LandingPage;
