import { MdEdit } from "react-icons/md";


function AddressBook(){
    return(
     <>
      <div className="px-3 w-full">

       <div className="border-b pb-4 w-full h-fit">
                <h1 className="text-3xl font-bold">Address Book</h1>
              </div>
         <div className="bg-gray-50 px-10 py-5 mt-2">
           <div className="flex justify-between">
  <div className="w-6/12 space-y-6">
    <div className="w-full px-2 py-2 text-gray-500 text-sm">Full Name</div>
    <div className="px-2 text-sm">Iqra</div>
  </div>
 
  <div className="w-6/12 space-y-6">
    <div className="w-full px-2 py-2 text-gray-500 text-sm">Street</div>
    <div className="px-2 text-sm">Iqra</div>
  </div>
  <div className="w-6/12 space-y-6">
    <div className="w-full px-2 py-2 text-gray-500 text-sm">City</div>
    <div className="px-2 text-sm">Iqra</div>
  </div>
  <div className="w-6/12 space-y-6">
    <div className="w-full px-2 py-2 text-gray-500 text-sm">State</div>
    <div className="px-2 text-sm">Iqra</div>
  </div>
  <div className="w-6/12 space-y-6">
    <div className="w-full px-2 py-2 text-gray-500 text-sm">Postal Code</div>
    <div className="px-2 text-sm">Iqra</div>
  </div>
   <div className="w-6/12 space-y-6">
    <div className="b-full px-2 py-2 text-gray-500 text-sm">Phone</div>
    <div className="px-2" text-sm>Iqra</div>
  </div>
   <div className="text-black font-bold"><MdEdit />
  </div>
           </div>
         </div>
     </div>
                   </>
    )

}
export default AddressBook;