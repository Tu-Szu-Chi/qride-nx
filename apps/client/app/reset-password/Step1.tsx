'use client';

import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Title from '../../components/Title';
import Container from './Container';
interface FormData {
  phone: string;
}
const Step1 = () => {
  const initValue: FormData = { phone: '' };
  return (
    <Container
      title="Forgot password?"
      bottomEle={
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl text-white">Send</span>
          <div className="rounded-full bg-white p-2">
            <img
              src="assets/arrow_right.svg"
              alt="submit"
              className="w-8 h-8"
            />
          </div>
        </div>
      }
    >
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
          <div className="mt-auto">
            <form onSubmit={handleSubmit}>
              <h4 className="text-primary text-xl mb-6">Mobile Verification</h4>
              <label htmlFor="phone" className="block">
                <div className="flex items-center bg-white border-white p-4 rounded-xl border-2 w-full">
                  <img src="assets/phone.svg" alt="phone" />
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
            </form>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default Step1;
