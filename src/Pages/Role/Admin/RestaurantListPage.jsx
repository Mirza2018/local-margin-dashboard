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
  Spin,
  Typography,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import RestaurantListTable from "../../../Components/RestaurantListPage/RestaurantListTable";
import ViewRestaurantDetails from "../../../Components/RestaurantListPage/ViewRestaurantDetails";
import {
  useCreateRestaurantMutation,
  useGetAllRestaurantQuery,
} from "../../../redux/api/restaurantApi";
import { toast } from "sonner";

//* Modal Table

// import AllServiceUserTable from "../../Components/Tables/Admin/AllServiceUserTable";
// import ViewAdminServiceUserModal from "../../Components/Modal/Admin/ViewAdminServiceUserModal";

const RestaurantListPage = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 14, // should match your limit
  });

  const { data: restaurentData, isLoading } = useGetAllRestaurantQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });
  const handleTableChange = (paginationConfig) => {
    setPagination({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize || 14,
    });
  };

  const paginationConfig = {
    current: pagination.current, // Current page
    pageSize: pagination.pageSize, // Items per page
    total: restaurentData?.meta?.total || 0, // Total items from API
    showSizeChanger: true, // Show dropdown to change items per page
    pageSizeOptions: ["10", "20", "50"], // Options for items per page (as requested)
    showQuickJumper: true, // Optional: allows jumping to a specific page
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Optional: display range
    onChange: (page, pageSize) => {
      // Update state when page or page size changes
      console.log(`Navigating to page ${page} with ${pageSize} items per page`);
      setPagination({
        current: page,
        pageSize: pageSize,
      });
    },
  };

  // const paginationConfig = {
  //   current: pagination.current, // Current page
  //   pageSize: pagination.pageSize, // Items per page (fixed at 14 for now)
  //   total: restaurentData?.meta?.total || 0, // Total items from API
  //   onChange: (page) => {
  //     // Update the current page when a page number is clicked
  //     console.log(`Navigating to page ${page}`);
  //     setPagination((prev) => ({
  //       ...prev,
  //       current: page,
  //     }));
  //   },
  // };
  const [createData] = useCreateRestaurantMutation();
  // console.log(restaurentData?.data);

  //* Store Search Value
  const [searchText, setSearchText] = useState("");

  const [loadingAddNewResturant, setLoadingAddNewResturant] = useState(false);
  const [openAddNewResturant, setOpenAddNewResturant] = useState(false);
  const [form] = Form.useForm();

  //* It's Use to Show Modal
  const [isServiceUserViewModalVisible, setIsServiceUserViewModalVisible] =
    useState(false);

  //* It's Use to Set Seclected User to Block and view
  const [currentRecord, setCurrentRecord] = useState(null);

  const filteredData = useMemo(() => {
    if (!searchText) return restaurentData?.data;
    return restaurentData?.data.filter((item) =>
      item.restaurantName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [restaurentData, searchText]);

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

  const handleCancelAddNewResturant = () => {
    setOpenAddNewResturant(false);
  };

  const handleNewResturantData = async (values) => {
    const toastId = toast.loading("Restaurent info is adding...");
    setLoadingAddNewResturant(true);
    console.log(values);
    const data = { ...values, password: "hello1234" };

    try {
      const res = await createData(data).unwrap();
      console.log(res);
      toast.success(
        res?.message ||
          res?.data?.message ||
          "Restaurent Info is Sucessfully added",
        {
          id: toastId,
          duration: 2000,
        }
      );
      setLoadingAddNewResturant(true);
      setTimeout(() => {
        form.resetFields();
      }, 1000);

      handleCancelAddNewResturant();
      setLoadingAddNewResturant(false);
    } catch (error) {
      console.error(error);
      handleCancelAddNewResturant();
      setLoadingAddNewResturant(false);
      toast.error(
        error.error ||
          error.data.message ||
          "An error occour during create restaurent",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
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
        {loadingAddNewResturant ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spin size="large" />
          </div>
        ) : (
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
              Assigned Owner
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="name"
              className="text-white"
            >
              <Input
                placeholder="Enter Assigned Owner"
                className="py-2 px-3 text-xl bg-site-color border !border-secondary-color text-base-color"
              />
            </Form.Item>

            <Typography.Title level={4} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="email"
              className="text-white"
            >
              <Input
                placeholder="Enter Email"
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
              Phone No
            </Typography.Title>
            <Form.Item
              rules={[{ required: true }]}
              name="contactNo"
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
        )}
      </Modal>

      {/* Table  */}
      <div className="px-10 pb-10">
        <RestaurantListTable
          data={filteredData}
          pageinationData={restaurentData?.meta}
          loading={isLoading}
          showViewServiceUserModal={showViewServiceUserModal}
          pageSize={12}
          handleTableChange={handleTableChange}
          paginationConfig={paginationConfig}
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
