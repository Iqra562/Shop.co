import React, { useEffect, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Select, Space } from "antd";
import "./index.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryServices } from "../../../../../services/category.service";
import {  useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../../../utils/util.constant";

function Filter({ category, setCategory ,categoryId}) {
  const [value, setValue] = useState(category);
  const navigate = useNavigate();
  const { data: subCategories, isLoading: subCategoriesLoading } = useQuery({
    queryKey: ["subCategories", category],
    queryFn: () => categoryServices.getSubCategories(category),
    enabled: !!category,
  });
  console.log(subCategories, "sub");
  console.log(category, "cat id");
  useEffect(() => {
    setValue(category);
  }, [category]);

  const options = [
    { value: category, label: "All",

     },

    ...(subCategories?.data?.data?.map((subCategory) => ({
      value: subCategory._id,
      label:`${subCategory.name}`,
      displayLabel: `${subCategory.name}`,
    })) || []),
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setValue(value);
    setCategory(value);
   const segments = location.pathname.split("/").filter(Boolean);
   console.log(segments)
    //  segments[segments.length - 1] = value;
  navigate(`${PublicRoutes.GETPRODUCTBYCATEGORY}/${segments[1]}/${segments[2]}/${value}`,
        { state: { categoryId: categoryId } } 

  );
console.log(segments)
  };
  return (
    <div className="border rounded-full px-5 py-4">
      <Select
        onChange={handleChange}
        value={value}
        options={options}
        style={{ minWidth: 200 }}
        styles={{
          control: {
            border: "none",
            boxShadow: "none",
            padding: "100px 100px",
          },
          activeOutlineColor: "#fff",
          activeBorderColor: "#fff",
          boxShadowSecondary: "0",
          hoverBorderColor: "#fff",
          colorBorder: "#fff",
        }}
        prefix="collection:"
        // value={{ value, label: `collection: ${value}` }}
        popupClassName="custom-dropdown"
      />
    </div>
  );
}
export { Filter };
