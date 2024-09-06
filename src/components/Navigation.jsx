import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

const Navigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Control modal visibility
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true); // Show modal when menu button is clicked
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal on cancel
  };

  const handleNavigation = (path) => {
    setIsModalVisible(false); // Close modal when a link is clicked
    navigate(path); // Navigate to the selected path
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <Link to="/" onClick={() => setIsModalVisible(false)}>Agile Management</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="block lg:hidden">
          <Button onClick={showModal} className="text-white" icon={<MenuOutlined className="text-2xl" />} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-8">
          <li>
            <Link to="/" className="text-white font-semibold block lg:inline-block py-2 px-4 hover:bg-blue-600 rounded-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/epic" className="text-white font-semibold block lg:inline-block py-2 px-4 hover:bg-blue-600 rounded-lg">
              Create Epic
            </Link>
          </li>
          <li>
            <Link to="/assignments" className="text-white font-semibold block lg:inline-block py-2 px-4 hover:bg-blue-600 rounded-lg">
              Check Assignments
            </Link>
          </li>
          <li>
            <Link to="/tree" className="text-white font-semibold block lg:inline-block py-2 px-4 hover:bg-blue-600 rounded-lg">
              Tree View
            </Link>
          </li>
        </ul>
      </div>

      {/* Modal for Mobile Menu */}
      <Modal
        title="Menu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        bodyStyle={{ padding: 0 }}
      >
        <ul className="p-4">
          <li className="mb-2">
            <Button
              type="text"
              onClick={() => handleNavigation('/')}
              className="w-full text-left font-semibold text-lg text-blue-600 hover:bg-blue-100"
            >
              Home
            </Button>
          </li>
          <li className="mb-2">
            <Button
              type="text"
              onClick={() => handleNavigation('/epic')}
              className="w-full text-left font-semibold text-lg text-blue-600 hover:bg-blue-100"
            >
              Create Epic
            </Button>
          </li>
          <li className="mb-2">
            <Button
              type="text"
              onClick={() => handleNavigation('/assignments')}
              className="w-full text-left font-semibold text-lg text-blue-600 hover:bg-blue-100"
            >
              Check Assignments
            </Button>
          </li>
          <li>
            <Button
              type="text"
              onClick={() => handleNavigation('/tree')}
              className="w-full text-left font-semibold text-lg text-blue-600 hover:bg-blue-100"
            >
              Tree View
            </Button>
          </li>
        </ul>
      </Modal>
    </nav>
  );
};

export default Navigation;
