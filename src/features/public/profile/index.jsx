import { MdEdit } from "react-icons/md";
import ProfileInfo from "./components/profileInfo";
import AddressBook from "./components/addressBook";

function Profile(){
    return(
<div className="w-full px-3 space-y-10">
   <div className="border-b py-4 ">
        <h1 className="text-2xl text-primary font-bold uppercase">My Profile</h1>
              </div>
    <div className=" w-full border rounded-md px-5 md:px-10 py-5 space-y-4 ">

 <ProfileInfo/>
<AddressBook/>
    </div>
</div>
                
    )
}
export default Profile;