import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PersonalInfo from "./pages/Signup/ChurchAccountSetup/PersonalInfo";
import PasswordReset from "./pages/PasswordReset/PasswordEntry/PasswordReset";
import OtpVerification from "./pages/PasswordReset/Otp/Signup/OtpVerification";
import Register from "./pages/Signup/Register";
import OrganizationInfo from "./pages/Signup/ChurchAccountSetup/OrganizationInfo";
import ChurchInfo from "./pages/Signup/ChurchAccountSetup/ChurchInfo";
import Request from "./pages/Signup/ChurchAccountSetup/BranchOfPC/Request";
import LoginWithEmail from "./pages/Signin/WithEmail/LoginWithEmail";
// import LoginWithNumber from "./pages/Signin/WithPhoneNumber/LoginWithNumber";
import EmailForPasswordReset from "./pages/PasswordReset/EmailEntry/EmailForPasswordReset";
import PasswordResetOtp from "./pages/PasswordReset/Otp/ForgotPassword/OtpVerification";
import Navbar from "./components/Navbar/Navbar";
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
import Forms from "./pages/Overview/Forms/Forms";
import Workflow from "./pages/Overview/Workflow/Workflow";
import Settings from "./pages/Overview/Settings/Settings";
import Help from "./pages/Overview/Help/Help";
import Logout from "./pages/Overview/Logout/Logout";
import { useChurchIdStore } from "./stores/churchId";

function App() {
  const { churchId } = useChurchIdStore();
  const isAuthenticated = churchId !== (null || undefined);
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/login-with-number" element={<LoginWithNumber />} /> */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/admin/overview/dashboard/${churchId}`} />
              ) : (
                <LoginWithEmail />
              )
            }
          />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request" element={<Request />} />
          <Route path="/personalinfo" element={<PersonalInfo />} />
          <Route path="/organizationinfo" element={<OrganizationInfo />} />
          <Route path="/churchinfo" element={<ChurchInfo />} />

          <Route
            path="/signup/otp-verification"
            element={<OtpVerification />}
          />
          <Route
            path="/password-reset/otp-verification"
            element={<PasswordResetOtp />}
          />
          <Route
            path="/password-reset/set-new-password"
            element={<PasswordReset />}
          />
          <Route
            path="/password-reset/email-entry"
            element={<EmailForPasswordReset />}
          />
          <Route path={`/admin/overview/dashboard/${churchId}`} element={<Dashboard />} />
          <Route path="/overview/membership" element={<MembershipProfile />}>
            <Route
              path="personal-information"
              element={<PersonalInformation />}
            />
            <Route
              path="contact-information"
              element={<ContactInformation />}
            />
            <Route path="church-information" element={<ChurchInformation />} />
          </Route>
          <Route
            path="/overview/membership/profile-edit"
            element={<ProfileEdit />}
          >
            <Route path="personal-info" element={<EditProfilePersonalInfo />} />
            <Route path="contact-info" element={<EditProfileContactInfo />} />
            <Route path="church-info" element={<EditProfileChurchInfo />} />
          </Route>
          <Route path={`/admin/church/${churchId}/members`} element={<Membership />} />

          {/* Forms Route */}
          <Route path="/overview/forms" element={<Forms />} />

          {/* Workflow Route */}
          <Route path="/overview/workflow" element={<Workflow />} />

          {/* Settings Route */}
          <Route path="/overview/settings" element={<Settings />} />

          {/* Help Route */}
          <Route path="/overview/help" element={<Help />} />

          {/* Logout Route */}
          <Route path="/overview/logout" element={<Logout />} />
        </Routes>
        {/* <Route path="/checkout">
        </Route> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
