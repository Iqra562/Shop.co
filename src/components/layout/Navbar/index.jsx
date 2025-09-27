import admin from '@assets/images/admin.jpg'
import { IoIosNotifications } from "react-icons/io";
import { Avatar, Badge } from 'antd';
import { Button, Divider, Flex, Radio, Space, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
export function Navbar() {
      const [position, setPosition] = useState('end');

    return (
        <div className="w-full py-7 px-10 bg-white/5 flex justify-between items-center  h-20 sticky top-0 ">
            <div className=" ">Team1 </div>
            <div className='flex items-center space-x-4'>
       
          
          <Button icon={<SearchOutlined />} iconPosition={position}   className="!hover:border-black !hover:text-black border-gray-300"
>
            Search
          </Button>
      
               <Badge count={5} size='small'  offset={[-12, 10]}>
      <Avatar 
        size="large" 
        className="bg-transparent flex items-center justify-center text-black"
        icon={<IoIosNotifications className="text23xl" />} 
      />
    </Badge>

    
                
                <div className='relative w-10 h-10 rounded-full p-[2px] 
                bg-[linear-gradient(270deg,#32CD32,#ffffff,#274690)] 
                bg-[length:400%_400%] animate-borderGradient '>
                    <div className='p-1 bg-white rounded-full'>


                <img src={admin} alt="" className='w-full h-full object-cover object-top rounded-full' />
                    </div>
            </div></div>
        </div>
    )
}