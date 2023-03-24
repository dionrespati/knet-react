<<<<<<< HEAD
import React, {useState, useEffect} from 'react'
import {currencyFormat} from '../custom/contoh';
import useCookies from '../custom/useCookies';


const arrData = [
  {
    id: 1,
    name: "Dion Respati",
    age: 39,
    salary: 4000000,
    job_title: "Staff"
  },
  {
    id: 2,
    name: "Toto Widianto Adi",
    age: 54,
    salary: 10000000,
    job_title: "Supervisor"
  },
  {
    id: 3,
    name: "Vera Yunita",
    age: 30,
    salary: 4000000,
    job_title: "Staff"
  },
  {
    id: 4,
    name: "Fifin Amelia",
    age: 35,
    salary: 4000000,
    job_title: "Staff"
  },
  {
    id: 5,
    name: "Roby Romadhany",
    age: 35,
    salary: 14000000,
    job_title: "Manager"
  }
]


const dion = () => {
  //const [data, setData] = useState([]);
   const [data, setData] = useCookies([]);

  useEffect(() => {
    const panggil = () => {
      console.log("Panggil disini...");
    }

    setData(arrData);
    panggil();
  });
  
  console.log("awal...");
  const nilai = currencyFormat(5200000);

  const hasilx = arrData.filter((dta) => dta.age < 40);
  return (
    <>
      <div>List Pegawai</div>
      <div>Total : {arrData.length}</div>
      {hasilx.map(dtax => {
       const {id, name, job_title, age} = dtax;
       return(
         <div key={id}>
            <p>ID : {id}</p>
            <p>Nama : {name}</p>
            <p>Jabatan : {job_title}</p>
            <p>Umur : {age}</p>
         </div>
       ); 
      })}
      
    </>
  );
}

export default dion
=======
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Dion() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}

export default Dion;
>>>>>>> d397829 (Dev new context (#1))
