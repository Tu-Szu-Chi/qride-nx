'use client';

import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Container from './Container';
import Button from '../../components/Button';
import * as Yup from 'yup';
import { useState } from 'react';

const FormSchema = Yup.object().shape({
  //password
  //rePassword
  password: Yup.string().max(50, 'Too Long').required('Required'),
  rePassword: Yup.string().max(50, 'Too Long').required('Required'),
});

interface FormData {
  password: string;
  rePassword: string;
}
const DEFAULT_INPUT_STYLES =
  'flex items-center justify-between bg-white border-white p-4 rounded-xl border-2 w-full';
const Step3 = () => {
  const initValue: FormData = { password: '', rePassword: '' };
  const [showPassword, togglePassword] = useState(false);
  const [showRePassword, toggleRePassword] = useState(false);

  return (
    <Container
      title="Set new password"
      bottomEle={
        <div className="flex justify-end items-center mt-auto">
          <Button theme="dark" style={{ width: '85px' }}>
            Save
          </Button>
        </div>
      }
    >
      <Formik
        initialValues={initValue}
        validationSchema={FormSchema}
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
          <div className="mt-auto">
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">
                <div className={`${DEFAULT_INPUT_STYLES} mb-6`}>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <img
                    src="assets/eye.svg"
                    alt="hidden"
                    onClick={() => togglePassword((pre) => !pre)}
                  />
                </div>
              </label>
              <ErrorMessage
                name="password"
                className="text-red-500"
                component="span"
              />
              <label htmlFor="rePassword">
                <div className={`${DEFAULT_INPUT_STYLES}`}>
                  <Field
                    id="rePassword"
                    name="rePassword"
                    type={showRePassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                  />
                  <img
                    src="assets/eye.svg"
                    alt="hidden"
                    onClick={() => toggleRePassword((pre) => !pre)}
                  />
                </div>
              </label>
              <ErrorMessage
                name="rePassword"
                className="text-red-500"
                component="span"
              />
            </form>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default Step3;
