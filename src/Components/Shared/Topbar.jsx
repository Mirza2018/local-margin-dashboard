/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import user from "/images/user.png";
import { AllImages } from "../../../public/images/AllImages";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useGetProfileQuery } from "../../redux/api/profileApi";
import { getImageUrl } from "../../redux/getBaseUrl";
import { FaUser, FaUserCircle } from "react-icons/fa";

const notifications = [
  {
    id: 1,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "A company added 6 Service Users.",
    time: "Fri, 12:30pm",
  },
];

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data, isLoading } = useGetProfileQuery();
  const token = useSelector((state) => state.auth);
  const decodeToken = jwtDecode(token?.accessToken);
  let user;
  if (decodeToken.role === "ADMIN") {
    user = "admin";
  } else {
    user = "restaurantOwner";
  }

  const image = getImageUrl() + data?.data[0]?.profile?.profileImage;

  const [notificationCount, setNotificationCount] = useState(
    notifications.length
  );

  const handleMenuClick = () => {
    setNotificationCount(0); // Reset notification count when the menu is clicked
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notifications.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex gap-2">
            <BellFilled style={{ color: "#F2C470" }} />
            <div className="flex flex-col items-start">
              <p>{notification.message}</p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
      >
        See More
      </Link>
    </div>
  );


  

  return (
    <div className="py-4 mx-[-40px] flex justify-between items-center bg-[#F2C470]  rounded-full  mt-2">
      <div className="flex items-center gap-2 text-base-color ml-4">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-white"
        />
      </div>
      <div className="flex items-center justify-center mr-5 gap-5">
        {/* <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="bg-[#F7F5F5] py-4 px-2 text-xl rounded-full shadow h-6 font-bold text-secondary-color border border-[#8D969B]"
          />
        </Dropdown> */}
        <Link
          to="setting"
          className="flex items-center justify-center gap-2 bg-transparent text-base-color border-0 rounded-lg h-8 px-2 py-1  mr-5"
        >
          <div className="flex gap-2 bg-white border border-[#8D969B] p-1 rounded-lg">
            {image ? (
              <img
                src={image}
                alt="profile_pic"
                className="rounded-full object-cover aspect-square size-10"
              />
            ) : (
              <div>
                <FaUserCircle className="text-4xl" />
              </div>
            )}

            <div>
              <p className="text-black text-sm font-bold">{ data?.data[0]?.profile?.name}</p>
              <p className="text-xs font-normal !hover:bg-secondary-color">
                {decodeToken.role == "ADMIN" ? "Admin" : "Restaurant Owner"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
