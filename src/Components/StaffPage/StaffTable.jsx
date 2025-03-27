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

const StaffTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize,
  meta,
  setPaginationData,
  setFilter,
}) => {
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
      render: (text) => (
        <div className="flex items-center gap-2">
          <p>{text?.name}</p>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="flex items-center gap-2">
          <p>{text?.gender}</p>
        </div>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      dataIndex: "profile",
      key: "profile",
      render: (text) => (
        <div className="flex items-center gap-2">
          <p>{text?.contactNo}</p>
        </div>
      ),
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
      onFilter: (value, record) => (record.status = value),
      // onFilter: (value, record) => record.status.toString() === value,
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
    setPaginationData({ page: pagination.current, limit: pagination.pageSize });

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

export default StaffTable;
