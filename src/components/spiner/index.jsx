import React from 'react';
import { Flex, Spin } from 'antd';
 
const stylesObject = {
  indicator: {
    color: '#00d4ff',
  },
};
const stylesFn = ({ props }) => {
  if (props.size === 'small') {
    return {
      indicator: {
        color: '#722ed1',
      },
    };
  }
  return {};
};
const Spiner = () => {
  const sharedProps = {
    spinning: true,
    percent: 0,
   };
  return (
    <Flex align="center" gap="medium">
      <Spin {...sharedProps} styles={stylesObject} />
      <Spin {...sharedProps} styles={stylesFn} size="small" />
    </Flex>
  );
};
export default Spiner;