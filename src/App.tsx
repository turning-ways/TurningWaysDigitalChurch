import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalInfo from "./pages/Signup/ChurchAccountSetup/PersonalInfo";
import PasswordReset from "./pages/PasswordReset/PasswordEntry/PasswordReset";
import OtpVerification from "./pages/PasswordReset/Otp/Signup/OtpVerification";
import Register from "./pages/Signup/Register";
import OrganizationInfo from "./pages/Signup/ChurchAccountSetup/OrganizationInfo";
import ChurchInfo from "./pages/Signup/ChurchAccountSetup/ChurchInfo";
import Request from "./pages/Signup/ChurchAccountSetup/BranchOfPC/Request";
import LoginWithEmail from "./pages/Signin/WithEmail/LoginWithEmail";
import LoginWithNumber from "./pages/Signin/WithPhoneNumber/LoginWithNumber";
import EmailForPasswordReset from "./pages/PasswordReset/EmailEntry/EmailForPasswordReset";
import PasswordResetOtp from "./pages/PasswordReset/Otp/ForgotPassword/OtpVerification";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login-with-number" element={<LoginWithNumber />} />
          <Route path="/" element={<LoginWithEmail />} />
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
          <Route path="/overview/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
