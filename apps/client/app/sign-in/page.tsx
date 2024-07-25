'use client';

import Button from '../../components/Button';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import Title from '../../components/Title';
import GradientBackground from '../../../client/components/GradientBackground';

interface FormData {
  phone: string;
  password: string;
}

export default function SignUp() {
  const initValue: FormData = { phone: '', password: '' };

  return (
    <GradientBackground>
      <div className="w-full py-16 pb-10 px-12 flex flex-col h-full flex-1 ">
        <Title className="mb-12 text-left w-10 font-bold text-primary">
          Welcome Back!
        </Title>
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
              <div className="space-y-8 p-2">
                <label htmlFor="phone" className="block">
                  <div className="flex items-center bg-white border-white p-4 rounded-xl border-2 w-full">
                    <img src="assets/user.svg" alt="phone" />
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="Mobile Number"
                      type="number"
                      className="flex-grow ml-2"
                    />
                  </div>
                </label>
                <ErrorMessage
                  name="phone"
                  className="text-red-500"
                  component="span"
                />
                <div>
                  <label htmlFor="password" className="block">
                    <div className="flex items-center bg-white border-white p-4 rounded-xl border-2 w-full">
                      <img src="assets/lock.svg" alt="password" />
                      <Field
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="flex-grow ml-2"
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="password"
                    className="text-red-500"
                    component="span"
                  />
                  <Link href="/reset-password">
                    <h4 className="mt-2 text-gray-500 text-right">
                      Forgot password?
                    </h4>
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl text-white">Sign In</span>
          <div className="rounded-full bg-white p-2">
            <img
              src="assets/arrow_right.svg"
              alt="submit"
              className="w-8 h-8"
            />
          </div>
        </div>
          <Link href="/sign-up" className='text-center mt-8 text-gray-500'>
          <h4>Don&apos;t have account? Sign up</h4>
          </Link>
      </div>
    </GradientBackground>
  );
}
