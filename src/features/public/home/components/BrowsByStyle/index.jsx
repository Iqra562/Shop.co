import img1 from "@assets/images/img-1.png";
import img2 from "@assets/images/img-2.png";
import img3 from "@assets/images/img-3.png";
import img4 from "@assets/images/img-4.png";

function BrowsByStyle() {
  return (
    <div className=" container  mt-10">
             
      <div className="bg-[#F0F0F0] sm:px-4 md:px-10 py-10  rounded-3xl ">
        <p className="text-3xl md:text-5xl font-extrabold text-center pb-8">
          BROWSE BY DRESS STYLE
        </p>
        <div className="flex flex-col md:flex-row mb-4 px-4 md:px-0">
          <div className="relative w-auto md:w-2/3 h-60 md:mr-4">
            <img
              src={img1}
              className="rounded-3xl h-full w-full object-cover transform scale-x-[-1]"
              alt="Style Image"
            />
            <p className="absolute left-2 top-2 font-bold text-2xl text-black">
              Casual
            </p>
          </div>
          <div className="relative w-auto mt-4 md:mt-1 md:w-2/5 h-60 md:mr-4">
            <img
              src={img2}
              className="rounded-3xl h-full w-full object-cover transform scale-x-[-1]"
              alt="Style Image"
            />
            <p className="absolute left-2 top-2 font-bold text-2xl text-black">
              Formal
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row px-4 md:px-0">
          <div className="relative w-auto md:w-2/5 h-60 md:mr-4">
            <img
              src={img3}
              className="rounded-3xl h-full w-full object-cover"
              alt="Style Image"
            />
            <p className="absolute left-2 top-2 font-bold text-2xl text-black">
              Party
            </p>
          </div>
          <div className="relative w-auto mt-4 md:mt-1 md:w-2/3 h-60 md:mr-4">
            <img
              src={img4}
              className="rounded-3xl h-full w-full object-cover"
              alt="Style Image"
            />
            <p className="absolute left-2 top-2 font-bold text-2xl text-black">
              Gym
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BrowsByStyle;
