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
 
const UserListTable = ({
  data,
  loading, 
  showViewServiceUserModal,
  pageSize,
  setPaginationData,
  meta,
  setFilter,
}) => {
  // Filter data based on the selected company (this will apply to the table)

  const columns = [
    {
      title: "#UID",
      dataIndex: "UID",
      key: "UID",
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "profile",
      key: "profile",
      render: (text) => text?.name,
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
      title: "Queries",
      dataIndex: "profile",
      key: "profile",
      render: (text) => text?.totalQuery,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    // {
    //   title: "Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    // },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "profile",
      key: "profile",
      render: (text) => text?.contactNo,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Inactive",
          value: "inactivated",
        },
      ],
      filterMultiple: false, // Radio buttons
      onFilter: (value, record) => record.status ,
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

  
    const handleTableChange = (pagination, filters, sorter) => {
      setPaginationData({
        page: pagination.current,
        limit: pagination.pageSize,
      });

      const statusFilter = filters?.status[0];
      setFilter(statusFilter);

      // console.log("filter", pagination, filters, sorter);
    };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data} // Use the filtered data here based on selected company
        loading={loading}
        pagination={{
          total: meta?.total || 0,
          pageSize: meta?.limit || pageSize,
          current: meta?.page || 1,
          showTotal: (total, range) =>
            `SHOWING ${range[0]}-${range[1]} OF ${total}`,
          showSizeChanger: true,
          pageSizeOptions: ["12", "24", "50", "100"],
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
        onChange={handleTableChange}
        rowKey="id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default UserListTable;
