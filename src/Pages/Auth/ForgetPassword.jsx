import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { AllIcons, AuthImages } from "../../../public/images/AllImages";
import { useUserForgotEmailMutation } from "../../redux/api/authApi";
import { toast } from "sonner";
 
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [emailData] = useUserForgotEmailMutation();

  const onFinish =async (values) => {
    console.log("Success:", values);
      localStorage.removeItem("localMargin-otpMatchToken");
    localStorage.removeItem("localMargin-forgetToken");
    console.log("Success:", values);
    // navigate("/verify-otp");
    const toastId = toast("OTP sending...");
    console.log(values);
    try {
      const res = await emailData(values).unwrap();
      console.log(res);
      localStorage.setItem(
        "localMargin-forgetToken",
        res?.data?.forgotPasswordToken
      );
      toast.success(res?.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/verify-otp");
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "An error occurred during Signup", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <div className="text-base-color">
      <div className="max-w-[600px] w-[90%] mx-auto grid grid-cols-1  items-center justify-items-center gap-10 min-h-screen py-10">
        {/* <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img
            src={AuthImages.ForgotPassword}
            alt="forgot_Password_Img"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[320px] w-[320px] md:h-[380px] md:w-[380px] lg:h-[520px] lg:w-[520px]"
          />
        </div> */}
        {/* <div className="h-[80vh] w-[2px] bg-[#19363D] hidden lg:block"></div> */}
        <div className="w-full md:w-[80%] lg:w-full mx-auto">
          <div className="">
            <div className="mb-8 flex-col flex justify-center items-center">
              <img
                src={AllIcons.forgot}
                alt="forgot_Password_Img"
                sizes="100vw"
                className=""
              />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Forgot password?
              </h1>
              <p className="md:text-lg lg:text-xl mb-2 ">
                No worries, we’ll send you reset instructions.
              </p>
            </div>

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
                name="email"
                className="text-base-color"
              >
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 text-xl border font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Get OTP
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
