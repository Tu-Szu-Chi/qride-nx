import React from "react";
import { ArticleTypeEnum } from "@org/types";
import { fromDate } from '@org/common';
import { useRouter } from "next/navigation";


const getTypeColor = (type: ArticleTypeEnum) => {
    switch (type) {
      case ArticleTypeEnum.NEWS:
        return 'bg-blue-100';
      case ArticleTypeEnum.PROMO:
        return 'bg-orange-500';
      case ArticleTypeEnum.EVENT:
        return 'bg-red-200';
      case ArticleTypeEnum.MEDIA:
        return 'bg-green-200';
      default:
        return 'bg-gray-500';
    }
  };

type Props = {
   type: ArticleTypeEnum,
   date: Date,
   title: string
}

const NewsItem: React.FC<Props> = ({ type, date, title }) => {
  const router = useRouter()
    return <div className="flex items-start space-x-4" onClick={() => {
      router.push("/news/detail")
    }}>
    <div className="rounded-xl w-24 h-24 bg-gray-300 flex-shrink-0"></div>
    <div className='py-3'>
      <div className="flex items-center space-x-2 mb-1">
        <span
          className={`text-xs text-white px-2 py-1 rounded ${getTypeColor(
            type
          )}`}
        >
          {type}
        </span>
        <span className="text-xs">{fromDate(date)}</span>
      </div>
      <p className="text-sm font-bold h-16">{title}</p>
    </div>
  </div>
}

export default NewsItem