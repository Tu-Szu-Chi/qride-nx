'use client';

import React, { useState } from 'react';
import Header from '$/components/Header';
import { ProductVO } from '@org/types';
import { fromDateWithSlash } from '@org/common';
import ProductCard from './card';

const products: ProductVO[] = [
  {
    id: '11',
    user_id: 'user-id-1',
    vin: 'QEASE123',
    engine_number: 'QQQ111',
    purchase_date: new Date('2024-01-01'),
    registration_date: new Date('2024-01-02'),
    dealer_name: 'Quentin',
    model: 'CBR500',
  },
  {
    id: '12',
    user_id: 'user-id-1',
    vin: 'QEASE123',
    engine_number: 'QQQ111',
    purchase_date: new Date('2024-01-01'),
    registration_date: new Date('2024-01-02'),
    dealer_name: 'Quentin',
    model: 'CBR500',
  },
];

export default function Garage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductVO>({
    id: '',
    user_id: '',
    vin: '',
    engine_number: '',
    purchase_date: new Date('1987-01-01'),
    registration_date: new Date('1987-01-02'),
    dealer_name: '',
    model: '',
  });
  return (
    <div className="w-full  min-h-full flex-1">
      <Header title="My Garage" />
      <div className="px-6 py-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="max-w-sm rounded-2xl overflow-hidden shadow-lg"
                onClick={() => {
                  setCurrentProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <div className="h-24 bg-gray-300" />{' '}
                {/* Placeholder for image */}
                <div className="px-4 py-3 bg-gray-500 flex justify-between text-white">
                  <div className="font-bold text-sm mb-2">{product.model}</div>
                  <p className="text-base">{product.vin}</p>
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-center">
              <img src="/assets/add.png" alt="add" className="w-6" />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl max-w-sm w-full m-4">
              <ProductCard
                data={currentProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
