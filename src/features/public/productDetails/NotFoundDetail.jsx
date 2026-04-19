import { GiNotebook } from "react-icons/gi";

function NotFoundDetail() {
  return (
    <div className="w-full flex flex-col justify-center items-center  h-full ">
     <GiNotebook className="text-9xl text-gray-300" />
   <h2 className="text-gray-300 text-2xl md:text-4xl font-bold  text-center">Product details not found.</h2></div>
  );
}

export default NotFoundDetail;