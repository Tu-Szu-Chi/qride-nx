'use client'

import React, { useState } from "react";
import Header from "$/components/Header";
import { fromDate } from "@org/common/src";



const Detail = () => {
    const [title, setTitle] = useState<string>('New Model Release! 2024 Vintage Motorcycle Series Now Available for Pre-Order')
    const [content, setContent] = useState<string>(`
<p>We are thrilled to announce the release of our brand-new 2024 Vintage Motorcycle Series! Designed with both classic aesthetics and modern technology, this series offers an unparalleled riding experience for enthusiasts and collectors alike.</p>

<h3>Key features of the 2024 Vintage Motorcycle Series include:</h3>

<ul>
  <li><strong>Retro Design:</strong> Inspired by iconic motorcycle models of the past, featuring a timeless look.</li>
  <li><strong>Advanced Technology:</strong> Equipped with the latest in motorcycle engineering, ensuring top performance and safety.</li>
  <li><strong>Comfort & Durability:</strong> Built for long rides with enhanced comfort and robust materials.</li>
</ul>

<p>Starting today, you can pre-order your very own 2024 Vintage Motorcycle. Don't miss out on the opportunity to be one of the first to own this extraordinary machine!</p>

<h3>Pre-order now and enjoy exclusive early bird benefits, including:</h3>

<ul>
  <li><strong>Special Pricing:</strong> Enjoy a discounted rate for early orders.</li>
  <li><strong>Customizable Options:</strong> Personalize your motorcycle with exclusive features.</li>
</ul>`)
    const [date, setDate] = useState<Date>(new Date('2024-08-07'))
    return <div className="w-full  min-h-full flex-1">
      <Header title="News" />
      <div>
        <div className="h-60 bg-gray-400 flex items-end">
            <h1 className="font-bold text-lg p-6">{title}</h1>
        </div>
        <div className="p-6">
            <span>{fromDate(date)}</span>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        </div>
      </div>
}

// export async function getServerSideProps() {
//     // 從數據庫獲取文章HTML
//     const articleHtml = await fetchArticleFromDatabase()
//     return { props: { articleHtml } }
//   }

export default Detail