'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Header from '$/components/Header';
import * as Yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik';
import API from '$/utils/fetch';
import { ModelVO, ProductDto } from '@org/types';
import { useRouter } from 'next/navigation';
import { usePopup } from '$/hooks/PopupProvider';
import { DEFAULT_ERROR_MSG } from '@org/common';
import DropdownField from '$/components/Dropdown';
import { DayPicker } from 'react-day-picker';
const CreateSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  model: Yup.string().required('Required'),
  year: Yup.number().required('Required').typeError("Required"),
  vin: Yup.string().required('Required'),
  dealerName: Yup.string().required('Required'),
  engineNumber: Yup.string().required('Required'),
  purchaseDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .required('YYYY-MM-DD'),
  registrationDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .required('YYYY-MM-DD'),
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
    type: 'select',
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
    type: 'date'
  },
  registrationDate: {
    title: 'Registration Date',
    type: 'date'
  },
  dealerName: {
    title: 'Dealer Name',
  },
};
export default function GarageAdd() {
  const DEFAULT_ERROR_MSG_CLASS = 'text-red-500 absolute top-0 right-0 text-xs text-right';
  const [models, setModels] = useState<ModelVO[]>([]);
  const initValue: FormData = defaultValue;
  const router = useRouter();
  const { showPopup } = usePopup();
  useEffect(() => {
    //TODO: fetch model list
    setModels([
      { id: 1, title: 'Ninja 400' },
      { id: 2, title: 'Duke 250' },
      { id: 3, title: 'Duke 390' },
    ]);
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
        {({ values, isSubmitting, setFieldValue, handleSubmit, errors }) => (
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
                      <div className="flex flex-col w-full text-gray-400 relative ">
                        <span className="text-xs mb-1">{data.title}</span>
                        {data.type == 'select' ? (
                          <DropdownField
                            id={key}
                            name={key}
                            placeholder=" "
                            options={models.map((vo) => ({
                              value: vo.id,
                              label: vo.title,
                            }))}
                            label={data.title}
                          />
                        ) : 
                          <Field
                            id={key}
                            name={key}
                            type={data.type || 'text'}
                            placeholder=""
                          />
                        }
                        <ErrorMessage
                          name={key}
                          className={DEFAULT_ERROR_MSG_CLASS}
                          component="span"
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