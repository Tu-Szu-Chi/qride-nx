'use client';

import { useCallback, useRef, useState } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import Step1 from './Setp1';
import Step2 from './Step2';
import Step3 from './Step3';
import Success from './Success';

const SignUp = () => {
  const [step, handleChangeStep] = useState(4);
  switch (step) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Success />
  }
};

export default SignUp;
