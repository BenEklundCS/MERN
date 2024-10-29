// src/pages/HomePage.jsx
import React from 'react';
import { Slider } from '@chakra-ui/react';

const MyPage = () => {
  return (
    <div>
      <Slider defaultValue={[40]} />
    </div>
  );
};

export default MyPage;