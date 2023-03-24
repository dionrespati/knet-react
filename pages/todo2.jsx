import {React, useState} from 'react';
import Button from '../components/form/Button';
import Textfield from '../components/form/Textfield';

const initialData = [];

const todo2 = () => {
  const [listJob, setListJob] = useState(initialData);

  const tambahList = () => {

  };

  const hapusList = () => {

  };

  return (
    <>
      <div className='container flex'>
        <div className='w-1/2 h-72 m-auto p-3 bg-gray-100 y'>
          <Textfield 
            label="Deskripsi Pekerjaan"
          />
          <Button 
            text="Tambah 1"
          />
        {/* </div>
        <div className='w-1/2 h-72 m-auto p-3 mt-6 bg-gray-100 y'> */}
          <Textfield 
            label="Deskripsi Pekerjaan"
          />
          <Button 
            text="Tambah 2"
          />
        </div>
        <div className='w-1/2 h-72 m-auto p-3 bg-green-50'>
          <p className='block mb-1 font-semibold'>List Pekerjaan</p>
            {listJob && listJob.map((data) => {
              return (
                <div>
                  <input className='p-1 border border-solid m-1 w-96' type="text" name="job" value={data} />
                  <Button 
                    text="Hapus"
                    color="danger"
                    onClick="hapusList"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  )
}

export default todo2;