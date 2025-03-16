import { Button, Form } from "antd";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForgotPassOtpMutation } from "../../../redux/api/authApi";

const SettingsOtpPage = () => {
  const [otp, setOtp] = useState("");
  const token = useSelector((state) => state.auth);
  const decodeToken = jwtDecode(token?.accessToken);
  let user;
  if (decodeToken?.role === "ADMIN") {
    user = "admin";
  } else {
    user = "restaurantOwner";
  }
  const [otpSubmit] = useForgotPassOtpMutation();

  const navigate = useNavigate();

  const handleOTPSubmit = async () => {
    const toastId = toast("Otp Sending...");

    const data = {
      otp: Number(otp),
    };
    console.log(data);

    try {
      const res = await otpSubmit(data).unwrap();
      console.log(res);
      localStorage.setItem(
        "localMarging-otpMatchToken",
        res?.data?.forgetOtpMatchToken
      );
      toast.success(res?.message || "Success", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user}/settings/update-password`);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.res?.message ||
          error?.data?.message ||
          "An error occured during Send Opt Please try Again",
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
            OTP Verification
          </p>
        </div>
      </div>
      <div className="md:p-14 lg:p-20 flex justify-center items-center">
        <div className="w-full ">
          <div className="mb-10">
            <p className="text-3xl lg:text-[40px] text-base-color font-medium mb-8">
              Verify OTP
            </p>
            <p className="md:text-xl text-base-color">
              We have sent you an OTP to your email address. Please check it and
              place the OTP for resetting password.
            </p>
          </div>
          <Form layout="vertical" className="bg-transparent w-full">
            <Form.Item className="text-base-color ">
              <div className="flex justify-center items-center">
                <OTPInput
                  inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-transparent border !border-secondary-color
                       focus:bg-transparent rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => <input {...props} required />}
                />
              </div>
            </Form.Item>
            <div className="flex justify-between py-1">
              <p className=" text-base-color text-lg">Didn’t get OTP?</p>
              <Link
                to={`/${user}/settings/otp-page`}
                className="text-[#FFAC76] hover:text-[#FFAC76] text-lg"
              >
                Resend
              </Link>
            </div>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
                onClick={handleOTPSubmit}
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsOtpPage;
