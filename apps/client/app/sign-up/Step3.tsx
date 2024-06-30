import React, { ReactEventHandler, useCallback, useRef, useState } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().max(50, 'Too Long').required('Required'),
  midName: Yup.string().max(50, 'Too Long').required('Required'),
  lastName: Yup.string().max(50, 'Too Long!').required('Required'),
  addressState: Yup.string().required('Required'),
  addressCity: Yup.string().required('Required'),
  birthday: Yup.date()
    .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
    .nullable(),
  source: Yup.string().nullable(),
  email: Yup.string().email('Invalid email').nullable(),
  whatsapp: Yup.string().nullable(),
  facebook: Yup.string().nullable(),
  addressDetail: Yup.string().nullable(),
});
interface FormData {
  password: string;
  rePassword: string;
  firstName: string;
  midName: string;
  lastName: string;
  addressState: string;
  addressCity: string;
  birthday: string;
  source: string;
  email: string;
  whatsapp: string;
  facebook: string;
  addressDetail: string;
}
const defaultValue: FormData = {
  password: '',
  rePassword: '',
  firstName: '',
  midName: '',
  lastName: '',
  email: '',
  addressState: '',
  addressCity: '',
  addressDetail: '',
  birthday: '',
  source: '',
  whatsapp: '',
  facebook: '',
};

const Step3 = () => {
  const initValue: FormData = defaultValue;

  const handleSubmit = () => {};

  return (
    <Container
      title="Create an Account"
      step={3}
      bottomEle={
        <div className="text-center">
          <Button onClick={handleSubmit} className="mb-8">
            Submit
          </Button>
          <Button onClick={handleSubmit} theme="transparent">
            Cancel
          </Button>
        </div>
      }
    >
      <Formik
        initialValues={initValue}
        validationSchema={SignupSchema}
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
          <div className="flex-1 overflow-auto py-8">
          <form onSubmit={handleSubmit} className='h-full overflow-auto px-8'>
              <div className='space-y-4'>
              <label>
                <span className="font-bold">Account Number</span>
                <Field
                  placeholder="2341234567890"
                  type="number"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <label htmlFor="password">
                <span className="font-bold">Password*</span>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="password"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="rePassword">
                <span className="font-bold">Re-type password*</span>
                <Field
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="rePassword"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="firstName">
                <span className="font-bold">First name</span>
                <Field
                  id="firstName"
                  name="firstName"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="firstName"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="midName">
                <span className="font-bold">Middle Name</span>
                <Field
                  id="midName"
                  name="midName"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="midName"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="lastName">
                <span className="font-bold">Last Name</span>
                <Field
                  id="lastName"
                  name="lastName"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="lastName"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="addressState">
                <span className="font-bold">Address - State</span>
                <Field
                  id="addressState"
                  name="addressState"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="addressState"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="addressCity">
                <span className="font-bold">Address - City</span>
                <Field
                  id="addressCity"
                  name="addressCity"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <label htmlFor="addressDetail">
                <span className="font-bold">Full Address</span>
                <Field
                  id="addressDetail"
                  name="addressDetail"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="addressDetail"
                className="text-red-500"
                component="span"
              />
              <ErrorMessage
                name="addressCity"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="birthday">
                <span className="font-bold">Birthday</span>
                <Field
                  id="birthday"
                  name="birthday"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="birthday"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="source">
                <span className="font-bold">Source</span>
                <Field
                  id="source"
                  name="source"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="source"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="email">
                <span className="font-bold">Email</span>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="email"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="whatsapp">
                <span className="font-bold">Whatsapp ID</span>
                <Field
                  id="whatsapp"
                  name="whatsapp"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="whatsapp"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="facebook">
                <span className="font-bold">Facebook ID</span>
                <Field
                  id="facebook"
                  name="facebook"
                  className="block border-gray-300 p-4 rounded-md border-2 w-full"
                />
              </label>
              <ErrorMessage
                name="facebook"
                className="text-red-500"
                component="span"
              />
              </div>
          </form>
            </div>
        )}
      </Formik>
    </Container>
  );
};

export default Step3;
