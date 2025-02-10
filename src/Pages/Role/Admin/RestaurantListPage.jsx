import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import RestaurantListTable from "../../../Components/RestaurantListPage/RestaurantListTable";
import ViewRestaurantDetails from "../../../Components/RestaurantListPage/ViewRestaurantDetails";

//* Modal Table

// import AllServiceUserTable from "../../Components/Tables/Admin/AllServiceUserTable";
// import ViewAdminServiceUserModal from "../../Components/Modal/Admin/ViewAdminServiceUserModal";

const RestaurantListPage = () => {
  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  //* Use to set user
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingAddNewResturant, setLoadingAddNewResturant] = useState(false);
  const [openAddNewResturant, setOpenAddNewResturant] = useState(false);
  const [form] = Form.useForm();

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/reaturantsData.json");
        setData(response?.data); // Make sure this is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.restaurantName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewServiceUserModal = (record) => {
    setCurrentRecord(record);
    setIsServiceUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsServiceUserViewModalVisible(false);
  };

  const showModalAddNewResturant = () => {
    setOpenAddNewResturant(true);
  };

  // const handleOkAddNewResturant = () => {
  //   setLoadingAddNewResturant(true);
  //   setTimeout(() => {
  //     setLoadingAddNewResturant(false);
  //     // setOpenAddNewResturant(false);
  //   }, 2000);
  // };

  const handleCancelAddNewResturant = () => {
    setOpenAddNewResturant(false);
  };

  const handleNewResturantData = (values) => {
    console.log(values);
    setLoadingAddNewResturant(true);


    setTimeout(() => {
          form.resetFields();
    }, 1000);
    setTimeout(() => {
      handleCancelAddNewResturant();
      setLoadingAddNewResturant(false);
    }, 2000);
  };

  return (
    <div
      className="bg-highlight-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {/* Header  */}
      <div className="bg-secondary-color w-full p-4   rounded-tl-xl rounded-tr-xl">
        <div className=" w-[95%] mx-auto  flex items-center justify-between">
          <p className="text-3xl text-primary-color font-semibold">
            Restaurant List
          </p>
          <div className="flex gap-4 items-center">
            <ConfigProvider
              theme={{ token: { colorTextPlaceholder: "#f3f3f3" } }}
            >
              <Input
                placeholder="Search Restaurant Name..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-primary-color font-semibold !border-primary-color !bg-transparent py-2 !rounded-full"
                prefix={
                  <SearchOutlined className="text-primary-color font-bold text-lg mr-2" />
                }
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <div
        className="my-4 text-end me-8
      "
      >
        <Button
          onClick={showModalAddNewResturant}
          className="text-xl font-bold bg-secondary-color text-white px-4 py-6 me-2"
        >
          +Add New Restaurant
        </Button>
      </div>

      <Modal
        open={openAddNewResturant}
        title={<p className="text-3xl font-bold">Add New Restaurant</p>}
        onOk={handleCancelAddNewResturant}
        onCancel={handleCancelAddNewResturant}
        footer={[]}
        className="!w-[700px]"
      >
        <Form form={form} onFinish={handleNewResturantData}>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Restaurant Name
          </Typography.Title>
          <Form.Item
            rules={[{ required: true }]}
            name="restaurantName"
            className="text-white"
          >
            <Input
              placeholder="Enter Restaurant Name"
              className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Location
          </Typography.Title>
          <Form.Item
            rules={[{ required: true }]}
            name="location"
            className="text-white"
          >
            <Input
              placeholder="Enter location"
              className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Assigned Owner
          </Typography.Title>
          <Form.Item
            rules={[{ required: true }]}
            name="assignedOwner"
            className="text-white"
          >
            <Input
              placeholder="Enter Assigned Owner"
              className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Phone No
          </Typography.Title>
          <Form.Item
            rules={[{ required: true }]}
            name="phoneNo"
            className="text-white"
          >
            <Input
              placeholder="Enter Phone No"
              type="tel"
              className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
            />
          </Form.Item>
          <Button
            key="submit"
            type="primary"
            className="w-full !py-5"
            loading={loadingAddNewResturant}
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      </Modal>

      {/* Table  */}
      <div className="px-10 pb-10">
        <RestaurantListTable
          data={filteredData}
          loading={loading}
          showViewServiceUserModal={showViewServiceUserModal}
          pageSize={12}
        />
      </div>

      {/* Modals */}

      <ViewRestaurantDetails
        isServiceUserViewModalVisible={isServiceUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default RestaurantListPage;
