import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Collapsible = ({ title,description, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow shadow-gray-200 rounded-xl bg-white ">
      
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between  cursor-pointer  px-6 py-4 border-b"
      >
        <div className="space-y-2 w-full">
          <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
         {description && <p className="text-sm  text-gray-500">
{description}          </p>}
        </div>

        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
        >
<IoIosArrowForward  className="text-gray-600"/>

        </span>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "min-h-full p-4" : "max-h-0 px-4"
        }`}
      >
        {children}
        
      </div>
    </div>
  );
};

export default Collapsible;