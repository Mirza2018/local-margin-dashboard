import { Form, Input, Typography } from "antd";
import profileImage from "/images/profileImage.png";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("home_care_user"));
  const profileData = {
    fullname: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-3xl text-primary-color font-semibold w-[95%] mx-auto">
          Profile
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" text-base-color rounded-lg h-full w-full lg:w-[70%]">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-5">
              <img className="h-36 w-36 relative" src={profileImage} alt="" />
              <p className="text-4xl font-semibold">{profileData.fullname}</p>
            </div>
            <Link
              to={`/${user?.role}/edit-profile`}
              className="hover:text-primary-color ml-auto"
            >
              <div className="mt-10 bg-secondary-color px-5 py-3 rounded-lg">
                <div className="flex gap-1">
                  <EditOutlined style={{ color: "#FAFAFA" }} />
                  <p className="text-primary-color">Edit Profile</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center text-white mt-5">
            <Form layout="vertical" className="bg-transparent p-4 w-full">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item className="text-white ">
                <Input
                  value={profileData.email}
                  readOnly
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                User Name
              </Typography.Title>
              <Form.Item className="text-white">
                <Input
                  readOnly
                  value={profileData.fullname}
                  placeholder="Enter your full name"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>

              <Typography.Title level={5} style={{ color: "#222222" }}>
                Contact Number
              </Typography.Title>
              <Form.Item className="text-white">
                <Input
                  readOnly
                  value={profileData.contactNumber}
                  placeholder="Enter your contact number"
                  className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
