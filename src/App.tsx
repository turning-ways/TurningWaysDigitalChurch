import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy load components
const PersonalInfo = lazy(
  () => import("./pages/Signup/ChurchAccountSetup/PersonalInfo")
);
const OtpVerification = lazy(() => import("./pages/Signup/OtpVerification"));
const Register = lazy(() => import("./pages/Signup/Register"));
const OrganizationInfo = lazy(
  () => import("./pages/Signup/ChurchAccountSetup/OrganizationInfo")
);
const ChurchInfo = lazy(
  () => import("./pages/Signup/ChurchAccountSetup/ChurchInfo")
);
const Request = lazy(
  () => import("./pages/Signup/ChurchAccountSetup/BranchOfPC/Request")
);
const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword")
);
const ForgotPasswordOtp = lazy(
  () => import("./pages/ForgotPassword/ForgotPasswordOtp")
);
const Dashboard = lazy(() => import("./pages/Overview/Dashboard/Dashboard"));
const ProfileEdit = lazy(
  () => import("./pages/Overview/Membership/Edit Profile/ProfileEdit")
);
const MembershipProfile = lazy(
  () =>
    import("./pages/Overview/Membership/Membership Profile/MembershipProfile")
);
const Membership = lazy(() => import("./pages/Overview/Membership/Membership"));
const UpdateProfile = lazy(
  () => import("./pages/Overview/Membership/Update Profile/UpdateProfile")
);
const SmsMessage = lazy(() => import("./pages/Overview/Messages/SmsMessage"));
const ResetPassword = lazy(
  () => import("./pages/ForgotPassword/ResetPassword")
);
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const NotBuilt = lazy(() => import("./pages/NotBuilt"));
const Members = lazy(() => import("./pages/Members"));
const LoginWithEmail = lazy(
  () => import("./pages/Signin/WithEmail/LoginWithEmail")
);
const LoginWithNumber = lazy(
  () => import("./pages/Signin/WithPhoneNumber/LoginWithNumber")
);
const Contacts = lazy(() => import("./pages/Overview/Contacts/Contacts"));
const ContactDetails = lazy(
  () => import("./pages/Overview/Contacts/ContactDetails")
);
const Settings = lazy(() => import("./pages/Overview/Settings/Settings"));
const Invite = lazy(() => import("./pages/Signup/Invitation"));

function App() {
  return (
    <>
      <Router>
        <Suspense
          fallback={
            <div>
              <div className="w-full h-full rounded-md bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]"></div>
              </div>
            </div>
          }>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Login User  */}
            <Route path="login">
              <Route path="email" element={<LoginWithEmail />} />
              <Route path="phone" element={<LoginWithNumber />} />
            </Route>

            {/* Register a New User  */}
            <Route path="/register" element={<Register />} />
            <Route path="/invite" element={<Invite />} />
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
                <Route path="dashboard/:date" element={<Dashboard />} />
                <Route path="directory" element={<Membership />} />
                <Route path="directory">
                  <Route
                    path="member/:section"
                    element={<MembershipProfile />}
                  />
                  <Route path="add-member/:section" element={<ProfileEdit />} />
                  <Route
                    path="update-member/:section"
                    element={<UpdateProfile />}
                  />
                  <Route path="sms" element={<SmsMessage />} />
                </Route>
                <Route path="forms" element={<NotBuilt active="Forms" />} />
                <Route path="contacts" element={<Contacts />} />
                <Route
                  path="contacts/:contact_id"
                  element={<ContactDetails />}
                />
                <Route path="setting/:setting_header" element={<Settings />} />
                <Route path="help" element={<NotBuilt active="Help" />} />
                <Route path="logout" element={<NotBuilt active="Logout" />} />
              </Route>
            </Route>

            {/* Additional Routes */}
            <Route path="/request" element={<Request />} />
            <Route path="/member" element={<Members />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

// function App() {
// 	return (
// 		<>
// 			<Router>
// 				<Routes>
// 					<Route path="/" element={<LandingPage />} />

// 					{/* Login User  */}
// 					<Route path="login">
// 						<Route path="email" element={<LoginWithEmail />} />
// 						<Route path="phone" element={<LoginWithNumber />} />
// 					</Route>
// 					{/* <Route path="/login-with-email" element={<LoginWithEmail />} /> */}

// 					{/* Register a New User  */}
// 					<Route path="/register" element={<Register />} />
// 					<Route path="/invite" element={<Invite />} />
// 					{/* <Route path="/register/phone" element={<RegisterWithPhone />} /> */}
// 					<Route path="register">
// 						<Route path="otp-verification" element={<OtpVerification />} />
// 						{/* <Route
//               path="phone-otp-verification"
//               element={<PhoneOtpVerification />}
//             /> */}
// 						<Route path="personalinfo" element={<PersonalInfo />} />
// 						<Route path="organizationinfo" element={<OrganizationInfo />} />
// 						<Route path="churchinfo" element={<ChurchInfo />} />
// 					</Route>

// 					{/* Forgot Password  */}
// 					<Route path="/forgot-password" element={<ForgotPassword />} />
// 					<Route path="forgot-password">
// 						<Route path="otp-verification" element={<ForgotPasswordOtp />} />
// 						<Route path="reset-password" element={<ResetPassword />} />
// 					</Route>

// 					<Route element={<ProtectedRoutes />}>
// 						<Route path="admin">
// 							<Route path="dashboard/:date" element={<Dashboard />} />
// 							<Route path="directory" element={<Membership />} />
// 							<Route path="directory">
// 								<Route path="member/:section" element={<MembershipProfile />}></Route>
// 								<Route path="add-member/:section" element={<ProfileEdit />}></Route>
// 								<Route path="update-member/:section" element={<UpdateProfile />}></Route>
// 								<Route path="sms" element={<SmsMessage />} />
// 							</Route>
// 							<Route path="forms" element={<NotBuilt active="Forms" />} />
// 							<Route path="contacts" element={<Contacts />} />
// 							<Route path="contacts/:contact_id" element={<ContactDetails />}></Route>
// 							<Route path="setting/:setting_header" element={<Settings />} />
// 							<Route path="help" element={<NotBuilt active="Help" />} />
// 							<Route path="logout" element={<NotBuilt active="Logout" />} />
// 						</Route>
// 					</Route>

// 					{/* Admin's Overview  */}
// 					<Route path="/request" element={<Request />} />
// 					<Route path="/member" element={<Members />} />
// 					{/* <Route path={`/admin/church/${churchId}/members`} element={<Membership />} /> */}

// 					{/* Forms Route */}

// 					{/* Workflow Route */}

// 					{/* Settings Route */}

// 					{/* Help Route */}

// 					{/* Logout Route */}

// 					{/**UPDATE PROFILE */}

// 					{/**MESSAGES */}
// 				</Routes>
// 				{/* <Route path="/checkout">
//         </Route> */}
// 			</Router>
// 			<ToastContainer />
// 		</>
// 	);
// }
