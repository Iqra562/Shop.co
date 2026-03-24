import React from "react";
import logo from "@assets/images/logo.png";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetProducts } from "@hooks/useProducts";
import { AdminRoutes } from "../../../utils/util.constant.js";
import { Link } from "react-router-dom";
import { TiEye } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";
import { Collapse, Form, Input, Switch } from "antd";
import { RightOutlined } from "@ant-design/icons";


function AddEditProduct() {
   

 const items1 = [
    {
      key: "1",
      label: "Basic Info",
      children: (
        <>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
        </>
      ),
          // style: panelStyle,

    },
  ];

  const items2 = [
    {
      key: "2",
      label: "Pricing",
      children: (
        <>
          <Form.Item name="price" label="Price">
            <Input type="number" />
          </Form.Item>
        </>
      ),

    },
  ];

  const items3 = [
    {
      key: "3",
      label: "Stock",
      children: (
        <>
          <Form.Item name="stock" label="Stock">
            <Input type="number" />
          </Form.Item>
        </>
      ),

    },
  ];
  const onFinish = (values) => {
    console.log(values);
  };
  const panelStyle = {
  // marginBottom: 16,
  borderRadius: 12,
  background: "#f5f5f5",
  // border: "2px solid red",
  overflow: "hidden",
};
  return (
    <div className="container">
 <div className="mb-10 flex items-center ">
        <div className="space-y-5 ">
          <h1 className="text-2xl font-bold mt-5">Create a new product
</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm ">
              <Link to={AdminRoutes.DASHBOARD}>Dashboard</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm ">
              <Link to={AdminRoutes.FETCHPRODUCTS}>Product</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm text-gray-400  ">Create</span>{" "}
          </div>
        </div>
        
       </div>   
          <div>
  <Form layout="vertical" onFinish={(values) => console.log(values)}>
        
       <div className="space-y-4">
        
        <Collapse bordered={false}
  expandIconPosition="end"
   expandIcon={({ isActive }) => (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 
      ${isActive ? "rotate-90" : ""}`}
    >
      <RightOutlined className="text-black text-xs" />
    </div>
  )}
    className="bg-white text-white border-gray-100 shadow-sm rounded-3xl p-0" 

  >
      <Collapse.Panel
        header="Basic Info"
        key="1"
        style={{ border: 'none', borderRadius: 12, marginBottom: 16 }}
         header={
          <div style={{ borderBottom: '2px solid #FF0000', padding: '0px 0px' }}>
            Basic Info
          </div>
        }
      >
        <p>Panel content here</p>
      </Collapse.Panel>
  </Collapse>
        
        <Collapse items={items2} />
        
        <Collapse items={items3} />
        
      </div>

      <Button htmlType="submit" type="primary" className="mt-4">
        Submit
      </Button>

    </Form>    </div>
    </div>
  );
}

export default AddEditProduct;
