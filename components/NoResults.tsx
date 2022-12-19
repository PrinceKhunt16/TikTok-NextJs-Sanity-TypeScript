import React from 'react';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className='mt-10'>
      <p className='text-gray-500 font-normal'>{text}</p>
    </div>
  );
};

export default NoResults;