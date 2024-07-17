import { useCallback, useRef } from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, FormikErrors, Field, ErrorMessage } from 'formik';
import Link from 'next/link';

interface FormData {
    phone: string;
  }
  
const Step1 = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const initValue: FormData = { phone: '' };
  const handleSubmitClick = useCallback(() => {
    btnRef.current?.click();
  }, [btnRef]);
  return (
    <Container
      title="Create an account"
      step={1}
      bottomEle={
        <p className="text-white text-center">Already a member?&nbsp;
          <Link href="/sign-in">
            <span className="">
              Log in
            </span>
          </Link>
          </p>
      }
    >
      <div>
        <h4 className="text-primary text-xl mt-20">
          Mobile Verification
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
              <div className="mt-6">
                <label htmlFor="phone">
                  <div className="flex items-center bg-white border-white p-4 rounded-xl border-2 w-full">
                <img src='assets/phone.svg' alt="phone" />
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
              </div>
              <button ref={btnRef} type="submit" disabled={isSubmitting} hidden>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className="flex justify-between items-center mt-11">
          <span className='text-xl text-white'>Sign Up</span>
          <div onClick={handleSubmitClick} className='rounded-full bg-white p-2'>
            <img src="assets/arrow_right.svg" alt="submit" className='w-8 h-8' />
          </div>
          
        </div>
    </Container>
  );
};

export default Step1;
