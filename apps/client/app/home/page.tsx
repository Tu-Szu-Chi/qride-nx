'use client';

import React from 'react';
import { useEffect } from 'react';
import Header from '$/components/Header';
import Carousel from '$/components/Carousel';
import { ArticleTypeEnum } from '@org/types';
import NewsItem from '$/components/News/item';
import { useRouter } from 'next/navigation';

const menuItems = [
  { title: 'My Garage', icon: '🏠', url: '/garage' },
  { title: 'Register Bike', icon: '🚲', url: '' },
  { title: 'Service Records', icon: '📋', url: '' },
  { title: 'Coupons', icon: '🎟️', url: '' },
];
const newsItems = [
  {
    type: ArticleTypeEnum.NEWS,
    date: new Date('2024-07-12'),
    title:
      'New Model Release! 2024 Vintage Motorcycle Series Now Available for Pre-Order',
  },
  {
    type: ArticleTypeEnum.PROMO,
    date: new Date('2024/7/1'),
    title: 'Summer Maintenance Specials, Limited Time Discounts Starting Soon',
  },
  {
    type: ArticleTypeEnum.EVENT,
    date: new Date('2024/6/10'),
    title:
      'Exclusive Member Test Ride Event: Experience the Latest Motorcycle Models',
  },
  {
    type: ArticleTypeEnum.MEDIA,
    date: new Date('2024/6/8'),
    title: 'Latest Maintenance Tips to Keep Your Bike in Top Condition',
  },
];



export default function Index() {
  const router = useRouter()
  return (
    <div className="w-full  min-h-full flex-1">
      <Header />
      <div className="p-6">
        <Carousel images={[]} className="mb-9" />
        <div className="grid grid-cols-2 gap-11">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center" onClick={() => {
              router.push(item.url)
            }}>
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl mb-3">
                {item.icon}
              </div>
              <span className="text-sm">{item.title}</span>
            </div>
          ))}
        </div>
        {/* News */}
      </div>
      <div className="bg-orange-300 p-6  max-w-md">
        <h2 className="text-primary pl-6 font-bold italic text-2xl mb-3">Latest News</h2>
        <div className="space-y-4">
          {newsItems.slice(0, 4).map((item, index) => (
            <NewsItem key={index} type={item.type} title={item.title} date={item.date} />
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-primary font-bold text-base">
            Check for more
          </a>
        </div>
      </div>
    </div>
  );
}
