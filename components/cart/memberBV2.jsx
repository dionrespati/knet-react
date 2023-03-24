/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
import React, { memo } from 'react';

const MemberBv2 = () => {
  console.log('komponen MemberBV2 rendered..');
  return (
    <>
      <div>MemberBv2</div>
      <input type="text" />
    </>
  );
};

export default memo(MemberBv2);
