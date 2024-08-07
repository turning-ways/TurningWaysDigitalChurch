/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef } from "react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import useGetAllMembers from "../hooks/Member/useGetAllMembers";
import { useNavigate } from "react-router-dom";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Members = () => {
  const { data: members } = useGetAllMembers({ page: 1, pageSize: 100 }); // Adjust pageSize as needed

  const rowData = useMemo(
    () =>
      members?.map(
        (member: {
          first_name: any;
          gender: any;
          phone: { MainPhone: any };
          email: any;
          dateOfBirth: any;
          id: any;
        }) => ({
          Name: member.first_name,
          Gender: member.gender,
          "Phone Number": member.phone.MainPhone,
          Email: member.email,
          DOB: member.dateOfBirth,
          _id: member.id,
        })
      ),
    [members]
  );

  const navigate = useNavigate();

  const viewMoreButtonRenderer = useCallback(
    (params: { data: { _id: any } }) => (
      <button
        onClick={() =>
          navigate(
            `/admin/directory/member/personal-information?id=${params.data._id}`
          )
        }>
        View More
      </button>
    ),
    [navigate]
  );

  const gridRef = useRef<AgGridReact>(null);

  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, []);

  const columnDefs = useMemo(
    () => [
      { field: "Name", filter: true },
      { field: "Gender" },
      { field: "Phone Number" },
      { field: "Email" },
      { field: "DOB" },
      { field: "", cellRenderer: viewMoreButtonRenderer, flex: 1 },
    ],
    [viewMoreButtonRenderer]
  );

  return (
    <div className="ag-theme-quartz" style={{ height: "400px" }}>
      <button onClick={onBtnExport}>Download CSV export file</button>
      <AgGridReact
        ref={gridRef}
        suppressExcelExport={true}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10} // Adjust pageSize as needed
      />
    </div>
  );
};

export default Members;
