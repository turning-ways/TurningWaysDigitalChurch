import { useState } from "react";
import Modal from "../Modal/Modal";
import { Agreement, termList, OurServices, PropertyRights } from "./terms";

const TermsAndPrivacyPolicy = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [active, setActive] = useState("AGREEMENT TO OUR LEGAL TERMS");
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
        <span className="text-secondary cursor-pointer">Privacy Policy</span>
      </p>
      {openTerms && (
        <Modal onClose={() => setOpenTerms(false)}>
          <main className="bg-white max-w-[1000px] w-full max-h-[750px] overflow-y-scroll">
            <header className="bg-[#17275B] text-white md:text-3xl px-10 py-3 text-center sticky top-0">
              TERMS OF USE
            </header>
            <section className="md:grid md:grid-cols-[350px,1fr] gap-x-4 text-[#1C1C1C] p-4">
              <ul className="space-y-2 hidden md:block sticky top-16 h-fit">
                {termList.map((item) => (
                  <li className={`${active === item.name && "font-azoBold"}`}>
                    <a
                      href={`#${item.name}`}
                      onClick={() => setActive(item.name)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-10">
                <li className="space-y-4">
                  <h1 className="font-azoBold underline">
                    {Agreement.title.toUpperCase()}
                  </h1>
                  <p>{Agreement.p1}</p>
                  <p>{Agreement.p2}</p>
                  <p>
                    {Agreement.p3}{" "}
                    <span className="font-azoBold">{Agreement.p3Bold}</span>
                  </p>
                  <p>{Agreement.p4}</p>
                  <p>{Agreement.p5}</p>
                </li>
                <li className="space-y-4">
                  <h1 className="font-azoBold underline">
                    {OurServices.title.toUpperCase()}
                  </h1>
                  <p>{OurServices.p1}</p>
                </li>
                <li className="space-y-4">
                  <h1
                    className="font-azoBold underline"
                    id={PropertyRights.title.toUpperCase()}
                  >
                    {PropertyRights.title.toUpperCase()}
                  </h1>
                  <p>{PropertyRights.p1}</p>
                  <p>{PropertyRights.p2}</p>
                  <p>{PropertyRights.p3}</p>
                  <p>{PropertyRights.p4}</p>
                  <p>{PropertyRights.p5}</p>
                  <p>{PropertyRights.p6}</p>
                </li>
              </ul>
            </section>
          </main>
        </Modal>
      )}
    </div>
  );
};

export default TermsAndPrivacyPolicy;
