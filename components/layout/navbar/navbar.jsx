import React, {useState, useEffect} from 'react';
import NavbarList from './navbarList';
import { useAppContext } from "../../../context/app";


const Navbar = () => {

  const {menu} = useAppContext();

  return (
    <>
    {/* for main container */}
      <nav className='shadow-sm w-full z-10'>
        <div className='w-full'>
          <div className='flex items-center h-14 w-full mb-3'>
            {/* first block section */}
            <div className='flex items-center mx-5 justify-between w-full'>
              <div className='flex justify-center items-center flex-shrink-0'>
                <h1 className='font-bold text-xl cursor-pointer'>
                  Paling<span className='text-blue-500'>OK</span>
                </h1>
              </div>
              {/* for small screen */}
              <div className='flex items-end'>
                {menu && menu.map((el) => {
                  const {id, name, path} = el;
                    return (
                      <NavbarList
                        key={id}
                        name={name}
                        path={path}
                      />
                    );
                  }) 
                }
                 
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
