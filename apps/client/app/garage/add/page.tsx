'use client';

import React, { Fragment, useEffect } from 'react';
import Header from '$/components/Header';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import API from '$/utils/fetch';
import { ProductDto } from '@org/types';
import { useRouter } from 'next/navigation';
import { usePopup } from '$/hooks/PopupProvider';
import { DEFAULT_ERROR_MSG } from '@org/common';

const CreateSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  year: Yup.number().required('Required'),
  vin: Yup.string().required('Required'),
  dealerName: Yup.string().required('Required'),
  engineNumber: Yup.string().required('Required'),
  purchaseDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .required('Required'),
  registrationDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .required('Required'),
});
interface FormData {
  id: string;
  model: string;
  year: number;
  vin: string;
  dealerName: string;
  engineNumber: string;
  purchaseDate: string;
  registrationDate: string;
}
type KEY = keyof FormData;
type Columns = {
  [k in KEY]: {
    title: string;
    type?: string;
  };
};
const defaultValue: FormData = {
  id: '',
  model: '',
  year: NaN,
  vin: '',
  dealerName: '',
  engineNumber: '',
  purchaseDate: '',
  registrationDate: '',
};
const ATTRS: Columns = {
  id: {
    title: 'Registration ID',
  },
  model: {
    title: 'Model',
  },
  year: {
    title: 'Year',
    type: 'number',
  },
  vin: {
    title: 'VIN No.',
  },
  engineNumber: {
    title: 'Engine Serial No.',
  },
  purchaseDate: {
    title: 'Purchase Date',
  },
  registrationDate: {
    title: 'Registration Date',
  },
  dealerName: {
    title: 'Dealer Name',
  },
};

export default function GarageAdd() {
  const initValue: FormData = defaultValue;
  const router = useRouter();
  const { showPopup } = usePopup();
  useEffect(() => {
    //TODO: fetch model list
  }, []);
  return (
    <div className="w-full  min-h-full flex-1">
      <Formik
        initialValues={initValue}
        validationSchema={CreateSchema}
        onSubmit={(values, { setSubmitting }) => {
          API.post('/product/save', {
            id: values.id,
            vin: values.vin,
            engine_number: values.engineNumber,
            purchase_date: values.purchaseDate,
            registration_date: values.registrationDate,
            dealer_name: values.dealerName,
            year: values.year,
            model: values.model,
          } as ProductDto)
            .then((res) => {
              router.push('/garage');
            })
            .catch((err) => {
              showPopup({ title: DEFAULT_ERROR_MSG });
              console.error(err);
            });
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <Fragment>
            <Header
              title="Register Product"
              useBackBtn={true}
              customBtn={
                <img
                  src="/assets/file_check.png"
                  onClick={() => handleSubmit()}
                />
              }
            />
            <div>
              {(Object.entries(ATTRS) as [KEY, Columns[KEY]][]).map(
                ([key, data]) => {
                  return (
                    <div
                      className="flex items-center py-3 pr-6 pl-12 border-b-2 border-gray-100"
                      key={key}
                    >
                      <div className="flex flex-col w-full text-gray-400">
                        <span className="text-xs mb-1">{data.title}</span>
                        <Field
                          id={key}
                          name={key}
                          type={data.type || 'text'}
                          placeholder=""
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Fragment>
        )}
      </Formik>
    </div>
  );
}
