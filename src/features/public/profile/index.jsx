import { MdEdit } from "react-icons/md";
import ProfileInfo from "./components/profileInfo";
import AddressBook from "./components/addressBook";

function Profile(){
    return(
<div className="w-full px-3 space-y-10">
     <div className="border-b pb-4 w-full h-fit">
                <h1 className="text-3xl font-bold">My Profile</h1>
              
              </div>
    
 <ProfileInfo/>
<AddressBook/>
</div>
                
    )
}
export default Profile;