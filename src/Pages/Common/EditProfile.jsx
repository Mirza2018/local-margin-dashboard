/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Form, Input, Typography, Upload } from "antd";
import profileImage from "/images/profileImage.png";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";

const EditProfile = () => {
  const profileData = {
    fullname: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(imageUrl);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center ">
          <IoChevronBackOutline
            className="text-4xl cursor-pointer text-primary-color font-semibold"
            onClick={() => window.history.back()}
          />
          <p className="text-3xl text-primary-color font-semibold">
            Edit Profile
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent py-10 text-base-color h-full w-full lg:w-[70%]"
        >
          <div className="mt-5 flex flex-col justify-center items-center gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  beforeUpload={() => false} // Prevent automatic upload to server
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  className="absolute -top-10 !right-3 text-end"
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
                    className="bg-white p-2 w-fit h-fit rounded-full shadow !border-none"
                  >
                    <IoCameraOutline
                      className="w-5 h-5"
                      style={{ color: "#19363D" }}
                    />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-5">James Mitchell</p>
          </div>

          <div className=" text-white mt-5">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              initialValue={profileData.email}
              name="email"
              className="text-white "
            >
              <Input
                suffix={<MdOutlineEdit />}
                type="email"
                placeholder="Enter your email"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              User Name
            </Typography.Title>
            <Form.Item
              initialValue={profileData.fullname}
              name="userName"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Name"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Contact number
            </Typography.Title>
            <Form.Item
              initialValue={profileData.contactNumber}
              name="contactNumber"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                htmlType="submit"
              >
                Save & Change
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditProfile;
