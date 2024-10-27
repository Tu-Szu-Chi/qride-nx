'use client';

import React from 'react';
import { ProductVO } from '@org/types';
import { css } from '@emotion/css';

const rowCss = css`
&>div:not(:last-child)  {
  border-bottom: 1px solid #D9D9D9;
}
& > div {
  padding-left: 12px;
}
`

const ProductCard = ({ data, handleEdit }: { data: ProductVO, handleEdit: (data: ProductVO) => void }) => {
  const {
    model,
    registrationDate,
    id,
    vin,
    engineNumber,
    purchaseDate,
    dealerName,
  } = data;

  return (
    <div>
      <div className="flex items-end relative bg-gray-200 h-40">
        <div className="ml-9">
          <p className="text-xl font-light text-white">{data.year}</p>
          <h2 className="text-3xl font-black text-primary-500">{model}</h2>
        </div>
        <img
          className="absolute"
          src="/assets/edit.png"
          alt="edit"
          onClick={() => {
            handleEdit(data)
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
          <p className="font-semibold">{engineNumber}</p>
        </div>
        <div>
          <p >Purchase Date</p>
          <p className="font-semibold">{purchaseDate}</p>
        </div>
        <div>
          <p >Registration Date</p>
          <p className="font-semibold">{registrationDate}</p>
        </div>
        <div>
          <p >Dealer Name</p>
          <p className="font-semibold">{dealerName}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
