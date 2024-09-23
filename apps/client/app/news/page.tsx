'use client'

import React from "react";
import Header from "$/components/Header";
import { ArticleTypeEnum } from "@org/types";
import NewsItem from "$/components/News/item";

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

const News = () => {
    return <div className="w-full  min-h-full flex-1">
      <Header title="News" />
      <div className="space-y-3 p-6">
          {newsItems.slice(0, 4).map((item, index) => (
            <NewsItem key={index} type={item.type} title={item.title} date={item.date} />
          ))}
        </div>
      </div>
}

export default News