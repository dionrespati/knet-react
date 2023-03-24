import React from 'react';
import Link from 'next/link';

const navbarList = (props) => {
  const {id, path, name} = props;
    return (
      <div id={id} className='ml-5 flex items-baseline space-x-4'>
        <Link href={path}>
          <a className='cursor-pointer text-blue-600 font-semibold px-3 py-2 hover:text-blue-900'>{name}</a>
        </Link>
      </div>
    );
  
}

export default navbarList;