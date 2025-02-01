/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Modal, Typography } from "antd";

const AddCompanyModal = ({ isAddCompanyModalVisible, handleCancel }) => {
  const onFinish = (values) => {
    console.log("Service User:", values);
    handleCancel();
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#E8EBEC",
            headerBg: "#E8EBEC",
          },
        },
      }}
    >
      <Modal
        open={isAddCompanyModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[1000px]"
      >
        <div className="p-10">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Company Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter company name",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Company Name"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Company Contact number
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter company contact number",
                },
              ]}
              name="phone"
              className=" "
            >
              <Input
                placeholder="Enter Company Contact number"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Company Email Address
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter company email address",
                },
              ]}
              name="email"
              className=" "
            >
              <Input
                placeholder="Enter User Company Email Address"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Company Location
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter company location",
                },
              ]}
              name="location"
              className=" "
            >
              <Input
                placeholder="Enter User Company Location"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddCompanyModal;
