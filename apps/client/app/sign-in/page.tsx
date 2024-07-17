'use client';

import Button from '../../components/Button';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import Title from '../../components/Title';

interface FormData {
  phone: string;
  password: string;
}

export default function SignUp() {
  const initValue: FormData = { phone: '', password: '' };

  return (
    <div className="w-full flex flex-col min-h-full flex-1">
      <p className="text-center text-gray-600 mb-6">Welcome back!</p>
      <Title>Sign In</Title>
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
            <div className="space-y-2 p-2">
              <label htmlFor="phone" className="block">
                <span className="font-bold">Phone Number</span>
                <Field
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="on"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="phone"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="password" className="block">
                <span className="font-bold">Password</span>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="password"
                className="text-red-500"
                component="span"
              />
            </div>
            <Button type="submit" className="mt-6">
              Submit
            </Button>
            <div className="text-center w-full mt-4">
              <Link href="/reset-password">
                <span className="text-blue-600 border-b-2 border-blue-100 text-md">
                  Forgot your password?
                </span>
              </Link>
            </div>
          </form>
        )}
      </Formik>
      <div className="text-center mt-auto">
        <p className="text-gray-600 mb-2">Don&apos;t have an account yet?</p>
        <Link href="/sign-up">
          <span className="text-blue-600 border-b-2 border-blue-100">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}
