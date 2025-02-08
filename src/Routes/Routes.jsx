/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import SignIn from "../Pages/Auth/SignIn";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

//* Common

import Notifications from "../Components/Dashboard/Notifications";
import EditProfile from "../Pages/Common/EditProfile";
import Profile from "../Pages/Common/Profile";
import SettingsChangePassword from "../Pages/Common/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Pages/Common/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Pages/Common/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Pages/Common/settings/SettingsUpdatePassword";

//* Company Dashboard
import Loading from "../Components/UI/Loading";
// import AdminAllFeedBack from "../Pages/Admin/AllFeedback";
import FeedbackPage from "../Pages/Admin/RestaurantOwner/FeedbackPage";
import OverviewPage from "../Pages/Admin/RestaurantOwner/OverviewPage";
import QueriesPage from "../Pages/Admin/RestaurantOwner/QueriesPage";
import StaffPage from "../Pages/Admin/RestaurantOwner/StaffPage";

import Announcement from "../Pages/Admin/RestaurantOwner/DataManagementPages/Announcement";
import Disclaimer from "../Pages/Admin/RestaurantOwner/DataManagementPages/Disclaimer";
import FAQ from "../Pages/Admin/RestaurantOwner/DataManagementPages/FAQ";
import InstructionandGuide from "../Pages/Admin/RestaurantOwner/DataManagementPages/InstructionandGuide";
import PrivacyPolicy from "../Pages/Admin/RestaurantOwner/DataManagementPages/PrivacyPolicy";
import TermsofService from "../Pages/Admin/RestaurantOwner/DataManagementPages/TermsofService";
import SettingPage from "../Pages/Admin/RestaurantOwner/SettingPage";

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("home_care_user"));
    if (user && user.role) {
      navigate(`/${user.role}/overview`, { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "restaurantOwner",
    element: (
      <ProtectedRoute role="restaurantOwner">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "overview",
        element: <OverviewPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
      {
        path: "queries",
        element: <QueriesPage />,
      },
      {
        path: "feedback",
        element: <FeedbackPage />,
      },
      {
        path: "instruction",
        element: <InstructionandGuide />,
      },
      {
        path: "disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms",
        element: <TermsofService />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "announcement",
        element: <Announcement />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-and-condition",
        element: <TermsofService />,
      },
      {
        path: "settings/change-password",
        element: <SettingsChangePassword />,
      },
      {
        path: "settings/forgot-password",
        element: <SettingsForgotPassword />,
      },
      {
        path: "settings/otp-page",
        element: <SettingsOtpPage />,
      },
      {
        path: "settings/update-password",
        element: <SettingsUpdatePassword />,
      },
    ],
  },
  {
    path: "company",
    element: (
      <ProtectedRoute role="company">
        <DashboardLayout />
      </ProtectedRoute>
    ),
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-otp",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
]);

export default router;
