/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../Pages/Auth/SignIn";
import ForgotPassword from "../Pages/Auth/ForgetPassword";
import OtpPage from "../Pages/Auth/OtpPage";
import UpdatePassword from "../Pages/Auth/UpdatePassword";

//* Common

import Notifications from "../Components/Dashboard/Notifications";
import Profile from "../Pages/Common/Profile";
import EditProfile from "../Pages/Common/EditProfile";
import SettingsChangePassword from "../Pages/Common/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Pages/Common/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Pages/Common/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Pages/Common/settings/SettingsUpdatePassword";



//* Admin Dashboard
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AllCompanies from "../Pages/Admin/Companies";
import ServiceUser from "../Pages/Admin/ServiceUser";
import Carer from "../Pages/Admin/Carer";

//* Company Dashboard
import CompanyDashboard from "../Pages/Company/CompanyDashboard";
import CompanyServiceUser from "../Pages/Company/CompanyServiceUser";
import CompanyCarer from "../Pages/Company/CompanyCarer";
import CompanyEmployee from "../Pages/Company/CompanyEmployee";
import CompanyReport from "../Pages/Company/CompanyReport";
import Loading from "../Components/UI/Loading";
import AddFeedback from "../Pages/Company/AddFeedback";
import AdminAllFeedBack from "../Pages/Admin/AllFeedback";
import OverviewPage from "../Pages/Admin/NewAdmin/OverviewPage";
import StaffPage from "../Pages/Admin/NewAdmin/StaffPage";
import QueriesPage from "../Pages/Admin/NewAdmin/QueriesPage";
import FeedbackPage from "../Pages/Admin/NewAdmin/FeedbackPage";

import InstructionandGuide from "../Pages/Admin/NewAdmin/DataManagementPages/InstructionandGuide";
import Disclaimer from "../Pages/Admin/NewAdmin/DataManagementPages/Disclaimer";
import FAQ from "../Pages/Admin/NewAdmin/DataManagementPages/FAQ";
import PrivacyPolicy from "../Pages/Admin/NewAdmin/DataManagementPages/PrivacyPolicy";
import TermsofService from "../Pages/Admin/NewAdmin/DataManagementPages/TermsofService";
import Announcement from "../Pages/Admin/NewAdmin/DataManagementPages/Announcement";
import SettingPage from "../Pages/Admin/NewAdmin/SettingPage";

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
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
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
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "companies",
        element: <AllCompanies />,
      },
      {
        path: "service-User",
        element: <ServiceUser />,
      },
      {
        path: "carer",
        element: <Carer />,
      },
      {
        path: "show-feedback",
        element: <AdminAllFeedBack />,
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
    children: [
      {
        path: "dashboard",
        element: <CompanyDashboard />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "service-user",
        element: <CompanyServiceUser />,
      },
      {
        path: "carer",
        element: <CompanyCarer />,
      },
      {
        path: "employee",
        element: <CompanyEmployee />,
      },
      {
        path: "report",
        element: <CompanyReport />,
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
        path: "add-feedback",
        element: <AddFeedback />,
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
