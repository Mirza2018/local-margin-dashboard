import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";

import carer from "../../../public/images/dashboard-logo/carer.svg";
import employee from "../../../public/images/dashboard-logo/employee.svg";
import report from "../../../public/images/dashboard-logo/report.svg";
import serviceUser from "../../../public/images/dashboard-logo/service.svg";

import { Layout, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { AllIcons, AllImages } from "../../../public/images/AllImages";

const DashboardLayout = () => {
  const userRole = JSON.parse(localStorage.getItem("home_care_user")); // Parse the stored JSON string

  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();

  const currentPath = location.pathname;

  // Logic to set active keys
  const activeKeys = (() => {
    if (
      currentPath.includes("/profile") ||
      currentPath.includes("/edit-profile")
    ) {
      return ["profile"];
    }
    if (
      currentPath.includes("/settings/change-password") ||
      currentPath.includes("/settings/forgot-password") ||
      currentPath.includes("/settings/update-password") ||
      currentPath.includes("/settings/otp-page")
    ) {
      return ["change-password"];
    }
    if (currentPath.includes("/privacy-policy")) {
      return ["privacy-policy"];
    }
    if (currentPath.includes("/add-feedback")) {
      return ["add-feedback"];
    }
    if (currentPath.includes("/show-feedback")) {
      return ["show-feedback"];
    }
    if (currentPath.includes("/terms-and-condition")) {
      return ["terms-and-condition"];
    }
    return [currentPath.split("/")[1]]; // Default fallback
  })();

  const [collapsed, setCollapsed] = useState(false);

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adminMenuItems = [
    {
      key: "overview",
      icon: (
        <img
          src={AllIcons.overview}
          alt="overview"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("overview")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="overview">Overview</NavLink>,
    },
    {
      key: "restaurant-list",
      icon: (
        <img
          src={AllIcons.feedback}
          alt="restaurant-list"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("restaurant-list")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="restaurant-list">Restaurant List</NavLink>,
    },
    {
      key: "user-list",
      icon: (
        <img
          src={AllIcons.feedback}
          alt="user-list"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("user-list")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="user-list">User List</NavLink>,
    },
  ];

  const restaurantOwner = [
    {
      key: "overview",
      icon: (
        <img
          src={AllIcons.overview}
          alt="overview"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("overview")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="overview">Overview</NavLink>,
    },
    {
      key: "staff",
      icon: (
        <img
          src={AllIcons.staff}
          alt="staff"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("staff")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="staff">Staff</NavLink>,
    },

    {
      key: "queries",
      icon: (
        <img
          src={AllIcons.queries}
          alt="queries"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("queries")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="queries">Queries</NavLink>,
    },
    {
      key: "feedback",
      icon: (
        <img
          src={AllIcons.feedback}
          alt="feedback"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("feedback")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="feedback">Feedback</NavLink>,
    },

    {
      key: "data-management",
      label: <span className="text-black">Data Management</span>,
      icon: (
        <img src={AllIcons.data} alt="data-management" width={16} height={16} />
      ),
      children: [
        {
          key: "instruction",
          icon: (
            <img
              src={AllIcons.instruction}
              alt="instruction"
              width={16}
              height={16}
            />
          ),
          label: <NavLink to="instruction">Instruction and Guide</NavLink>,
        },
        {
          key: "disclaimer",
          icon: (
            <img
              src={AllIcons.disclaimer}
              alt="disclaimer"
              width={16}
              height={16}
            />
          ),
          label: <NavLink to="disclaimer">Disclaimer</NavLink>,
        },
        {
          key: "privacy",
          icon: (
            <img src={AllIcons.privacy} alt="privacy" width={16} height={16} />
          ),
          label: <NavLink to="privacy">Privacy Policy</NavLink>,
        },
        {
          key: "terms",
          icon: <img src={AllIcons.terms} alt="terms" width={16} height={16} />,
          label: <NavLink to="terms">Terms of Service</NavLink>,
        },
        {
          key: "faq",
          icon: <img src={AllIcons.faq} alt="faq" width={16} height={16} />,
          label: <NavLink to="faq">FAQ</NavLink>,
        },
        {
          key: "announcement",
          icon: (
            <img
              src={AllIcons.announcement}
              alt="announcement"
              width={16}
              height={16}
            />
          ),
          label: <NavLink to="announcement">Announcement</NavLink>,
        },
      ],
    },

    {
      key: "settings",
      label: <span className="text-black">settings</span>,
      icon: (
        <img src={AllIcons.settings} alt="settings" width={16} height={16} />
      ),
      children: [
        {
          key: "profile",
          icon: (
            <img src={AllIcons.profile} alt="profile" width={16} height={16} />
          ),
          label: <NavLink to="setting">profile</NavLink>,
        },
      ],
    },
    {
      key: "logout",
      icon: (
        <img
          src={AllIcons.logOut}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div onClick={() => localStorage.removeItem("home_care_user")}>
          <NavLink to="/signin">Log Out</NavLink>
        </div>
      ),
    },
  ];

  const companyMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "service-user",
      icon: (
        <img
          src={serviceUser}
          alt="service-user"
          width={20}
          style={{
            filter: location.pathname.includes("service-user")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="service-user">Service User</NavLink>,
    },
    {
      key: "carer",
      icon: (
        <img
          src={carer}
          alt="carer"
          width={20}
          style={{
            filter: location.pathname.includes("carer")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="carer">Carer</NavLink>,
    },
    {
      key: "employee",
      icon: (
        <img
          src={employee}
          alt="employee"
          width={20}
          style={{
            filter: location.pathname.includes("employee")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="employee">Employee</NavLink>,
    },
    {
      key: "report",
      icon: (
        <img
          src={report}
          alt="report"
          width={20}
          style={{
            filter: location.pathname.includes("report")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="report">Report</NavLink>,
    },
  ];

  const commonItems = [
    // {
    //   key: "profile",
    //   icon: (
    //     <img
    //       src={profile}
    //       alt="profile"
    //       width={16}
    //       height={16}
    //       style={{
    //         filter:
    //           location.pathname.includes("/profile") ||
    //           location.pathname.includes("/edit-profile")
    //             ? "brightness(0) invert(1)"
    //             : undefined,
    //       }}
    //     />
    //   ),
    //   label: <NavLink to="profile">Profile</NavLink>,
    // },
    // {
    //   key: "settings",
    //   label: <span className="text-black">Setting</span>,
    //   icon: <img src={setting} alt="setting" width={16} height={16} />,
    //   children: [
    //     {
    //       key: "change-password",
    //       icon: <span>&#8226;</span>,
    //       label: (
    //         <NavLink to="settings/change-password">Change Password</NavLink>
    //       ),
    //     },
    //     // Include Privacy Policy and Terms of Service only for admin users
    //     ...(userRole?.role === "admin"
    //       ? [
    //           {
    //             key: "privacy-policy",
    //             icon: <span>&#8226;</span>,
    //             label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
    //           },
    //           {
    //             key: "terms-and-condition",
    //             icon: <span>&#8226;</span>,
    //             label: (
    //               <NavLink to="terms-and-condition">Terms & Conditions</NavLink>
    //             ),
    //           },
    //         ]
    //       : []),
    //   ],
    // },
    // userRole?.role === "admin"
    //   ? {
    //       key: "show-feedback",
    //       icon: (
    //         <img
    //           src={feedback}
    //           alt="show-feedback"
    //           width={20}
    //           style={{
    //             filter: location.pathname.includes("/show-feedback")
    //               ? "brightness(0) invert(1)"
    //               : undefined,
    //           }}
    //         />
    //       ),
    //       label: <NavLink to="show-feedback">Feedback</NavLink>,
    //     }
    //   : {
    //       key: "add-feedback",
    //       icon: (
    //         <img
    //           src={feedback}
    //           alt="add-feedback"
    //           width={16}
    //           height={16}
    //           style={{
    //             filter: location.pathname.includes("/add-feedback")
    //               ? "brightness(0) invert(1)"
    //               : undefined,
    //           }}
    //         />
    //       ),
    //       label: <NavLink to="add-feedback">Feedback</NavLink>,
    //     },
    // {
    //   key: "logout",
    //   icon: (
    //     <img
    //       src={logout}
    //       alt="logout"
    //       width={16}
    //       height={16}
    //       style={{ color: "#222222", fontSize: "16px" }}
    //     />
    //   ),
    //   label: (
    //     <div onClick={() => localStorage.removeItem("home_care_user")}>
    //       <NavLink to="/signin">Logout</NavLink>
    //     </div>
    //   ),
    // },
  ];

  // Select the appropriate menu items based on user role
  const menuItems =
    userRole?.role === "admin" ? adminMenuItems : restaurantOwner;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the progress bar when the route changes
    setProgress(0);

    // After a delay, finish loading the progress bar (you can adjust this delay)
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 100); // Adjust delay as necessary

    // Reset progress once loading is finished
    const resetTimeout = setTimeout(() => {
      setProgress(0);
    }, 200); // Reset after 1.5 seconds to ensure it reaches 100%

    // Cleanup timeouts on component unmount
    return () => {
      clearTimeout(timeout);
      clearTimeout(resetTimeout);
    };
  }, [location]);

  return (
    <div className="h-screen bg-white ">
      <TopLoadingBar
        color="#F2C470" // Customize the color
        progress={progress} // Dynamic progress based on state
        height={5} // Customize height of the bar
        onLoaderFinished={() => setProgress(0)} // Reset after loading
      />
      <ScrollRestoration />
      <Layout className="!relative !bg-white ">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={240}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#F2C470",
            boxShadow: "0px 0px 5px #00000040",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="my-7 mx-auto w-48 "
            />
          </Link>

          {/* Menu items */}
          <Typography.Title
            className="mb-1"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            {/* Menu */}
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />

          {/* Other menu items */}
          <Typography.Title
            level={5}
            className="mt-5"
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            {/* Other */}
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            selectedKeys={activeKeys}
            style={{
              paddingBottom: "40px",
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={commonItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "transparent",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 2,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="px-2 xl:px-5 py-4 xl:py-5 ">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
