// import { useQuery } from "@tanstack/react-query";

// import { useUserAuth } from "../stores/user";
// import ApiClient from "../services/api-client";

// interface Contact {
//     first_name: string;
//     last_name: string;
//     id: string;
// }

// interface Data {
//     members: Contact[],
//     contacts: Contact[]
// }

// const useSearch = (value: string) => {

//   const churchId = useUserAuth((auth) => auth?.user?.churchId?._id);

//   const apiClient = new ApiClient<Data>(
//     "/api/v1/churches/" + churchId + "/member-search?search=" + value
//   );

//   return useQuery<Data>({
//     queryKey: ["church", churchId, "member-search", value],
//     queryFn: () => apiClient.get(),
//   });
// };

// export default useSearch;
