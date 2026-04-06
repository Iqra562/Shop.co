import { AdminRoutes } from "../../../utils/util.constant.js";
import { Link } from "react-router-dom";
import Collapsible from "../../../components/common/Collapsible/index.jsx";
import FileUpload from "../../../components/common/FileUpload/index.jsx";
import CategorySelector from "../../../components/common/CategorySelector/index.jsx";
import { useForm, Controller } from "react-hook-form";
import { productServices } from "../../../services/product.service.js";
import { useMutation } from "@tanstack/react-query";

function AddEditProduct() {
  const {
    register, 
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

    // add product request 
  const { mutate: createProduct, isPending: createProductLoading } =
    useMutation({mutationFn :productServices.addProduct});
 const onSubmit = (data) => {
  const formData = new FormData();
  
  formData.append("name", data.productName);
  formData.append("description", data.productDescription);
  formData.append("price", data.productPrice);
  formData.append("stock", data.productStock);
  formData.append("thumbnail", data.thumbnailFile[0]);
   Array.from(data.galleryFiles).forEach((file) => {
    formData.append("galleryImages", file);
  });
  formData.append("category", data.categoryId);
  formData.append("discountPrice", data.productDiscount);
  console.log(data)
  createProduct(formData, {
    onSuccess: () => {
      console.log("created");
    },
  });
};

  return (
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
              <Link to={AdminRoutes.FETCHPRODUCTS}>Product</Link>
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
                defaultValue={[]}
                rules={{ required: "Thumbnail is required" }}
                render={({ field }) => (
                  <>
                    <FileUpload {...field} title='Images' />
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
                defaultValue={[]}
                 render={({ field }) => (
                  <>
                    <FileUpload {...field} title='Gallery images'  max_image={10}/>
                   
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
              className="bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-base font-bold text-white  rounded-md"
            >
              Create product{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEditProduct;
