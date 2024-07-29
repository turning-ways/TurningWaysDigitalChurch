import AuthContainer from "../../../ui/Container/AuthContainer";
import Header from "../../../ui/Heading/Header";
import HeaderTwo from "../../../ui/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import { useMemberStore } from "../../../stores/member";
import { notify, useAddChurch } from "../../../hooks/useAuthData";
import { useEffect, useState } from "react";
import DropDownMenu from "../../../ui/DropDownMenu/DropDownMenu";
import NextButton from "../../../ui/Button/NextButton";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const ChurchInfo = () => {
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("Nigeria");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [Cemail, setCEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [parentChurch, setParentChurch] = useState<string>("");
  const [showParentChurch, setShowParentChurch] = useState<boolean>(false);
  const [churchLevel, setChurchLevel] = useState<string>("");
  const [showChurchLevels, setShowChurchLevels] = useState<boolean>(false);
  const { role, howDidYouHear, phoneNumber, email, gender, dateOfBirth } =
    useMemberStore();

  const [showCountry, setShowCountry] = useState<boolean>(false);

  const { churchName, isParentChurch } = useMemberStore();

  const { mutate, isPending } = useAddChurch();

  const handleSelectedParentChurch = (selectedItem: string) => {
    setParentChurch(selectedItem);
    setShowParentChurch(false);
  };
  const handleChurchLevel = (selectedItem: string) => {
    setChurchLevel(selectedItem);
    setShowChurchLevels(false);
  };
  const handleSelectedCountry = (selectedItem: string) => {
    setCountry(selectedItem);
    setShowCountry(false);
  };

  const [countries, setCountries] = useState<[]>([]);

  // const [allCountries, setAllCountries] = useState();

  // const getCountries = async () => {
  //   const result = await axios
  //     .get("https://api.first.org/data/v1/countries")
  //     .then((res) => res.data)
  //     .then((res) => res.data);
  //   setAllCountries(result)
  //   console.log(allCountries);
  // };

  const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        setCountries(data); // This will log an array of objects, each representing a country
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <AuthContainer center="pt-16 md:pt-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              gender !== "" &&
              phoneNumber.MainPhone !== "" &&
              churchName !== "" &&
              isParentChurch !== ""
            ) {
              mutate({
                churchData: {
                  phone,
                  name: churchName,
                  country,
                  state,
                  address,
                  postalCode,
                  city,
                  website,
                  email: Cemail,
                  hasParentChurch: isParentChurch === "Yes" ? false : true,
                },
                memberData: {
                  role: role.toLowerCase(),
                  howDidYouHear: howDidYouHear.toLowerCase(),
                  phone: phoneNumber.MainPhone,
                  email,
                  gender: gender.toLowerCase(),
                  dateOfBirth,
                },
              });
            } else {
              notify("Fill in all the required fields");
            }
          }}>
          <div className="mb-5 max-w-[550px] mx-auto">
            <p>
              <span className="text-[#446DE3] text-2xl">3</span> of 3
            </p>
            <Header>Church Account Setup</Header>
            <p className="text-[#949995]">Kindly fill the information below</p>
          </div>
          {/* < div className="space-y-8 sm:h-[440px] overflow-y-scroll"> */}
          <div className="space-y-8 mb-8">
            {isParentChurch !== "Yes" && (
              <div className="relative">
                <HeaderTwo>
                  {" "}
                  Select parent church <span className="text-secondary">*</span>
                </HeaderTwo>
                <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
                  <input
                    className="outline-none w-full h-auto bg-inherit"
                    placeholder="Winners"
                    value={parentChurch}
                    readOnly={true}
                    onChange={(e) => setParentChurch(e.target.value)}
                  />
                  <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
                  <TiArrowSortedDown
                    className="cursor-pointer text-3xl"
                    onClick={() => setShowParentChurch(!showParentChurch)}
                  />
                </div>
                {showParentChurch && (
                  <DropDownMenu
                    onSelect={handleSelectedParentChurch}
                    dropdownItems={["Winners", "Redeem"]}
                  />
                )}
              </div>
            )}
            {isParentChurch !== "Yes" && (
              <div className="relative">
                <HeaderTwo>
                  Select church level within parent church{" "}
                  <span className="text-secondary">*</span>
                </HeaderTwo>
                <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center">
                  <input
                    className="outline-none w-full h-auto bg-inherit"
                    placeholder="Winners"
                    value={churchLevel}
                    readOnly={true}
                    onChange={(e) => setChurchLevel(e.target.value)}
                  />
                  <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
                  <TiArrowSortedDown
                    className="cursor-pointer text-3xl"
                    onClick={() => setShowChurchLevels(!showChurchLevels)}
                  />
                </div>
                {showChurchLevels && (
                  <DropDownMenu
                    onSelect={handleChurchLevel}
                    dropdownItems={["Level 1", "Level 2", "Level 3"]}
                  />
                )}
              </div>
            )}
            <div className="mb-2">
              <HeaderTwo>Your Church Website</HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="https://hope.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <HeaderTwo>
                Enter your church's email address{" "}
                <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="info@hopecommunitychurch.org"
                value={Cemail}
                onChange={(e) => setCEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <HeaderTwo>
                Phone Number <span className="text-secondary">*</span>
              </HeaderTwo>

              <PhoneInput
                defaultCountry="ng"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={{
                  width: "100%",
                  paddingLeft: "10px",
                  paddingTop: "24px",
                  paddingRight: "10px",
                  paddingBottom: "24px",
                  backgroundColor: "#F7FAFC",
                  borderColor: "#EBEFF9",
                  borderStartEndRadius: "12px",
                  borderEndEndRadius: "12px",
                  fontSize: "18px",
                }}
                countrySelectorStyleProps={{
                  buttonStyle: {
                    height: "100%",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: "#F7FAFC",
                    borderColor: "#EBEFF9",
                    borderEndStartRadius: "12px",
                    borderStartStartRadius: "12px",
                  },
                }}
              />
            </div>
            <div className="mb-2">
              <HeaderTwo>
                Enter your church's street address{" "}
                <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Magodo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="mb-2 w-full lg:w-1/2 lg:mb-0">
                <HeaderTwo>
                  City <span className="text-secondary">*</span>
                </HeaderTwo>
                <input
                  type="text"
                  className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                  placeholder="Magodo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-2 lg:mb-0 w-full lg:w-1/2">
                <HeaderTwo>
                  State <span className="text-secondary">*</span>
                </HeaderTwo>
                <input
                  type="text"
                  className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                  placeholder="Lagos"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-2">
              <HeaderTwo>Postal/Zip Code</HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="123456"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="relative">
              <HeaderTwo>
                Country of Operation <span className="text-secondary">*</span>
              </HeaderTwo>
              <div
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center mb-6"
                onClick={() => {
                  setShowCountry(!showCountry);
                }}>
                <input
                  className="outline-none w-full h-auto bg-inherit"
                  placeholder="Nigeria"
                  value={country}
                  readOnly={true}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
              {showCountry && (
                <DropDownMenu
                  onSelect={handleSelectedCountry}
                  dropdownItems={countries
                    .map(
                      (country: { name: { common: string } }) =>
                        country.name.common
                    )
                    .sort((a, b) => a.localeCompare(b))}
                  onClose={() => {
                    setShowCountry(false);
                  }}
                />
              )}
            </div>
          </div>
          <NextButton isPending={isPending} />
        </form>
      </AuthContainer>
    </>
  );
};

export default ChurchInfo;
