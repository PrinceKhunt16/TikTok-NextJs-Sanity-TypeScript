import React from 'react';
import { NextPage } from 'next';
import { allRouteList, aboutList, helpList } from '../utils/constants';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-400 text-sm font-notoSans hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='mt-6 hidden xl:block'>
    <List items={allRouteList} mt={false} />
    <List items={aboutList} mt />
    <List items={helpList} mt />
    <p className='text-gray-400 text-sm mt-5 font-notoSans'>© 2022 TikTok</p>
  </div>
);

export default Footer;