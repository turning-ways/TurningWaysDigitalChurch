import {
  BrowserRouter as Router,
  Routes,
  Route,

  // Navigate,
} from "react-router-dom";
import PersonalInfo from "./pages/Signup/ChurchAccountSetup/PersonalInfo";
import OtpVerification from "./pages/Signup/OtpVerification";
import Register from "./pages/Signup/Register";
import OrganizationInfo from "./pages/Signup/ChurchAccountSetup/OrganizationInfo";
import ChurchInfo from "./pages/Signup/ChurchAccountSetup/ChurchInfo";
import Request from "./pages/Signup/ChurchAccountSetup/BranchOfPC/Request";
import LoginWithEmail from "./pages/Signin/WithEmail/LoginWithEmail";
import LoginWithNumber from "./pages/Signin/WithPhoneNumber/LoginWithNumber";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordOtp from "./pages/ForgotPassword/ForgotPasswordOtp";
import Dashboard from "./pages/Overview/Dashboard/Dashboard";
import PersonalInformation from "./pages/Overview/Membership/Membership Profile/PersonalInformation";
import ContactInformation from "./pages/Overview/Membership/Membership Profile/ContactInformation";
import ChurchInformation from "./pages/Overview/Membership/Membership Profile/ChurchInformation";
import ProfileEdit from "./pages/Overview/Membership/Edit Profile/ProfileEdit";
import EditProfilePersonalInfo from "./pages/Overview/Membership/Edit Profile/EditProfilePersonalInfo";
import EditProfileContactInfo from "./pages/Overview/Membership/Edit Profile/EditProfileContactInfo";
import EditProfileChurchInfo from "./pages/Overview/Membership/Edit Profile/EditProfileChurchInformation";
import MembershipProfile from "./pages/Overview/Membership/Membership Profile/MembershipProfile";
import Membership from "./pages/Overview/Membership/Membership";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Forms from "./pages/Overview/Forms/Forms";
// import Workflow from "./pages/Overview/Workflow/Workflow";
// import Settings from "./pages/Overview/Settings/Settings";
// import Help from "./pages/Overview/Help/Help";
// import Logout from "./pages/Overview/Logout/Logout";
import LandingPage from "./pages/LandingPage/LandingPage";
import UpdateProfile from "./pages/Overview/Membership/Update Profile/UpdateProfile";
import UpdatePersonalInfo from "./pages/Overview/Membership/Update Profile/UpdatePersonalInfo";
import UpdateContactInfo from "./pages/Overview/Membership/Update Profile/UpdateContactInfo";
import UpdateChurchInfo from "./pages/Overview/Membership/Update Profile/UpdateChurchInfo";
import SmsMessage from "./pages/Overview/Messages/SmsMessage";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import "./App.css";
import ProtectedRoutes from "./ProtectedRoutes";
import NotBuilt from "./pages/NotBuilt";

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
          <Route path="register">
            <Route path="otp-verification" element={<OtpVerification />} />
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="directory" element={<Membership />} />
              <Route path="directory">
                <Route path="member" element={<MembershipProfile />}>
                  <Route
                    path="personal-information"
                    element={<PersonalInformation />}
                  />
                  <Route
                    path="contact-information"
                    element={<ContactInformation />}
                  />
                  <Route
                    path="church-information"
                    element={<ChurchInformation />}
                  />
                </Route>
                <Route path="add-member" element={<ProfileEdit />}>
                  <Route
                    path="personal-information"
                    element={<EditProfilePersonalInfo />}
                  />
                  <Route
                    path="contact-information"
                    element={<EditProfileContactInfo />}
                  />
                  <Route
                    path="church-information"
                    element={<EditProfileChurchInfo />}
                  />
                </Route>
                <Route path="update-member" element={<UpdateProfile />}>
                  <Route
                    path="personal-information"
                    element={<UpdatePersonalInfo />}
                  />
                  <Route
                    path="contact-information"
                    element={<UpdateContactInfo />}
                  />
                  <Route
                    path="church-information"
                    element={<UpdateChurchInfo />}
                  />
                </Route>
                <Route path="sms" element={<SmsMessage />} />
              </Route>
              <Route path="forms" element={<NotBuilt active="Forms" />} />
              <Route path="workflow" element={<NotBuilt active="Workflow" />} />
              <Route path="settings" element={<NotBuilt active="Settings" />} />
              <Route path="help" element={<NotBuilt active="Help" />} />
              <Route path="logout" element={<NotBuilt active="Logout" />} />
              {/* <Route path={`/admin/overview/dashboard/${churchId}`} element={<Dashboard />} /> */}
            </Route>
          </Route>

          {/* Admin's Overview  */}
          <Route path="/request" element={<Request />} />
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
