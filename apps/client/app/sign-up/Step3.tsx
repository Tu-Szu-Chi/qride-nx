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
  //password
  //rePassword
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

const DEFAULT_INPUT_STYLES =
  'block items-center justify-center rounded-xl py-5 px-6 w-full bg-white border-white border-2 font-bold text-xs';

const Step3 = () => {
  const initValue: FormData = defaultValue;
  const [showPassword, togglePassword] = useState(false)
  const [showRePassword, toggleRePassword] = useState(false)

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
            <form onSubmit={handleSubmit} className="h-full overflow-auto px-8">
              <div className="space-y-4">
                <label>
                  <Field
                    placeholder="Account Number"
                    type="number"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <label htmlFor="password">
                <div className="flex items-center justify-between py-4 px-6 bg-white border-white p-4 rounded-xl border-2 w-full text-xs">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                    <img src="assets/eye.svg" alt="hidden" onClick={() => togglePassword(pre => !pre)} />
                  </div>
                </label>
                <ErrorMessage
                  name="password"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="rePassword">
                <div className="flex items-center justify-between py-4 px-6 bg-white border-white p-4 rounded-xl border-2 w-full text-xs">
                  <Field
                    id="rePassword"
                    name="rePassword"
                    type={showRePassword ? 'text' : 'password'}
                    placeholder="Re-enter Password"
                  />
                    <img src="assets/eye.svg" alt="hidden" onClick={() => toggleRePassword(pre => !pre)} />
                  </div>
                </label>
                <ErrorMessage
                  name="rePassword"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="firstName">
                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="firstName"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="midName">
                  <Field
                    id="midName"
                    name="midName"
                    placeholder="Mid Name"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="midName"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="lastName">
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="lastName"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="addressState">
                  <Field
                    id="addressState"
                    name="addressState"
                    placeholder="State"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="addressState"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="addressCity">
                  <Field
                    id="addressCity"
                    name="addressCity"
                    placeholder="City"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="addressCity"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="birthday">
                  <Field
                    id="birthday"
                    name="birthday"
                    placeholder="Birthday"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="birthday"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="source">
                  <Field
                    id="source"
                    name="source"
                    placeholder="Source"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="source"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="email">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="email"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="whatsapp">
                  <Field
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="Whatsapp ID"
                    className={DEFAULT_INPUT_STYLES}
                  />
                </label>
                <ErrorMessage
                  name="whatsapp"
                  className="text-red-500"
                  component="span"
                />
                <label htmlFor="facebook">
                  <Field
                    id="facebook"
                    name="facebook"
                    placeholder="Facebook ID"
                    className={DEFAULT_INPUT_STYLES}
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
