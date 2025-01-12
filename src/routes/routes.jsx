import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "../pages/DahsboardPages/AdminLogin.jsx";
import AdminForgetPassword from "../pages/DahsboardPages/AdminForgetPassword.jsx";
import AdminVerificationCode from "../pages/DahsboardPages/AdminVerificationCode.jsx";
import AdminResetPassword from "../pages/DahsboardPages/AdminResetPassword.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import DashboardHome from "../pages/DahsboardPages/DashboardHome.jsx";
import AuctionManagment from "../pages/DahsboardPages/AuctionManagment.jsx";
import ActiveAuctionPage from "../pages/DahsboardPages/ActiveAuctionPage.jsx";
import OrderManagment from "../pages/DahsboardPages/OrderManagment.jsx";
import UserManagement from "../pages/DahsboardPages/UserManagement.jsx";
import Profile from "../pages/DahsboardPages/Profile.jsx";
import Aboutus from "../pages/DahsboardPages/Aboutus.jsx";
import DashboardTipsAndTricks from "../pages/DahsboardPages/DashboardTipsAndTricks.jsx";
import DashboardFaqs from "../pages/DahsboardPages/DashboardFaqs.jsx";
import DashboardPrivacyAndPolicy from "../pages/DahsboardPages/DashboardPrivacyAndPolicy.jsx";
import DashboardTermsAndCondition from "../pages/DahsboardPages/DashboardTermsAndCondition.jsx";
import DashboardAccessibility from "../pages/DahsboardPages/DashboardAccessibility.jsx";
import Transaction from "../pages/DahsboardPages/Transaction.jsx";
import DashboardNotification from "../pages/DahsboardPages/DashboardNotification.jsx";
import Category from "../pages/DahsboardPages/CategoryAndBanner.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import FinancialManagement from "../pages/DahsboardPages/FinancialManagement.jsx";
import Contact from "../pages/DahsboardPages/Contact.jsx";
import Help from "../pages/DahsboardPages/Help.jsx";
import Collaboration from "../pages/DahsboardPages/Collaboration.jsx";
import Report from "../pages/DahsboardPages/Report.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element : <PrivateRoutes><DashboardLayout/></PrivateRoutes>,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "autction-managment",
        element: <AuctionManagment />,
      },
      {
        path: "active-auction",
        element: <ActiveAuctionPage />,
      },
      {
        path: "order-managment",
        element: <OrderManagment />,
      },
      {
        path: "user-managment",
        element: <UserManagement />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "about-us",
        element: <Aboutus />,
      },
      {
        path: "tips-tricks",
        element: <DashboardTipsAndTricks />,
      },
      {
        path: "faqs",
        element: <DashboardFaqs />,
      },
      {
        path: "privacy-policy",
        element: <DashboardPrivacyAndPolicy />,
      },
      {
        path: "terms-condition",
        element: <DashboardTermsAndCondition />,
      },
      {
        path: "accessibility",
        element: <DashboardAccessibility />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Help",
        element: <Help />,
      },
      {
        path: "collaboration",
        element: <Collaboration />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "notification",
        element: <DashboardNotification />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "financial-management",
        element: <FinancialManagement />,
      },
    ],
  },

  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-forget-password",
    element: <AdminForgetPassword />,
  },
  {
    path: "/admin-verification-code",
    element: <AdminVerificationCode />,
  },
  {
    path: "/admin-reset-password",
    element: <AdminResetPassword />,
  },
  // {
  //     path: '/admin-reset-password',
  //     element: <AdminLogin />
  // },
]);

export default router;
