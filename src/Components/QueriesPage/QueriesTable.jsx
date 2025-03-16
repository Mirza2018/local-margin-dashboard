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
  pageSize = 0,
}) => {
  // Filter data based on the selected company (this will apply to the table)

  // };

  const downloadExcel = (record, index) => {
       const cleanedText = record?.createdAt?.replace("=", "").split("T")[0];
    const data = [
      {
        ID: `${index + 1}`,
        Query: `${record.query}`,
        Category: `${record.category}`,
        Staff: `${record.staffName}`,
        Submitted_On: `${cleanedText}`,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Query Info");

    // Writing the file
    XLSX.writeFile(workbook, `Query"${record.staffName}"${record._id}.xlsx`);
  };

  const columns = [
    {
      title: "#UID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md"],
      render: (id, _, index) => {
        return <div>{index + 1}</div>;
      },
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
      render: (text) => {
        const cleanedText = text.replace("=", "").split("T")[0];
        console.log(cleanedText);

        return <div>{cleanedText}</div>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record,index) => (
        <Space size="">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="Dowenload Query">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => downloadExcel(record,index)}
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
