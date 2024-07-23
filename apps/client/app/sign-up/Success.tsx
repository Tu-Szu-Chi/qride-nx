import React, { ReactEventHandler, useCallback, useRef, useState } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Title from '../../components/Title';

const Success = () => {
  const handleSubmit = () => {};

  return (
    <div className="w-full py-16 px-12 flex flex-col h-full flex-1">
      <Title className='mb-40 text-left w-33 pr-28 font-bold text-primary'>Welcome to the Club</Title>
      <h4 className='text-primary text-xl'>Account activated</h4>
      <div className='mt-auto'>
        <Button>Register My Products Now</Button>
        <Button theme='transparent' className='text-white'>Skip</Button>
      </div>
    </div>
  );
};

export default Success;
