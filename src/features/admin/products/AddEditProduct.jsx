import { AdminRoutes } from "../../../utils/util.constant.js";
import { Link, useParams } from "react-router-dom";
import Collapsible from "../../../components/common/Collapsible/index.jsx";
import FileUpload from "../../../components/common/FileUpload/index.jsx";
import CategorySelector from "../../../components/common/CategorySelector/index.jsx";
import { useForm, Controller } from "react-hook-form";
import { productServices } from "../../../services/product.service.js";
import { useMutation } from "@tanstack/react-query";
import { use, useEffect, useMemo, useState } from "react";
import { useGetProductById } from "../../../hooks/useProducts.js";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function AddEditProduct() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: getProductDataById } = useGetProductById(id);
  const productDetails = useMemo(
    () => getProductDataById?.data?.data ?? null,
    [getProductDataById],
  );
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
  // console.log("add edit product page ", productDetails);

  const [editMode, setEditMode] = useState(false);
  // console.log(productDetails?.category?._id)
  // console.log(editMode)
  useEffect(() => {
    if (id) {
      setEditMode(true);
    }
  }, [id]);
  useEffect(() => {
    if (editMode && productDetails) {
      reset({
        productName: productDetails?.name,
        productDescription: productDetails?.description,
        productPrice: productDetails?.price,
        productStock: productDetails?.stock,
        productDiscount: productDetails?.discountPrice,
        categoryId: productDetails?.category?._id,
      });
    }
  }, [productDetails, reset, editMode]);
  // add product request
  const { mutate: createProduct, isPending: createProductLoading } =
    useMutation({ mutationFn: productServices.addProduct });
  const { mutate: updateProduct, isPending: updateProductLoading } =
    useMutation({
      mutationFn: ({ productId, payload }) =>
        productServices.updateProduct(productId, payload),
    });
  const { mutate: removeGalleryImage, isPending: isRemovingGalleryImage } =
    useMutation({
      mutationFn: ({ productId, imageId }) =>
        productServices.removeGalleryImage(productId, imageId),
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["products"] });
        console.error("image removed:");
      },
      onError: (error) => {
        console.error("Failed to remove image:", error);
      },
    });

  const onSubmit = (data) => {
    // console.log("Form data:", data);
    const formData = new FormData();
    if (!editMode || data.productName !== productDetails?.name) {
      formData.append("name", data.productName);
    }

    if (!editMode || data.productDescription !== productDetails?.description) {
      formData.append("description", data.productDescription);
    }

    if (
      !editMode ||
      Number(data.productPrice) !== Number(productDetails?.price)
    ) {
      formData.append("price", data.productPrice);
    }

    if (
      !editMode ||
      Number(data.productStock) !== Number(productDetails?.stock)
    ) {
      formData.append("stock", data.productStock);
    }

    if (
      !editMode ||
      Number(data.productDiscount) !== Number(productDetails?.discountPrice)
    ) {
      formData.append("discountPrice", data.productDiscount);
    }

    if (!editMode || data.categoryId !== productDetails?.category?._id) {
      // console.log(data.categoryId, productDetails?.category?._id);
      formData.append("category", data.categoryId);
    }

    if (data.thumbnailFile?.[0]) {
      formData.append("thumbnail", data.thumbnailFile[0]);
    }

    if (data.galleryFiles?.length > 0) {
      Array.from(data.galleryFiles).forEach((file) => {
        formData.append("galleryImages", file);
      });
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    if (editMode) {
      updateProduct(
        { productId: productDetails?._id, payload: formData },
        {
          onSuccess: () => {
            openNotificationWithIcon(
              "success",
              "Product updated successfully!",
            );
             setTimeout(() => {
              navigate(`${AdminRoutes.FETCHPRODUCTS}`);
            }, 1000);

          },
          onError: (err) => {
            openNotificationWithIcon(
              "error",
              "Failed to update product. Please try again.",
            );
            reset();
          },
        },
      );
    } else {
      createProduct(formData, {
        onSuccess: () => {
          openNotificationWithIcon("success", "Product created successfully!");
          reset();
          setTimeout(() => {
            navigate(`${AdminRoutes.FETCHPRODUCTS}`);
          }, 1000);
        },
        onError: (err) => {
          openNotificationWithIcon(
            "error",
            "Failed to create product. Please try again.",
          );
          reset();
        },
      });
    }
  };

  return (
    <div className="container">
      {contextHolder}
      <div className="mb-10 flex items-center ">
        <div className="space-y-5 ">
          <h1 className="text-2xl font-bold mt-5">List</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm ">
              <Link to={AdminRoutes.DASHBOARD}>Dashboard</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm ">
              <Link to={AdminRoutes.FETCHPRODUCTS}>Product</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm text-gray-400  ">
              {" "}
              {editMode ? "Upadate" : "Create"}
            </span>{" "}
          </div>
        </div>

        <div></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5 mb-20">
          <Collapsible
            title="Details"
            description="Title, short description, image..."
          >
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Product Name"
                  {...register("productName", {
                    required: "Product Name is required",
                  })}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Product Description
                </label>
                <input
                  type="text"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Product Description"
                  {...register("productDescription", {
                    required: "Product description is required",
                  })}
                />

                {errors.productDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productDescription.message}
                  </p>
                )}
              </div>
              <Controller
                name="thumbnailFile"
                control={control}
                // defaultValue={[]}
                rules={{
                  required: !editMode ? "Thumbnail is required" : false,
                }}
                render={({ field }) => (
                  <>
                    <FileUpload
                      {...field}
                      title="Images"
                      max_image={1}
                      thumbnailMode={true}
                      productImages={productDetails?.thumbnail}
                    />
                    {errors.thumbnailFile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.thumbnailFile.message}
                      </p>
                    )}
                  </>
                )}
              />
              <Controller
                name="galleryFiles"
                control={control}
                // defaultValue={[]}
                render={({ field }) => (
                  <>
                    <FileUpload
                      {...field}
                      title="Gallery images"
                      max_image={10}
                      removeGalleryImage={removeGalleryImage}
                      productImages={productDetails?.galleryImages}
                      productId={productDetails?._id}
                    />
                  </>
                )}
              />

              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Product Category
                </label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <>
                      <CategorySelector
                        value={field.value}
                        onChange={field.onChange}
                        ancestorCategory={productDetails?.category?.ancestors}
                        categoryName={productDetails?.category?.name}
                      />
                      {errors.categoryId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </>
                  )}
                />{" "}
              </div>
            </div>
          </Collapsible>
          <Collapsible
            title="Properties"
            description="Additional functions and attributes..."
          >
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Price
                </label>
                <input
                  type="number"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Product price"
                  {...register("productPrice", {
                    required: "Product price is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                    max: {
                      value: 1000000,
                      message: "Price is too high",
                    },
                  })}
                />
                {errors.productPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productPrice.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Discount %{" "}
                </label>
                <input
                  type="number"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Discount price"
                  {...register("productDiscount", {
                    min: {
                      value: 0,
                      message: "Discount cannot be negative",
                    },
                    max: {
                      value: 100,
                      message: "Discount cannot exceed 100%",
                    },
                  })}
                />
                {errors.productDiscount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productDiscount.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Stock{" "}
                </label>
                <input
                  type="number"
                  className="border border-gray-200 rounded-lg py-3 placeholder:text-sm outline-none px-3"
                  placeholder="Stock "
                  {...register("productStock", {
                    required: "Product stock is required",
                  })}
                />
                {errors.productStock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.productStock.message}
                  </p>
                )}
              </div>
            </div>
          </Collapsible>

          <div>
            <button
              type="submit"
              className={`bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-base font-bold text-white  rounded-md  ${!isDirty && " disabled:cursor-not-allowed"}`}
              disabled={
                (editMode ? !isDirty : false) ||
                createProductLoading ||
                updateProductLoading
              }
            >
              {(createProductLoading ||
                updateProductLoading ||
                isRemovingGalleryImage) && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 15,
                        color: "white",
                        marginRight: "10px",
                      }}
                      spin
                    />
                  }
                  // size="small  "
                  dotsizesm={50}
                  spinning={
                    createProductLoading ||
                    updateProductLoading ||
                    isRemovingGalleryImage
                  }
                />
              )}
              {editMode ? "Update product" : "Create product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditProduct;
