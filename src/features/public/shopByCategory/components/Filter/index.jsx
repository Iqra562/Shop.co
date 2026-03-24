import React, { useState } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
 import { Select, Space } from 'antd';
 import './index.css'


const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'Running', label: 'Running' },
];


function Filter (){
      const [value, setValue] = useState("lucy"); 
const handleChange = value => {
  console.log(`selected ${value}`);
  setValue(value)
};
    return(
<div className='border rounded-full px-5 py-4'>

    
   
    <Select
      defaultValue="lucy"
      onChange={handleChange}
      options={options}
      style={{ minWidth: 200 }}
 
      // Customize internal styles
      styles={{
        control: {
          border: "none",         
          boxShadow: "none",     
          padding: "100px 100px",     
        },
        activeOutlineColor:'#fff',
        activeBorderColor:'#fff',
        boxShadowSecondary:'0',
        hoverBorderColor:'#fff',
        colorBorder:'#fff',
     
      }}
      
        // optionLabelProp="value"
        value={{ value, label: `collection: ${value}` }}
  popupClassName="custom-dropdown"

    /> 
 
 
</div>
)
}
export  {Filter};