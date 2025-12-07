import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa'
import logo from "../../../assets/images/logo.png";
import { MdEmail } from 'react-icons/md' 

export function Footer (){
    return(
<div className="flex bg-[#1f1f1f] mt-10 rounded-tl-xl rounded-tr-xl">
         <footer className=" text-wwhite py-10 px-6 w-full container ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pt-20">

        {/* Brand */}
        <div>
            <div>
             <div className='flex items-center space-x-2'>
              {/* <img src={logo} alt="" className='w-20' /> */}
          <h2 className="text-4xl  text-white mb-4 uppercase font-extrabold">Shop.co</h2>
             </div>
            </div>
          <p className="text-sm text-gray-300">
            Elevate your wardrobe with trendy, affordable, and timeless clothing.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-sm font-bold uppercase text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">Men</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Women</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Kids</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Sale</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-bold uppercase text-white mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Size Guide</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Order Tracking</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h3 className="text-sm font-bold uppercase text-white mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
             <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Term & Conditions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Delivery Details </a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Customer Support</a></li>
          </ul>
        </div>
 
      </div>

      {/* Bottom Section */}
      <div className=" border-t-[1px] text-white border-gray-300 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm pb-10">
        <p>© {new Date().getFullYear()} Shop.CO. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-white hover:text-white"><FaFacebookF className='text-white'/></a>
          <a href="#" className="text-white hover:text-white"><FaInstagram className='text-white'/></a>
          <a href="#" className="text-white hover:text-white"><FaTwitter className='text-white'/></a>
          <a href="#" className="text-white hover:text-white"><FaPinterestP className='text-white'/></a>
        </div>
      </div>
    </footer>
       </div>
    )
}
