/* eslint-disable react/prop-types */
import { Button, Input, Space, Table, Tooltip } from "antd";
import { GoEye } from "react-icons/go";

import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import { IoMdDownload } from "react-icons/io";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { render } from "react-dom"; 

// Function to get unique company names
const getUniqueCompanyNames = (data) => {
  const companyNames = data.map((item) => item.companyName);
  return [...new Set(companyNames)]; // Remove duplicates by converting array to a Set and back to an array
};

const QueriesTable = ({
  data,
  loading,
  showViewServiceUserModal,
  pageSize = 12,
  meta,
  setPaginationData,
}) => {
  // Handle page change
  const handleTableChange = (pagination) => {
    setPaginationData({ page: pagination.current, limit: pagination.pageSize });
  };

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"],
      render: (id, _, index) => <div>{index + 1}</div>,
    },
    {
      title: "Query",
      dataIndex: "query",
      key: "query",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Staff",
      dataIndex: "staffName",
      key: "staffName",
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{text.replace("=", "").split("T")[0]}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="">
          <Tooltip placement="right" title="Download Query">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => downloadExcel(record, index)}
            >
              <IoMdDownload
                style={{ fontSize: "24px" }}
                className="text-secondary-color"
              />
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
        dataSource={data}
        loading={loading}
        pagination={{
          total: meta?.total || 0,
          pageSize: meta?.limit || pageSize,
          current: meta?.page || 1,
          showTotal: (total, range) =>
            `SHOWING ${range[0]}-${range[1]} OF ${total}`,
          showSizeChanger: true,
          pageSizeOptions: ["12", "24", "50","100"],
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
        onChange={handleTableChange}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default QueriesTable;

// pagination={{
//           pageSize: 8,
//           total: 250, // Total number of items
//           showSizeChanger: true,
//           pageSizeOptions: ['8', '60', '120'],
//           defaultCurrent: 1,
//           showTotal: (total, range) => `SHOWING ${range[0]}-${range[1]} OF ${total}`,
//         }}

//  total: meta.total, current: meta.page 
