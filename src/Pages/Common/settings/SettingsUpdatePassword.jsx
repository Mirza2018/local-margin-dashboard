import { Button, Form, Input, Typography } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { useForgotPassResetMutation } from "../../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearAuth } from "../../../redux/slices/authSlice";

const SettingsUpdatePassword = () => {
  const [resetPass] = useForgotPassResetMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    // navigate("/signin");
    const toastId = toast("Password is reseting...");
    try {
      const res = await resetPass(values).unwrap();
      console.log(res);
      toast.success(res?.message, {
        id: toastId,
        duration: 2000,
      });

      navigate("/signin");
      localStorage.removeItem("localMargin-otpMatchToken");
      localStorage.removeItem("localMargin-forgetToken");
      dispatch(clearAuth());
    } catch (error) {
      console.log(error);
      toast.error(
        error?.res?.message ||
          error?.data?.message ||
          "An error occured during Reset Password",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-primary-color font-semibold"
            onClick={() => window.history.back()}
          />
          <p className="text-2xl text-primary-color font-semibold">
            Update Password
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full ">
          <div className="mb-10">
            <p className="text-3xl lg:text-[40px] text-base-color font-medium mb-8">
              Update Password
            </p>
            <p className="md:text-xl text-base-color">
              To update your password, check email for OTP being sent. Enter it
              in designated field to complete reset process.
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              New password
            </Typography.Title>
            <Form.Item
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
              name="password"
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
              name="confirmPassword"
              className="text-white"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
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

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                htmlType="submit"
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsUpdatePassword;
