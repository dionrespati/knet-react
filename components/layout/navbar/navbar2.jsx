import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../../context/app";
/* import {MENU} from 'constants'; */



const navbar2 = () => {

  const {login, setLogin, menu} = useAppContext();
  
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Support</li>
        <li>Platforms</li>
        <li>Pricing</li> 
      </ul>
    </nav>    
  )
}

export default navbar2
