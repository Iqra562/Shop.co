import React, { useEffect, useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Select, Space } from "antd";
import "./index.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryServices } from "../../../../../services/category.service";
import { PublicRoutes } from "../../../../../utils/util.constant";
import { useNavigate, useLocation } from "react-router-dom";

function Filter({ category, setCategory, categoryId }) {
  const [value, setValue] = useState(category);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isOnSale = searchParams.get("onSale")  === "true";
  const { data: subCategories, isLoading: subCategoriesLoading } = useQuery({
    queryKey: ["subCategories", category],
    queryFn: () => categoryServices.getSubCategories(category),
    enabled: !!category,
  });
  // console.log(subCategories, "sub");
  // console.log(category, "cat id");
  useEffect(() => {
    setValue(category);
  }, [category]);

  const options = [
    { value: category, label: "All" },

    ...(subCategories?.data?.data?.map((subCategory) => ({
      value: subCategory._id,
      label: `${subCategory.name}`,
      displayLabel: `${subCategory.name}`,
    })) || []),
  ];

  const priceOptions = [
    { value: "price_low_high", label: "Price Low to High" },
    { value: "price_high_low", label: "Price High to Low" },
    { value: "latest", label: "Latest" },
    { value: "default", label: "Default" },
  ];
  const handleChange = (value) => {
 
 
  if (isOnSale) {
  searchParams.set("onSale", "true");
} else {
  searchParams.delete("onSale");
}
    setValue(value);
    setCategory(value);
    const segments = location.pathname.split("/").filter(Boolean);
    //  console.log(segments)
    //  segments[segments.length - 1] = value;
    const subcategory =
      options.find((option) => option.value === value)?.label || "";
    const formattedSubcategory = subcategory.replace(/\s+/g, "").toLowerCase();
    navigate(
      {
        pathname: `${PublicRoutes.GETPRODUCTBYCATEGORY}/${segments[1]}/${segments[2]}/${formattedSubcategory}`,

        search: searchParams.toString() ? `?${searchParams.toString()}` : "",
      },
      { state: { categoryId: categoryId } },
    );
  };
const handleOnSaleParam = () => {
  // const searchParams = new URLSearchParams(location.search);
  // const isOnSale = searchParams.get("onSale") === "true";

  if (!isOnSale) {
    searchParams.set("onSale", "true");
  } else {
    searchParams.delete("onSale");
  }

  navigate(
    {
      pathname: location.pathname, 
      search: searchParams.toString()
        ? `?${searchParams.toString()}`
        : "",
    },
    {
      state: { categoryId },
    }
  );
};

const handleChangeSorting = (value) => {
  const searchParams = new URLSearchParams(location.search);      
  searchParams.set("sortBy", value);  
   if (value === "default") {
      searchParams.delete("sortBy");  
   }

    navigate(
    {
      pathname: location.pathname, 
      search: searchParams.toString()
        ? `?${searchParams.toString()}`
        : "",
    },
    {
      state: { categoryId },
    }
  );
}

  return (
    <div className="border rounded-xl  md:rounded-full px-5 py-4 flex flex-col md:flex-row space-y-2  md:items-center justify-between">
      <div className="flex space-x-4 ">

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
        {/* <Select
        defaultValue='default'
        onChange={handleChangeSorting}
        // value={value}
        options={priceOptions}
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
        prefix="Sort by:"
        // value={{ value, label: `collection: ${value}` }}
        popupClassName="custom-dropdown"
      /> */}
      </div>

 

      <div className="flex space-x-2 md:justify-center  md:items-center">
        <input
          type="checkbox"
          checked={isOnSale}
          className="border border-gray-900 accent-[#55795f79]"
          onChange={handleOnSaleParam}
        />
        <span className="uppercase text-sm font-bold">On Sale</span>
      </div>
      
       </div>
  );
}
export { Filter };
