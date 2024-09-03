'use client';

import React, { useState } from 'react';
import { ProductVO } from '@org/types/src';
import { fromDateWithSlash } from '@org/common/src';
import { useRouter } from 'next/navigation';
import { css } from '@emotion/css';

const rowCss = css`
&>div:not(:last-child)  {
  border-bottom: 1px solid #D9D9D9;
}
& > div {
  padding-left: 12px;
}
`
console.log(rowCss)

const ProductCard = ({ data }: { data: ProductVO }) => {
  const {
    model,
    registration_date,
    id,
    vin,
    engine_number,
    purchase_date,
    dealer_name,
  } = data;

  const router = useRouter();

  return (
    <div>
      <div className="flex items-end relative bg-gray-200 h-40">
        <div className="ml-9">
          <p className="text-xl font-light text-white">{2022}</p>
          <h2 className="text-3xl font-black text-primary-500">{model}</h2>
        </div>
        <img
          className="absolute"
          src="/assets/edit.png"
          alt="edit"
          onClick={() => {
            router.push(`garage/${id}/edit`);
          }}
          style={{
            right: 24,
            top: 24,
          }}
        />
      </div>
      <div className={`space-y-2 py-4 px-6 bg-gray-700 text-white ${rowCss}`} >
        <div>
          <p >Registration ID</p>
          <p className="font-semibold">{id}</p>
        </div>
        <div>
          <p >VIN Number</p>
          <p className="font-semibold">{vin}</p>
        </div>
        <div>
          <p >Engine Serial Number</p>
          <p className="font-semibold">{engine_number}</p>
        </div>
        <div>
          <p >Purchase Date</p>
          <p className="font-semibold">{fromDateWithSlash(purchase_date)}</p>
        </div>
        <div>
          <p >Registration Date</p>
          <p className="font-semibold">{fromDateWithSlash(registration_date)}</p>
        </div>
        <div>
          <p >Dealer Name</p>
          <p className="font-semibold">{dealer_name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
