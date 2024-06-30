import React, { ReactEventHandler, useCallback, useRef, useState } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Title from '../../components/Title';

const Success = () => {
  const handleSubmit = () => {};

  return (
    <div className="w-full flex flex-col h-full flex-1">
      <Title className="mb-12">Welcome to QRide!</Title>
      <div className='flex justify-center flex-col items-center'>
        <div className="w-10/12 h-60 bg-gray-600"></div>
        <h4 className=' mt-20'>Your account has been activated!</h4>
      </div>
      <div className="mt-auto">
        <Button>Maintain My Product Now</Button>
        <Button theme="transparent">Skip</Button>
      </div>
    </div>
  );
};

export default Success;
