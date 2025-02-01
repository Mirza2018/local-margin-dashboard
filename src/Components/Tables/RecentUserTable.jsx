/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";

const columns = [
  {
    title: "#SI",
    dataIndex: "id",
    key: "id",
    render: (text) => `#${text}`,
    responsive: ["md"],
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
    key: "joiningDate",
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
    filters: [
      {
        text: "Service Users",
        value: "Service Users",
      },
      {
        text: "Carer",
        value: "Carer",
      },
    ],
    onFilter: (value, record) => record.userType.indexOf(value) === 0,
  },
];

const RecentUserTable = ({ data, loading }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#19363D",
            colorBgContainer: "#FDFDFD",
            colorText: "#0C0C0C",
            borderColor: "#DFE1E3",
            headerColor: "#FDFDFD",
            fontSize: 18,
            footerColor: "#FDFDFD",
            colorIcon: "#FDFDFD",
            colorIconHover: "#FDFDFD",
            colorLinkActive: "#FDFDFD",
            headerSplitColor: "#0C0C0C",
          },
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ x: true }}
        style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
      />
    </ConfigProvider>
  );
};

export default RecentUserTable;
