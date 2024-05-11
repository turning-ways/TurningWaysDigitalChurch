import { useQuery } from "@tanstack/react-query";
import { useChurchIdStore } from "../../../../stores/churchId";
import InformationInput from "./InformationField";
import axios from "axios";

const ContactInformation = () => {
  const queryParams = new URLSearchParams(location.search);

  const memberId = queryParams.get("id");

  const { churchId } = useChurchIdStore();

  const { data } = useQuery({
    queryKey: ["church", churchId, "member", memberId],
    queryFn: () =>
      axios
        .get(`https://digital-church.onrender.com/api/v1/members/${memberId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  const information = [
    {
      name: "Email",
      value: data && data.member && data.member.email && data.member.email,
    },
    { name: "Phone Number", value: data && data.member && data.member.phone && data.member.phone.MainPhone && data.member.phone.MainPhone },
    { name: "Address", value: data && data.member && data.member.address.HomeAddress && data.member.address.HomeAddress && data.member.address.HomeAddress },
  ];

  return (
    <div className="mt-5">
      {information.map((item) => (
        <InformationInput text={item.name} subText={item.value} />
      ))}
    </div>
  );
};

export default ContactInformation;
