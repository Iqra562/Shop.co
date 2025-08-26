import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa'
import logo from "../../../assets/images/logo.png";
import { MdEmail } from 'react-icons/md'

export function Footer (){
    return(
       <div className="flex border-black border-t-[1px] mt-10 bg[#d4d5d9]">
         <footer className=" text-black py-10 px-6 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
            <div>
             <div className='flex items-center space-x-2'><img src={logo} alt="" className='w-20' />
          <h2 className="text-2xl font-bold text-black mb-4">Shop.co</h2>
             </div>
            </div>
          <p className="text-sm">
            Elevate your wardrobe with trendy, affordable, and timeless clothing.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Men</a></li>
            <li><a href="#" className="hover:text-black">Women</a></li>
            <li><a href="#" className="hover:text-black">Kids</a></li>
            <li><a href="#" className="hover:text-black">New Arrivals</a></li>
            <li><a href="#" className="hover:text-black">Sale</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">FAQ</a></li>
            <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-black">Size Guide</a></li>
            <li><a href="#" className="hover:text-black">Order Tracking</a></li>
            <li><a href="#" className="hover:text-black">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Join Our Newsletter</h3>
          <p className="text-sm mb-3">Sign up and get 10% off your first order.</p>
          <form className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <MdEmail className="mx-2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-2 py-2 bg-gray-800 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-gray-900 px-3 py-2 text-sm font-semibold hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} FashioStyle. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-black"><FaFacebookF /></a>
          <a href="#" className="hover:text-black"><FaInstagram /></a>
          <a href="#" className="hover:text-black"><FaTwitter /></a>
          <a href="#" className="hover:text-black"><FaPinterestP /></a>
        </div>
      </div>
    </footer>
       </div>
    )
}
