import { Link } from "react-router-dom";
import { categoryServices } from "../../../../services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PublicRoutes } from "../../../../utils/util.constant";

const subItems = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/" },
  { label: "Contact Us", link: "/" },
];

function NavItem() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { data: getMainCategories, isPending: categoriesLoading } = useQuery({
    queryKey: ["main-category"],
    queryFn: categoryServices.getMainCategories,
  });
  const { data: getSubCategories, isPending: subCategoriesLoading } = useQuery({
    queryKey: ["sub-category", activeCategory],
    queryFn: () => categoryServices.getSubCategories(activeCategory),
    enabled: !!activeCategory,
    refetchOnWindowFocus: true,
  });
  const maincategories = getMainCategories?.data?.data || [];
  const subcategories = getSubCategories?.data?.data || [];
  // console.log(subcategories)
  return (
    <>
      {/*  Nav Links */}
      <nav className="flex flex-col lg:flex lg:flex-row  text-black relative">
        <ul className="flex flex-col   lg:flex-row space-y-5 lg:space-y-0  lg:space-x-4 xl:space-x-6">
          {maincategories.map((item, index) => (
            <li
              key={index}
              className="relative group cursor-pointer transition text-base font-semibold"
              onMouseEnter={() => setActiveCategory(item._id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                // to={item.link}
                className={`transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]  after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full flex  items-center space-x-2 uppercase `}
              >
                {item.name}
              </Link>
              {activeCategory === item._id && (
                <div className=" lg:absolute md:top-5  left-0 ">
                  <ul className="relative lg:top-4 bg-white w-56 px-3 lg:py-3 rounded-md lg:border lg:shadow-lg capitalize">
                    {subcategories.map((subItem, index) => (
                      <li
                        key={index}
                        className={` ${index === subcategories.length - 1 ? "border-0 pb-0" : "lg:border-b pb-1"} py-1`}
                      >
                        <Link
                          to={`${PublicRoutes.GETPRODUCTBYCATEGORY}/${item.name.toLowerCase()}/${subItem.name.toLowerCase()}/all`}
                          state={{ categoryId: subItem._id }} 
                          className="block"
                        >
 
                          {subItem.name}
                         </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
          <li className="relative group cursor-pointer transition text-base font-semibold uppercase">
            {/* <Link
              // to={item.link}
              className={`transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]  after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full flex  items-center space-x-2 uppercase`}
            > */}
              ON sale{" "}
            {/* </Link> */}
          </li>
          <li className="relative group cursor-pointer transition text-base font-semibold uppercase">
            {/* <Link
              // to={item.link}
              className={`transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]  after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full flex  items-center space-x-2 uppercase`}
            > */}
              New arrivals{" "}
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavItem;
