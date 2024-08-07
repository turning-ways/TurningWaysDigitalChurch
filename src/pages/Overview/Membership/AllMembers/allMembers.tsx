import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  clearMemberDetails,
  getAllMembers,
  selectMembers,
} from "@/slices/memberSlice";
import { useChurchIdStore } from "@/stores/churchId";
import { useEffect } from "react";
import { Member } from "./members";

export default function Members() {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector(selectMembers);
  // const isPending = useSelector(selectMemberLoading);
  const churchId = useChurchIdStore((state) => state.churchId);

  useEffect(() => {
    dispatch(clearMemberDetails());
    dispatch(getAllMembers({ churchId }));
  }, [churchId]);

  return (
    <div className="flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={members as unknown as Member[]}
        // loading={isPending}
        // onFetch={() => dispatch(getAllMembers({ churchId }))}
      />
    </div>
  );
}
