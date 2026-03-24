import React, { useState } from "react";

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl bg-gray-50">
      
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <div>
          <h3 className="font- text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">
            Title, short description..
          </p>
        </div>

        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
        >
        </span>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 p-4" : "max-h-0 px-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;