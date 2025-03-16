import { Link, useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { Button, Checkbox, Form, Input, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { setAccessToken, setUserInfo } from "../../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  // const token = useSelector((state) => state.auth);
  // const decodeToken = jwtDecode(token?.accessToken);
  // console.log(decodeToken);
  
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [userLogin] = useUserLoginMutation();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const onFinish = async (values) => {
    const toastId = toast.loading(" Logging in...");

    console.log(values);
    try {
      const res = await userLogin(values).unwrap();
      //* Dispatch the accessToken and userInfo to Redux store
      dispatch(setAccessToken(res?.data?.accessToken));
      dispatch(setUserInfo(res?.data?.user));
      // cookies.set("localMargin_accessToken", res?.data?.accessToken, {
      //   path: "/",
      // });
        const decodeToken = jwtDecode(res?.data?.accessToken);
      console.log("res: ", res, decodeToken.role);

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      if (decodeToken.role == "ADMIN") {
         navigate("/admin/overview");
      } else {
        navigate("/restaurantOwner/overview");
      }
      // Navigate after login
      // navigate.refresh();
     
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging

      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div className="text-base-color">
      <div className="max-w-[600px] w-[90%] mx-auto grid grid-cols-1  items-center justify-items-center gap-10 min-h-screen py-10">
        {/* <div className="">
          <img src={AllImages.logo} alt="logo" className="min-h-60 mx-auto" />
        </div> */}
        <div className="w-full md:w-[80%] lg:w-full mx-auto">
          {/* -------- Sign In Page Header ------------ */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-center mt-5 mb-8">
              <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                Log in to your account
              </h1>
              <p className="text-lg sm:text-xl mb-2 ">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>
          {/* -------- Form Start ------------ */}

          <Form
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              className="text-base-color"
              rules={[
                {
                  required: true,
                  message: "Email is Required",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password is Required",
                },
              ]}
              name="password"
              className="text-base-color"
            >
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Role
            </Typography.Title>
            {/* <Form.Item
              rules={[{ required: true }]}
              name="role"
              className="text-white"
            >
              <Select
                placeholder="Select Role"
                suffixIcon={
                  <DownOutlined className="text-[#222222] text-xl  mt-1" />
                }
                className="h-12 text-xl bg-primary-color"
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="restaurantOwner">
                  Restaurant Owner
                </Select.Option>
              </Select>
            </Form.Item> */}
            <div className="flex justify-between items-center mt-10">
              <Checkbox className="">Remember me</Checkbox>
              <Link
                to="/forgot-password"
                className="!text-secondary-color !underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                className="w-full py-6 border  text-xl font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
