import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PersonalInfo from "./pages/Signup/ChurchAccountSetup/PersonalInfo";
import OtpVerification from "./pages/Signup/OtpVerification";
import Register from "./pages/Signup/Register";
import OrganizationInfo from "./pages/Signup/ChurchAccountSetup/OrganizationInfo";
import ChurchInfo from "./pages/Signup/ChurchAccountSetup/ChurchInfo";
import Request from "./pages/Signup/ChurchAccountSetup/BranchOfPC/Request";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordOtp from "./pages/ForgotPassword/ForgotPasswordOtp";
import Dashboard from "./pages/Overview/Dashboard/Dashboard";
import ProfileEdit from "./pages/Overview/Membership/Edit Profile/ProfileEdit";
import MembershipProfile from "./pages/Overview/Membership/Membership Profile/MembershipProfile";
import Membership from "./pages/Overview/Membership/Membership";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import UpdateProfile from "./pages/Overview/Membership/Update Profile/UpdateProfile";
import SmsMessage from "./pages/Overview/Messages/SmsMessage";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import "./App.css";
import ProtectedRoutes from "./ProtectedRoutes";
import NotBuilt from "./pages/NotBuilt";
import RegisterWithPhone from "./pages/Signup/RegisterWithPhone";
import PhoneOtpVerification from "./pages/Signup/PhoneOtpVerification";
import Members from "./pages/Members";
import LoginWithEmail from "./pages/Signin/WithEmail/LoginWithEmail";
import LoginWithNumber from "./pages/Signin/WithPhoneNumber/LoginWithNumber";
import Contacts from "./pages/Overview/Contacts/Contacts";
import ContactDetails from "./pages/Overview/Contacts/ContactDetails";
import Settings from "./pages/Overview/Settings/Settings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Login User  */}
          <Route path="login">
            <Route path="email" element={<LoginWithEmail />} />
            <Route path="phone" element={<LoginWithNumber />} />
          </Route>
          {/* <Route path="/login-with-email" element={<LoginWithEmail />} /> */}

          {/* Register a New User  */}
          <Route path="/register" element={<Register />} />
          <Route path="/register/phone" element={<RegisterWithPhone />} />
          <Route path="register">
            <Route path="otp-verification" element={<OtpVerification />} />
            <Route
              path="phone-otp-verification"
              element={<PhoneOtpVerification />}
            />
            <Route path="personalinfo" element={<PersonalInfo />} />
            <Route path="organizationinfo" element={<OrganizationInfo />} />
            <Route path="churchinfo" element={<ChurchInfo />} />
          </Route>

          {/* Forgot Password  */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password">
            <Route path="otp-verification" element={<ForgotPasswordOtp />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="admin">
              <Route path="dashboard/:date" element={<Dashboard />} />
              <Route path="directory" element={<Membership />} />
              <Route path="directory">
                <Route path="member/:section" element={<MembershipProfile />}></Route>
                <Route path="add-member/:section" element={<ProfileEdit />}></Route>
                <Route path="update-member/:section" element={<UpdateProfile />}></Route>
                <Route path="sms" element={<SmsMessage />} />
              </Route>
              <Route path="forms" element={<NotBuilt active="Forms" />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="contacts/:contact_id" element={<ContactDetails />}></Route>
              <Route path="setting/:setting_header" element={<Settings />} />
              <Route path="help" element={<NotBuilt active="Help" />} />
              <Route path="logout" element={<NotBuilt active="Logout" />} />


            </Route>
          </Route>

          {/* Admin's Overview  */}
          <Route path="/request" element={<Request />} />
          <Route path="/member" element={<Members />} />
          {/* <Route path={`/admin/church/${churchId}/members`} element={<Membership />} /> */}

          {/* Forms Route */}

          {/* Workflow Route */}

          {/* Settings Route */}

          {/* Help Route */}

          {/* Logout Route */}

          {/**UPDATE PROFILE */}

          {/**MESSAGES */}
        </Routes>
        {/* <Route path="/checkout">
        </Route> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
