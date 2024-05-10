import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef, useState } from "react";

import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import useGetAllMembers from "../hooks/Member/useGetAllMembers";
import { useNavigate } from "react-router-dom";
ModuleRegistry.registerModules([ClientSideRowModelModule]);


const Members = () => {
  const { data: members } = useGetAllMembers({page:1, pageSize:100000});

  const [rowData] = useState(
    members &&
      members.map(
        (member: {
          first_name: string;
          phone: { MainPhone: string };
          gender: string;
          email: string;
          dateOfBirth: string;
          id: string;
        }) => ({
          Name: member.first_name,
          Gender: member.gender,
          "Phone Number": member.phone.MainPhone,
          Email: member.email,
          DOB: member.dateOfBirth,
          _id: member.id,
          "": "",
        })
      )
  );

  //   const defaultColDef = {
  //     flex: 1,
  //   };

  const navigate = useNavigate();

  const viewMoreButtonRenderer = (params: { data: { _id: string } }) => (
    <button
      onClick={() =>
        navigate(
          `/admin/directory/member/personal-information?id=${params.data._id}`
        )
      }
    >
      View More
    </button>
  );

  const gridRef = useRef<AgGridReact>(null);

  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.body;
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);


  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 400 }} // the grid will fill the size of the parent container
    >
        <button onClick={onBtnExport}>Download CSV export file</button>
      <AgGridReact
      ref={gridRef}
      suppressExcelExport={true}
                popupParent={popupParent}
        rowData={rowData}
        columnDefs={[
          { field: "Name", filter: true},
          { field: "Gender" },
          { field: "Phone Number" },
          { field: "Email" },
          { field: "DOB" },
          { field: "", cellRenderer: viewMoreButtonRenderer, flex: 1 },
        ]}
        pagination={true}
        paginationPageSize={1}
        paginationPageSizeSelector={[1,2,3]}
        // defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Members;
