/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";

import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

const FeedbackTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize,
  meta,
  setPaginationData,
  setFilter,
}) => {
  // Filter data based on the selected company (this will apply to the table)

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"],
      render: (id, _, index) => <div>{index + 1}</div>,
    },
    {
      title: "Feedback",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Staff",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Status",
      dataIndex: "status", // This tells the table to look for "status" in your data
      key: "status",
      filters: [
        {
          text: "Resolved",
          value: "resolved",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      filterMultiple: false, // Radio buttons
      onFilter: (value, record) => record.status === value,
      render: (text) => (
        <div className="flex items-center gap-2">
          {text === "resolved" ? (
            <p className="text-base font-bold text-[#15D26A]">Resolved</p>
          ) : text === "pending" ? (
            <p className="text-base font-bold text-secondary-color">Pending</p>
          ) : (
            <p className="text-base font-bold text-red-500">Rejected</p>
          )}
        </div>
      ),
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        const cleanedText = text.replace("=", "").split("T")[0];

        return <div>{cleanedText}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <div>
          {text == "resolved" ? (
            <p className=" bg-green-700 text-base font-bold text-white p-[10px] w-fit cursor-pointer">
              {text}
            </p>
          ) : (
            <>
              {text === "pending" ? (
                <p
                  onClick={() => showViewServiceUserModal(record)}
                  className=" bg-secondary-color text-base font-bold text-white p-[10px] w-fit cursor-pointer"
                >
                  {text}
                </p>
              ) : (
                <p className=" bg-red-500 text-base font-bold text-white p-[10px] w-fit cursor-pointer">
                  {text}
                </p>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPaginationData({ page: pagination.current, limit: pagination.pageSize });

    const statusFilter = filters?.status[0];
    setFilter(statusFilter);

    console.log("filter", pagination, filters, sorter);
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

export default FeedbackTable;
