import React, {
  Fragment,
  useState,
} from 'react';
import Button from '../../components/Button';
import Container from './Container';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '$/utils/fetch';
import { RegisterDto, UserSourceType, UserType } from '@org/types/src';
import { usePayload } from './PayloadContext';
import { CODE_SUCCESS, HEADER_PRE_TOKEN } from '@org/common/src';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().max(50, 'Too Long').required('Required'),
  midName: Yup.string().max(50, 'Too Long').required('Required'),
  lastName: Yup.string().max(50, 'Too Long!').required('Required'),
  addressState: Yup.string().required('Required'),
  addressCity: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  rePassword: Yup.string().required('Required'),
  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .nullable(),
  source: Yup.number().nullable(),
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
  source: number;
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
  source: 0,
  whatsapp: '',
  facebook: '',
};

const DEFAULT_INPUT_STYLES =
  'block items-center justify-center rounded-xl py-5 px-6 w-full bg-white border-white border-2 font-bold text-xs';

type Props = {
  onSuccess: () => void;
};

const Step3 = (props: Props) => {
  const initValue: FormData = defaultValue;
  const [showPassword, togglePassword] = useState(false);
  const [showRePassword, toggleRePassword] = useState(false);
  const { phone, token } = usePayload();

  return (
    <Container title="Account detail" step={3}>
      <Formik
        initialValues={initValue}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload: RegisterDto = {
            phone: phone || 'None',
            type: UserType.CLIENT,
            password: values.password,
            re_password: values.rePassword,
            first_name: values.firstName,
            mid_name: values.midName,
            last_name: values.lastName,
            address_state: values.addressState,
            address_city: values.addressCity,
            address_detail: values.addressDetail,
            birthday: values.birthday,
            source: UserSourceType.NONE,
            email: values.email,
            whatsapp: values.whatsapp,
            facebook: values.facebook,
          };
          setSubmitting(true);
          api
            .post('/auth/register', payload, {
              headers: {
                [HEADER_PRE_TOKEN]: token
              }
            })
            .then((res) => {
              if (res.bizCode == CODE_SUCCESS) props.onSuccess();
              else {
                //! alert
              }
            })
            .finally(() => setSubmitting(false));
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
          <Fragment>
            <h4 className="text-primary text-xl mt-20">Enter Account Detail</h4>
            <div className="flex-1 overflow-auto mt-6">
              <form onSubmit={handleSubmit} className="h-full overflow-auto">
                <div className="space-y-4">
                  <div className={DEFAULT_INPUT_STYLES}>
                    <p className='text-gray-300'>{phone}</p>
                  </div>
                  <label htmlFor="password">
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className={`${DEFAULT_INPUT_STYLES} pr-12`}
                      />
                      <img
                        src="assets/eye.svg"
                        alt="hidden"
                        onClick={() => togglePassword((pre) => !pre)}
                        className="absolute"
                        style={{ right: 18, top: 20 }}
                      />
                    </div>
                  </label>
                  <ErrorMessage
                    name="password"
                    className="text-red-500"
                    component="span"
                  />
                  <label htmlFor="rePassword">
                    <div className="relative">
                      <Field
                        id="rePassword"
                        name="rePassword"
                        type={showRePassword ? 'text' : 'password'}
                        placeholder="Re-enter Password"
                        className={`${DEFAULT_INPUT_STYLES} pr-12`}
                      />
                      <img
                        src="assets/eye.svg"
                        alt="hidden"
                        onClick={() => toggleRePassword((pre) => !pre)}
                        className="absolute"
                        style={{ right: 18, top: 20 }}
                      />
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
            <div className="text-center mt-6">
              <Button isLoading={isSubmitting} onClick={() => handleSubmit()}>Submit</Button>
            </div>
          </Fragment>
        )}
      </Formik>
    </Container>
  );
};

export default Step3;
