/* eslint-disable no-unused-vars */
import { Button, Form, Input, Spin, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import {
  useGetProfileQuery,
  useProfileUpdsateMutation,
} from "../../redux/api/profileApi";
import { toast } from "sonner";
import { getImageUrl } from "../../redux/getBaseUrl";

const EditProfile = () => {
  const { data, isLoading } = useGetProfileQuery();

  const [updateProfile] = useProfileUpdsateMutation();
  console.log(data?.data[0]);
  const userData = data?.data[0];

  const [imageUrl, setImageUrl] = useState(
    getImageUrl() + userData?.profile?.profileImage
  );
  useEffect(() => {
    setImageUrl(getImageUrl() + userData?.profile?.profileImage);
  }, [userData]);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(getImageUrl() + userData?.profile?.profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Profile Updateing...");
    console.log("Success:", values);
    const image = values.image?.fileList[0].originFileObj;
    const jsonData = {
      name: values?.userName,
      contactNo: values?.contactNumber,
    };

    const formData = new FormData();
    if (values.image) {
      formData.append("profileImage", image, image?.name);
    }

    formData.append("data", JSON.stringify(jsonData));
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const res = await updateProfile({
        id: userData?.profile?._id,
        data: formData,
      }).unwrap();
      console.log("I am from profile update", res);
      toast.success(res?.message || "profile updated successfully", {
        id: toastId,
        duration: 2000,
      });
      // navigate("/admin/profile");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "error", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent py-10 text-base-color  grid lg:grid-cols-5 mx-10 "
      >
        <div className="col-span-3">
          <div className="mt-5 flex flex-col justify-start items-start gap-x-4">
            <div className=" relative">
              <p className="text-base font-bold mb-4">Profile Image</p>
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                src={imageUrl}
                alt=""
              />

              <Form.Item name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="  text-end"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className="bg-white p-2 w-fit h-fit  shadow !border-none  absolute -top-12 left-32   rounded-full"
                  >
                    <IoCameraOutline className="w-6 h-6 " />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            {/* <p className="text-5xl font-semibold -mt-5">James Mitchell</p> */}
          </div>

          <div className=" text-white mt-5">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Full Name<span className="text-secondary-color">*</span>
            </Typography.Title>
            <Form.Item
              initialValue={userData?.profile?.name}
              name="userName"
              className="text-white"
            >
              <Input
                required
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Name"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Phone<span className="text-secondary-color">*</span>
            </Typography.Title>
            <Form.Item
              initialValue={userData?.profile?.contactNo}
              name="contactNumber"
              className="text-white"
              rules={[
                {
                  required: true,
                  message: "Please input your contact number!",
                },
                {
                  pattern: /^[+\d-]*$/, // Regex for 10 digits (adjust as needed for your country)
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input
                required
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>

            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              initialValue={userData?.email}
              name="email"
              className="text-white "
            >
              <Input
                readOnly
                required
                // suffix={<MdOutlineEdit />}
                placeholder="Enter your email"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>
          </div>
        </div>

        <div className="col-span-2 flex justify-end items-end gap-3">
          <button
            onClick={() => setContent("")} // Clears the editor content
            className="border border-[#EF4A00] text-[#EF4A00] hover:border-[#bc4812] transition delay-150 duration-100 py-3 px-8 rounded-xl"
          >
            Cancel
          </button>
          <button
            htmlType="submit"
            className="bg-secondary-color hover:bg-[#f1ae31] transition delay-150 duration-100 py-3 px-9 rounded-xl text-white"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;
