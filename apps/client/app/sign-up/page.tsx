'use client';

import { useCallback, useRef } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Link from 'next/link';

interface FormData {
  phone: string;
}

export default function SignUp() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const initValue: FormData = { phone: '' };
  const handleSubmitClick = useCallback(() => {
    btnRef.current?.click();
  }, [btnRef]);
  return (
    <Container
      title="Create an Account"
      step={1}
      bottomEle={
        <div className='text-center'>
          <Button onClick={handleSubmitClick} className='mb-10'>Submit</Button>
          <p className='text-gray-600 mb-4'>Already have an account?</p>
          <Link href="/sign-in">
            <span className='text-blue-600 border-b-2 border-blue-100'>Sign in to your account</span>
          </Link>
        </div>
      }
    >
      <div>
        <h4 className="w-full text-center mt-20">
          Add your phone number. We will send you a verification code so we know
          you&apos;re real.
        </h4>
        <Formik
          initialValues={initValue}
          validate={(values) => {
            const errors: FormikErrors<FormData> = {};
            if (!values.phone) {
              errors.phone = 'Required';
            } else if (!/^[0-9]{12}$/.test(values.phone)) {
              errors.phone = 'Invalid phone number';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
                <div className='p-8'>
              <label htmlFor="phone">
                <span className='font-bold'>Phone Number*</span>
                <Field
                  id="phone"
                  name="phone"
                  placeholder="2341234567890"
                  type="number"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage name='phone' className='text-red-500' component="span" />
              </div>
              <button ref={btnRef} type="submit" disabled={isSubmitting} hidden>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
