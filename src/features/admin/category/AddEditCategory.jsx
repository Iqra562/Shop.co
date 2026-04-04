import { Link } from "react-router-dom";
import { AdminRoutes } from "../../../utils/util.constant";
import { MdOutlineAdd } from "react-icons/md";
import Collapsible from "../../../components/common/Collapsible";
import { useForm, Controller } from "react-hook-form";
import { ConfigProvider, notification, Select } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryServices } from "../../../services/category.service";

function AddEditCategory() {
  const {
    register,
    handleSubmit,
    control,
    watch,
     setValue, 
    formState: { errors },
  } = useForm();
   const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
      style: {
        backgroundColor: "#fff",
      },
    });
  };

  const { mutate: createCategory, isPending: createCategoryLoading } =
    useMutation({mutationFn :categoryServices.addCategories});
  const [selectedLevel1, setSelectedLevel1] = useState("");
 
  const [categoryLevel, setCategoryLevel] = useState(1);

  // Level 1 —  fetch root category
  const { data: level1Data, isLoading: loadingL1 } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getSubCategories(null),
  });
  // Level 2 — fetch when level 1 is selected
  const { data: level2Data, isLoading: loadingL2 } = useQuery({
    queryKey: ["level2categories", selectedLevel1],
    queryFn: () => categoryServices.getSubCategories(selectedLevel1),
    enabled: !!selectedLevel1,
  });

  const handleLevelChange = (value) => {
    setCategoryLevel(Number(value));
    // setSelectedLevel2("");
    console.log(typeof categoryLevel);
  };

  const handleLevelChange1 = (value) => {
    setSelectedLevel1(value);
      setValue("subCategory", undefined);

  };
  const level1Options = (level1Data?.data?.data ?? []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));
  const level2Options = (level2Data?.data?.data ?? []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));
  const levelOptions = [
    { value: "1", label: "level1" },
    { value: "2", label: "level2" },
    { value: "3", label: "level3" },
  ];

  const selectTheme = {
    components: {
      Select: {
        colorBgContainer: "#ffffff",
        colorText: "#000000",
        colorBorder: "#e5e7eb",
        borderRadius: 9,
        activeOutlineColor: "transparent",
        colorBgElevated: "#fff",
        controlHeight: 40,
        hoverBorderColor: "#d9d9d9",
        activeBorderColor: "#d9d9d9",
      },
    },
  };

 const onSubmit = (data) => {
    let parentId;
    let ancestors;
     if(categoryLevel ===1){
     parentId =null
    }else if(categoryLevel === 2){
 parentId =data.mainCategory;
 ancestors=data.mainCategory
    }else if(categoryLevel === 3){
parentId = data.subCategory;
ancestors=[data.mainCategory,data.subCategory]

    }
   const formData = {
    name: data.categoryName,
    level: data.categoryLevel,
    parentId: parentId,
    ancestors:ancestors
  };



  createCategory(formData, {
    onSuccess: () => {
      console.log("created");
    },
  });
 };

  return (
    <>
          {contextHolder}

    <div className="container">
      <div className="mb-10 flex items-center ">
        <div className="space-y-5 ">
          <h1 className="text-2xl font-bold mt-5">List</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm ">
              <Link to={AdminRoutes.DASHBOARD}>Dashboard</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm ">
              <Link to={AdminRoutes.FETCHPRODUCTS}>Category</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm text-gray-400  ">Create</span>{" "}
          </div>
        </div>

        <div></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5 mb-20">
          <Collapsible
            title="Category Details "
            description="Select category level, type..."
          >
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Category Name"
                  {...register("categoryName", {
                    required: "Category Name is required",
                  })}
                />
                {errors.categoryName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Category Level
                </label>
                <ConfigProvider theme={selectTheme}>
                  <Controller
                    name="categoryLevel"
                    control={control}
                    rules={{ required: "Category level is required" }}
                    defaultValue="1"
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        placeholder="Select category"
                        onChange={(value) => {
                          field.onChange(value);
                          handleLevelChange(value);
                        }}
                        options={levelOptions}
                        className="category-select"
                        style={{ minWidth: 200 }}
                        //   disabled={loadingL1}
                        classNames={{
                          popup: {
                            root: "category-custom-dropdown",
                          },
                        }}
                      />
                    )}
                  />
                </ConfigProvider>

                {errors.categoryLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.categoryLevel.message}
                  </p>
                )}
              </div>
              {categoryLevel != 1 && (
                <>
                  <div className="flex flex-col space-y-2">
                    <label className="text-gray-400 text-sm font-medium">
                      Select Main Category
                    </label>
                    <ConfigProvider theme={selectTheme}>
                      <Controller
                        name="mainCategory"
                        control={control}
                        rules={{ required: "Main category is required" }}
                        render={({ field }) => (
                          <Select
                             placeholder="Select category"
                            onChange={(value) => {
                              field.onChange(value);
                              handleLevelChange1(value);
                            }}
                            options={level1Options}
                            className="category-select"
                            value={field.value}
                            style={{ minWidth: 200 }}
                            //   disabled={loadingL1}
                            classNames={{
                              popup: {
                                root: "category-custom-dropdown",
                              },
                            }}
                          />
                        )}
                      />
                    </ConfigProvider>

                    {errors.mainCategory && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mainCategory.message}
                      </p>
                    )}
                  </div>

                  {categoryLevel == 3 && (
                    <div className="flex flex-col space-y-2">
                      <label className="text-gray-400 text-sm font-medium">
                        Select Sub Category
                      </label>
                      <ConfigProvider theme={selectTheme}>
                        <Controller
                          name="subCategory"
                          control={control}
                          rules={{ required: "Sub category is required" }}
                          render={({ field }) => (
                            <Select
                               placeholder="Select category"
                              value={field.value}
                               onChange={(value) => {
                              field.onChange(value);
                             }}
                               options={level2Options}
                              className="category-select"
                              style={{ minWidth: 200 }}
                                disabled={loadingL2}
                              classNames={{
                                popup: {
                                  root: "category-custom-dropdown",
                                },
                              }}
                            />
                          )}
                        />
                      </ConfigProvider>

                      {errors.subCategory && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.subCategory.message}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </Collapsible>
          <div>
            <button
              type="submit"
              className="bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-base font-bold text-white  rounded-md"
            >
              Create category{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
        </>

  );
}

export default AddEditCategory;
