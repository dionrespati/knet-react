import React from 'react';

const Article = (props) => {
  const {title, img,  content} = props;
  return (
    <div className='w-80 bg-gray-100 p-5 m-2 rounded-md'>
      <h1 className='font-bold'>{title}</h1>
      <img src={img} alt="" className='float-left mr-2' />
      <p className='text-justify'>{content}</p>
      <button className='bg-blue-400 hover:bg-blue-900 text-black hover:text-white rounded w-40 h-8 font-sans font-semibold'>Detail</button>
    </div>
  )
}

export default Article;