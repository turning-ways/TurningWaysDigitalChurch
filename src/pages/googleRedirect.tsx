import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useChurchIdStore } from "@/stores/churchId";

const GoogleRedirect = () => {
  // get the token from the URL and get the id from the Url and the redirectUrl
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const churchId = searchParams.get("churchId");
  const redirectUrl = searchParams.get("redirectUrl");
  const { setChurchId } = useChurchIdStore();

  React.useEffect(() => {
    console.log(token, churchId, redirectUrl);
    // send the token to the server
    axios
      .get(
        `https://turningways-api-3hcn.onrender.com/api/v1/auth/google/verify?token=${token}&churchId=${churchId}&redirectUrl=${redirectUrl}&userId=${id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        // redirect to the dashboard
        setChurchId(res.data.data.churchId);
        if (res.data.data.redirectUrl) {
          window.location.href = res.data.data.redirectUrl;
        }
      });
  }, []);

  return <div></div>;
};

export default GoogleRedirect;
