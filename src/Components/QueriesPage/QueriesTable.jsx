/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";

import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import { IoMdDownload } from "react-icons/io";

// Function to get unique company names
const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};

const QueriesTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize = 0,
}) => {
  // Filter data based on the selected company (this will apply to the table)

  const columns = [
    {
      title: "#UID",
      dataIndex: "uid",
      key: "uid",
      responsive: ["md"],
    },
    {
      title: "Query",
      dataIndex: "query",
      key: "query",
      // render: (text) => (
      //   <div className="flex items-center gap-2">
      //     <img
      //       src={AllImages.userImage}
      //       alt={text}
      //       className="w-8 h-8 rounded-full"
      //     />
      //     <p>{text}</p>
      //   </div>
      // ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Submitted On",
      dataIndex: "submittedOn",
      key: "submittedOn",
    },
    // {
    //   title: "Company Name",
    //   dataIndex: "companyName",
    //   key: "companyName",
    //   filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
    //     <div style={{ padding: 8 }}>
    //       {/* Search input for filtering the dropdown */}
    //       <Input
    //         placeholder="Search Company"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
    //         style={{ width: 188, marginBottom: 8 }}
    //       />
    //       <div className="flex flex-col items-start">
    //         {/* Display filtered company names as buttons */}
    //         {filteredCompanyNames.map((companyName) => (
    //           <Button
    //             className="!text-[#19363D]"
    //             key={companyName}
    //             type="link"
    //             onClick={() => {
    //               setSelectedKeys([companyName]); // Set selected filter value
    //               setSearchTerm(companyName); // Update the selected company filter
    //               setSelectedCompany(companyName); // Update the selected company filter
    //               confirm(); // Apply the filter
    //             }}
    //           >
    //             {companyName}
    //           </Button>
    //         ))}
    //       </div>
    //       <Space style={{ marginTop: 8 }}>
    //         <Button
    //           type="link"
    //           onClick={() => {
    //             clearFilters && clearFilters(); // Clear the filter
    //             setSelectedKeys([]);
    //             setSearchTerm(""); // Clear the search input field
    //             setSelectedCompany(""); // Clear the selected company filter
    //             confirm();
    //           }}
    //         >
    //           Reset
    //         </Button>
    //         <Button type="link" onClick={() => confirm && confirm()}>
    //           OK
    //         </Button>
    //       </Space>
    //     </div>
    //   ),
    //   filters: filteredCompanyNames.map((companyName) => ({
    //     text: companyName,
    //     value: companyName,
    //   })),
    //   onFilter: (value, record) => record.companyName === value, // Filter by exact company name match
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => showViewServiceUserModal(record)}
            >
              <IoMdDownload style={{ fontSize: "24px" }} className="text-secondary-color" />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data} // Use the filtered data here based on selected company
        loading={loading}
        pagination={pageSize > 0 ? { pageSize } : false}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default QueriesTable;
