/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";

import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

// Function to get unique company names
const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};

const RestaurantListTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize = 0,
  pageinationData,
  handleTableChange,
  paginationConfig,
}) => {
  // Filter data based on the selected company (this will apply to the table)
  console.log(pageinationData);

  const columns = [
    {
      title: "#UID",
      dataIndex: "UID",
      key: "UID",
      responsive: ["md"],
    },
    {
      title: "Restaurant Name",
      dataIndex: "restaurantName",
      key: "restaurantName",
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
      title: "Assigned Owner",
      dataIndex: "profile",
      key: "profile",
      render: (name) => `${name?.name}`,
    },
    {
      title: "Total Queries",
      dataIndex: "profile",
      key: "profile",
      render: (name) => `${name?.totalQuery}`,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Phone No",
      dataIndex: "profile",
      key: "profile",
      render: (name) => `${name?.contactNo}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "ACTIVE",
          value: "ACTIVE",
        },
        {
          text: "INACTIVATED",
          value: "INACTIVATED",
        },
      ],
      render: (text) => (
        <div className="flex items-center gap-2">
          {text == "ACTIVE" ? (
            <p className="text-base font-bold text-[#15D26A]">Active</p>
          ) : (
            <p className="text-base font-bold text-[#FC2E1C]">Inactive</p>
          )}
        </div>
      ),
    },

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
              <GoEye style={{ fontSize: "24px" }} />
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
        pagination={paginationConfig}
        rowKey="id"
        scroll={{ x: true }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default RestaurantListTable;
