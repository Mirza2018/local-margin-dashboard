import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const SettingsChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const onFinish = (values) => {
    console.log("Success:", values);
    // localStorage.removeItem("home_care_user");
    // window.location.reload();
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <p className="text-2xl text-primary-color font-semibold">
            Change Password
          </p>
        </div>
      </div> */}
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent py-10 text-base-color  grid lg:grid-cols-5 mx-10 "
          >
            <div className="col-span-3">
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Current password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your current password!",
                  },
                ]}
                name="currentPassword"
                className="text-white "
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                New password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
                name="newPassword"
                className="text-white"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Re-enter new Password
              </Typography.Title>
              <Form.Item
                name="reEnterPassword"
                className="text-white"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
                />
              </Form.Item>
              <div className="mt-10">
                <Link
                  to={`/${user?.role}/settings/forgot-password`}
                  className="!text-secondary-color text-lg !underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="col-span-2 flex justify-end items-end gap-3 mt-10 mg:mt-0 ">
              <p
                onClick={() => window.location.reload()} 
                className="border border-[#EF4A00] text-[#EF4A00] hover:border-[#bc4812] transition delay-150 duration-100 py-3 px-8 rounded-xl"
              >
                Cancel
              </p>
              <button
                htmlType="submit"
                className="bg-secondary-color hover:bg-[#f1ae31] transition delay-150 duration-100 py-3 px-9 rounded-xl text-white"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
