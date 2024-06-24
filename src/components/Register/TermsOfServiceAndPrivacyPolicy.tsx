import { useState } from "react";
import PrivacyAndPolicy from "../../ui/Agreement/PrivacyAndPolicy";
import TermsAndUse from "../../ui/Agreement/TermsAndUse";

const TermsOfServiceAndPrivacyPolicy = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  return (
    <div>
      <p>
        I agree to the{" "}
        <span
          className="text-secondary cursor-pointer"
          onClick={() => setOpenTerms(!openTerms)}
        >
          Terms of Service
        </span>{" "}
        and the{" "}
        <span className="text-secondary cursor-pointer"  onClick={() => setOpenPrivacyPolicy(!openPrivacyPolicy)}>Privacy Policy</span>
      </p>
      {openTerms && <TermsAndUse onClose={() => setOpenTerms(!openTerms)} />}
      {openPrivacyPolicy && <PrivacyAndPolicy onClose={() => setOpenPrivacyPolicy(!openPrivacyPolicy)}/>}
    </div>
  );
};

export default TermsOfServiceAndPrivacyPolicy;
